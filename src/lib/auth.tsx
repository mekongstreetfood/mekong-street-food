"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

/* ─── Types ─── */
export interface User {
  id: string;
  name: string;
  email: string;
}

interface StoredUser extends User {
  passwordHash: string;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ ok: boolean; error?: string }>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  openAuthModal: (mode?: "login" | "register") => void;
}

/* ─── Clés localStorage ─── */
const USERS_KEY = "mekong_users";
const SESSION_KEY = "mekong_session";

/* ─── Hash SHA-256 (Web Crypto API natif) ─── */
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "mekong_sf_salt_2024");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/* ─── Helpers localStorage ─── */
function getUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]");
  } catch {
    return [];
  }
}
function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/* ─── Context ─── */
const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  login: async () => ({ ok: false }),
  register: async () => ({ ok: false }),
  logout: () => {},
  openAuthModal: () => {},
});

/* ─── Provider ─── */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // modal state — stored in a ref so AuthModal can read it reactively
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"login" | "register">("login");

  // Restore session on mount (client-side only)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const hash = await hashPassword(password);
    const found = getUsers().find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.passwordHash === hash
    );
    if (!found) return { ok: false, error: "Email ou mot de passe incorrect." };
    const u: User = { id: found.id, name: found.name, email: found.email };
    setUser(u);
    localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    return { ok: true };
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const users = getUsers();
      if (
        users.some((u) => u.email.toLowerCase() === email.toLowerCase())
      ) {
        return {
          ok: false,
          error: "Un compte existe déjà avec cet email.",
        };
      }
      const hash = await hashPassword(password);
      const newUser: StoredUser = {
        id: crypto.randomUUID(),
        name: name.trim(),
        email: email.toLowerCase(),
        passwordHash: hash,
      };
      saveUsers([...users, newUser]);
      const u: User = { id: newUser.id, name: newUser.name, email: newUser.email };
      setUser(u);
      localStorage.setItem(SESSION_KEY, JSON.stringify(u));
      return { ok: true };
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  }, []);

  const openAuthModal = useCallback(
    (mode: "login" | "register" = "login") => {
      setModalMode(mode);
      setModalOpen(true);
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, openAuthModal }}
    >
      {children}
      {/* Lazy-import AuthModal to avoid SSR issues */}
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
  const [Comp, setComp] =
    useState<React.ComponentType<{
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
