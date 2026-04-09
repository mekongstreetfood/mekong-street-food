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
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(sessionToUser(session));
      setLoading(false);
    });

    // Écoute les changements de session (login/logout sur un autre onglet)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(sessionToUser(session));
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      const msg = error.message.includes("Invalid login")
        ? "Email ou mot de passe incorrect."
        : error.message;
      return { ok: false, error: msg };
    }
    return { ok: true };
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name: name.trim() } },
    });
    if (error) {
      const msg = error.message.includes("already registered")
        ? "Un compte existe déjà avec cet email."
        : error.message;
      return { ok: false, error: msg };
    }
    return { ok: true };
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
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
