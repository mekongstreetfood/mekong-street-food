"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";

/* ─── Types ─── */
export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  openAuthModal: (mode?: "login" | "register") => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  login: async () => ({ ok: false }),
  register: async () => ({ ok: false }),
  logout: () => {},
  openAuthModal: () => {},
});

function translateAuthError(msg: string): string {
  if (!msg) return "Erreur inconnue.";
  const m = msg.toLowerCase();
  if (m.includes("invalid login") || m.includes("invalid credentials")) return "Email ou mot de passe incorrect.";
  if (m.includes("already registered") || m.includes("user already registered")) return "Un compte existe déjà avec cet email.";
  if (m.includes("email not confirmed")) return "Email non confirmé. Vérifiez votre boîte mail.";
  if (m.includes("password")) return "Le mot de passe doit faire au moins 6 caractères.";
  if (m.includes("rate limit") || m.includes("too many")) return "Trop de tentatives. Attendez quelques minutes et réessayez.";
  if (m.includes("signup") && m.includes("disabled")) return "Les inscriptions sont désactivées. Contactez l'administrateur.";
  if (m.includes("network") || m.includes("fetch")) return "Erreur réseau. Vérifiez votre connexion internet.";
  if (m.includes("email") && m.includes("invalid")) return "Adresse email invalide.";
  return msg;
}

function sessionToUser(session: Session | null): User | null {
  if (!session?.user) return null;
  return {
    id: session.user.id,
    name: session.user.user_metadata?.name ?? session.user.email ?? "Utilisateur",
    email: session.user.email ?? "",
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"login" | "register">("login");

  useEffect(() => {
    // Récupère la session active au démarrage
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setUser(sessionToUser(session));
        setLoading(false);
      })
      .catch((err) => {
        console.error("[Auth] getSession error:", err);
        setUser(null);
        setLoading(false);
      });

    // Écoute les changements de session (login/logout sur un autre onglet)
    let subscription: { unsubscribe: () => void } | null = null;
    try {
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(sessionToUser(session));
        setLoading(false);
      });
      subscription = data.subscription;
    } catch (err) {
      console.error("[Auth] onAuthStateChange error:", err);
    }

    return () => subscription?.unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.error("[Auth] login error:", error);
        return { ok: false, error: translateAuthError(error.message) };
      }
      return { ok: true };
    } catch (e: unknown) {
      console.error("[Auth] login exception:", e);
      return { ok: false, error: "Impossible de se connecter. Vérifiez votre connexion internet." };
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name: name.trim() } },
      });
      if (error) {
        console.error("[Auth] register error:", error);
        return { ok: false, error: translateAuthError(error.message) };
      }
      return { ok: true };
    } catch (e: unknown) {
      console.error("[Auth] register exception:", e);
      return { ok: false, error: "Impossible de créer le compte. Vérifiez votre connexion internet." };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await supabase.auth.signOut();
    } catch (_) {}
    setUser(null);
  }, []);

  const openAuthModal = useCallback((mode: "login" | "register" = "login") => {
    setModalMode(mode);
    setModalOpen(true);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, openAuthModal }}>
      {children}
      <AuthModalPortal
        open={modalOpen}
        mode={modalMode}
        onClose={() => setModalOpen(false)}
      />
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

/* ─── Portal wrapper (lazy) ─── */
function AuthModalPortal({
  open,
  mode,
  onClose,
}: {
  open: boolean;
  mode: "login" | "register";
  onClose: () => void;
}) {
  const [Comp, setComp] = useState<React.ComponentType<{
    open: boolean;
    mode: "login" | "register";
    onClose: () => void;
  }> | null>(null);

  const didLoad = useRef(false);

  useEffect(() => {
    if (!open || didLoad.current) return;
    didLoad.current = true;
    import("@/components/auth/AuthModal").then((m) => setComp(() => m.AuthModal));
  }, [open]);

  if (!Comp) return null;
  return <Comp open={open} mode={mode} onClose={onClose} />;
}
