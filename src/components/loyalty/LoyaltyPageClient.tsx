"use client";

import { motion } from "framer-motion";
import { Gift, LogIn, Star, UserPlus } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { LoyaltyDashboard } from "./LoyaltyDashboard";

export function LoyaltyPageClient() {
  const { user, openAuthModal } = useAuth();

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-8 py-8 text-center"
      >
        {/* Icône déco */}
        <div className="relative">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-accent-secondary/30 bg-accent-secondary/10">
            <Gift className="h-12 w-12 text-accent-secondary" />
          </div>
          <Star className="absolute -right-2 -top-2 h-6 w-6 text-accent" />
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            Connectez-vous pour voir vos points
          </h2>
          <p className="mt-3 max-w-sm text-sm text-muted">
            Créez un compte gratuitement pour cumuler des points à chaque commande
            et profiter de plats offerts.
          </p>
        </div>

        {/* Bénéfices */}
        <div className="grid w-full gap-3 sm:grid-cols-2">
          {[
            {
              emoji: "🍜",
              title: "Soupes & Nouilles",
              desc: "Offert à partir de 100 pts",
            },
            {
              emoji: "🍚",
              title: "Riz & Wok",
              desc: "Offert à partir de 100 pts",
            },
            {
              emoji: "🥖",
              title: "Street Sandwich",
              desc: "Offert à partir de 80 pts",
            },
            {
              emoji: "🧋",
              title: "Dessert & Boisson",
              desc: "Offert à partir de 50 pts",
            },
          ].map((b) => (
            <div
              key={b.title}
              className="flex items-center gap-3 rounded-2xl border border-foreground/10 bg-foreground/[0.03] px-4 py-3 text-left"
            >
              <span className="text-2xl">{b.emoji}</span>
              <div>
                <p className="text-sm font-semibold text-foreground">{b.title}</p>
                <p className="text-xs text-muted">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => openAuthModal("register")}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-accent py-4 text-sm font-bold text-white shadow-lg shadow-accent/20 transition-colors hover:bg-accent/90"
          >
            <UserPlus className="h-4 w-4" />
            Créer un compte gratuit
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => openAuthModal("login")}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-foreground/20 py-4 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <LogIn className="h-4 w-4" />
            Se connecter
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return <LoyaltyDashboard />;
}
