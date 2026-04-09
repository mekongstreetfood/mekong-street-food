"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Gift, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useLoyalty } from "@/lib/loyalty";
import { useOnClickOutside } from "@/lib/useOnClickOutside";

export function UserMenu() {
  const { user, logout, openAuthModal } = useAuth();
  const { points } = useLoyalty();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setOpen(false));

  if (!user) {
    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => openAuthModal("login")}
        className="flex items-center gap-2 rounded-xl border border-foreground/20 px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        <User className="h-4 w-4" />
        Connexion
      </motion.button>
    );
  }

  const initials = user.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div ref={ref} className="relative">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-xl border border-foreground/20 px-3 py-2 transition-colors hover:border-accent"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
          {initials}
        </span>
        <span className="hidden text-sm font-semibold text-foreground sm:block">
          {user.name.split(" ")[0]}
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-2xl border border-foreground/10 bg-[#0d0d0d] shadow-2xl"
          >
            <div className="border-b border-foreground/10 px-4 py-3">
              <p className="text-xs font-semibold text-foreground">{user.name}</p>
              <p className="text-xs text-muted">{user.email}</p>
            </div>
            <Link
              href="/fidelite"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-foreground transition-colors hover:bg-foreground/[0.06]"
            >
              <Gift className="h-4 w-4 text-accent-secondary" />
              <div>
                <p className="font-semibold">Fidélité</p>
                <p className="text-xs text-muted">{points} points</p>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => { logout(); setOpen(false); }}
              className="flex w-full items-center gap-3 border-t border-foreground/10 px-4 py-3 text-sm text-muted transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
