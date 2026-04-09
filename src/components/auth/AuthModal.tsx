"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Eye, EyeOff, Loader2, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import Image from "next/image";

interface AuthModalProps {
  open: boolean;
  mode: "login" | "register";
  onClose: () => void;
}

export function AuthModal({ open, mode: initialMode, onClose }: AuthModalProps) {
  const { login, register } = useAuth();
  const [tab, setTab] = useState<"login" | "register">(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const reset = () => {
    setName(""); setEmail(""); setPassword(""); setConfirm("");
    setError(null); setSuccess(false); setLoading(false);
  };

  const switchTab = (t: "login" | "register") => {
    reset();
    setTab(t);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (tab === "register") {
      if (name.trim().length < 2) return setError("Prénom trop court.");
      if (!/\S+@\S+\.\S+/.test(email)) return setError("Email invalide.");
      if (password.length < 6) return setError("Le mot de passe doit faire au moins 6 caractères.");
      if (password !== confirm) return setError("Les mots de passe ne correspondent pas.");
    } else {
      if (!email || !password) return setError("Merci de remplir tous les champs.");
    }

    setLoading(true);
    const res =
      tab === "login"
        ? await login(email, password)
        : await register(name, email, password);
    setLoading(false);

    if (!res.ok) return setError(res.error ?? "Erreur inconnue.");
    setSuccess(true);
    setTimeout(() => {
      onClose();
      reset();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm"
            onClick={() => { onClose(); reset(); }}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="fixed inset-x-4 z-[90] mx-auto max-w-sm overflow-y-auto rounded-3xl border border-foreground/10 bg-[#0d0d0d] shadow-2xl"
            style={{
              top: "max(1rem, calc(50dvh - 260px))",
              maxHeight: "calc(100dvh - 2rem)",
            }}
          >
            {/* Logo + close */}
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
              <div className="relative h-10 w-28">
                <Image src="/logo.png" alt="Mekong Street Food" fill className="object-contain object-left" />
              </div>
              <button
                onClick={() => { onClose(); reset(); }}
                className="rounded-xl p-1.5 text-muted hover:text-foreground"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="mx-6 mt-4 grid grid-cols-2 rounded-xl bg-foreground/[0.06] p-1">
              {(["login", "register"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => switchTab(t)}
                  className={`rounded-lg py-2 text-sm font-semibold transition-colors ${
                    tab === t
                      ? "bg-accent text-white shadow"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {t === "login" ? "Connexion" : "Créer un compte"}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-3 px-6 py-10 text-center"
                >
                  <CheckCircle2 className="h-14 w-14 text-accent-secondary" />
                  <p className="font-display text-lg font-bold text-foreground">
                    {tab === "login" ? "Bon retour !" : "Compte créé !"}
                  </p>
                  <p className="text-sm text-muted">Vous êtes connecté(e).</p>
                </motion.div>
              ) : (
                <motion.form
                  key={tab}
                  initial={{ opacity: 0, x: tab === "login" ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  onSubmit={handleSubmit}
                  className="space-y-4 px-6 py-6"
                  noValidate
                >
                  {tab === "register" && (
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-muted">
                        Prénom / Nom
                      </label>
                      <input
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jean Dupont"
                        className="w-full rounded-xl border border-foreground/15 bg-foreground/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none"
                      />
                    </div>
                  )}

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-muted">
                      Email
                    </label>
                    <input
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vous@email.com"
                      className="w-full rounded-xl border border-foreground/15 bg-foreground/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-muted">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <input
                        type={showPwd ? "text" : "password"}
                        autoComplete={tab === "login" ? "current-password" : "new-password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-foreground/15 bg-foreground/[0.04] px-4 py-3 pr-11 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPwd(!showPwd)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                        tabIndex={-1}
                      >
                        {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {tab === "register" && (
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-muted">
                        Confirmer le mot de passe
                      </label>
                      <input
                        type={showPwd ? "text" : "password"}
                        autoComplete="new-password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-foreground/15 bg-foreground/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none"
                      />
                    </div>
                  )}

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl bg-accent/10 px-4 py-2.5 text-xs font-medium text-accent"
                    >
                      {error}
                    </motion.p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileTap={{ scale: 0.97 }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/20 transition-colors hover:bg-accent/90 disabled:opacity-70"
                  >
                    {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                    {tab === "login" ? "Se connecter" : "Créer mon compte"}
                  </motion.button>

                  <p className="text-center text-xs text-muted">
                    {tab === "login" ? (
                      <>
                        Pas encore de compte ?{" "}
                        <button
                          type="button"
                          onClick={() => switchTab("register")}
                          className="font-semibold text-accent-secondary underline-offset-2 hover:underline"
                        >
                          S&apos;inscrire
                        </button>
                      </>
                    ) : (
                      <>
                        Déjà un compte ?{" "}
                        <button
                          type="button"
                          onClick={() => switchTab("login")}
                          className="font-semibold text-accent-secondary underline-offset-2 hover:underline"
                        >
                          Se connecter
                        </button>
                      </>
                    )}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
