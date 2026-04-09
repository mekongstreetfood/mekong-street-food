"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Delete, Lock } from "lucide-react";
import { useState } from "react";

const CORRECT_PIN = "1234";
const SESSION_KEY = "mekong_kitchen_unlocked";

interface PinGateProps {
  children: React.ReactNode;
}

export function PinGate({ children }: PinGateProps) {
  const [unlocked, setUnlocked] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(SESSION_KEY) === "1";
  });
  const [digits, setDigits] = useState<string[]>([]);
  const [error, setError] = useState(false);

  const press = (d: string) => {
    if (digits.length >= 4) return;
    const next = [...digits, d];
    setDigits(next);
    setError(false);

    if (next.length === 4) {
      if (next.join("") === CORRECT_PIN) {
        sessionStorage.setItem(SESSION_KEY, "1");
        setTimeout(() => setUnlocked(true), 300);
      } else {
        setError(true);
        setTimeout(() => setDigits([]), 700);
      }
    }
  };

  const del = () => setDigits((d) => d.slice(0, -1));

  if (unlocked) return <>{children}</>;

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-8 px-4">
      {/* Icône */}
      <motion.div
        animate={{ rotate: error ? [0, -8, 8, -6, 6, 0] : 0 }}
        transition={{ duration: 0.4 }}
        className="flex h-20 w-20 items-center justify-center rounded-3xl border border-foreground/10 bg-foreground/[0.04]"
      >
        <Lock className={`h-10 w-10 ${error ? "text-accent" : "text-muted"}`} />
      </motion.div>

      <div className="text-center">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Espace cuisine
        </h2>
        <p className="mt-1 text-sm text-muted">Entrez le code d&apos;accès</p>
      </div>

      {/* Points */}
      <div className="flex gap-4">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: digits.length > i ? 1.15 : 1,
              backgroundColor:
                error
                  ? "rgba(255,0,60,0.4)"
                  : digits.length > i
                  ? "rgba(255,138,0,0.9)"
                  : "rgba(255,255,255,0.08)",
            }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="h-4 w-4 rounded-full"
          />
        ))}
      </div>

      {/* Pavé numérique */}
      <div className="grid grid-cols-3 gap-3">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"].map(
          (k) => {
            if (k === "")
              return <div key="empty" />;
            if (k === "del")
              return (
                <motion.button
                  key="del"
                  whileTap={{ scale: 0.88 }}
                  onClick={del}
                  className="flex h-16 w-16 items-center justify-center rounded-2xl border border-foreground/10 bg-foreground/[0.04] text-muted transition-colors hover:bg-foreground/10"
                >
                  <Delete className="h-5 w-5" />
                </motion.button>
              );
            return (
              <motion.button
                key={k}
                whileTap={{ scale: 0.88 }}
                onClick={() => press(k)}
                className="flex h-16 w-16 items-center justify-center rounded-2xl border border-foreground/10 bg-foreground/[0.04] font-display text-xl font-bold text-foreground transition-colors hover:bg-foreground/10 hover:border-accent/30"
              >
                {k}
              </motion.button>
            );
          }
        )}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm font-semibold text-accent"
          >
            Code incorrect
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
