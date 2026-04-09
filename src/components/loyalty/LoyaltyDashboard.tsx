"use client";

import { motion } from "framer-motion";
import { Gift, Star, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useLoyalty, REWARDS, type Reward } from "@/lib/loyalty";
import { useCart } from "@/lib/cart";
import { RewardShop } from "./RewardShop";

export function LoyaltyDashboard() {
  const { points, history, availableRewards } = useLoyalty();
  const { items } = useCart();
  const [activeReward, setActiveReward] = useState<Reward | null>(null);

  // Points déjà réservés par des plats offerts dans le panier
  const pendingPoints = items
    .filter((i) => i.isFree && i.pointsCost)
    .reduce((sum, i) => sum + (i.pointsCost ?? 0), 0);
  const effectivePoints = points - pendingPoints;

  const nextReward = REWARDS
    .slice()
    .sort((a, b) => a.points - b.points)
    .find((r) => points < r.points);

  return (
    <>
    <RewardShop reward={activeReward} onClose={() => setActiveReward(null)} />
    <div className="space-y-8">
      {/* Solde principal */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/10 via-background to-accent-secondary/10 p-8"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 100%, #FF003C, transparent)",
          }}
        />
        <div className="relative">
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-accent-secondary">
            Carte de fidélité · 1 € = 1 point
          </p>
          <p className="mt-4 font-display text-6xl font-bold text-foreground">
            {points.toLocaleString()}
          </p>
          <p className="mt-1 text-sm text-muted">points cumulés</p>
          {nextReward && (
            <p className="mt-4 text-sm text-muted">
              Encore{" "}
              <strong className="text-foreground">
                {nextReward.points - points} pt{nextReward.points - points > 1 ? "s" : ""}
              </strong>{" "}
              pour obtenir {nextReward.emoji} {nextReward.label} gratuit
            </p>
          )}
          {!nextReward && availableRewards.length > 0 && (
            <p className="mt-4 text-sm font-semibold text-accent-secondary">
              🎉 Toutes vos récompenses sont disponibles !
            </p>
          )}

        </div>
      </motion.div>

      {/* Comment ça marche */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            icon: Star,
            title: "Gagnez des points",
            text: "1 point par euro dépensé sur chaque commande.",
          },
          {
            icon: Gift,
            title: "Plats offerts",
            text: "50 pts → Dessert · 80 pts → Sandwich · 100 pts → Soupe ou Wok.",
          },
          {
            icon: TrendingUp,
            title: "Utilisez dans le panier",
            text: "Sélectionnez votre récompense au moment de commander.",
          },
        ].map(({ icon: Icon, title, text }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-2xl border border-foreground/10 bg-foreground/[0.04] p-5"
          >
            <Icon className="h-6 w-6 text-accent-secondary" />
            <p className="mt-3 font-display font-semibold text-foreground">{title}</p>
            <p className="mt-1 text-sm text-muted">{text}</p>
          </motion.div>
        ))}
      </div>

      {/* Récompenses */}
      <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-6">
        <h2 className="font-display text-lg font-bold text-foreground">Récompenses</h2>
        <p className="mt-1 text-sm text-muted">
          Cliquez sur une récompense disponible pour choisir votre plat offert.
        </p>
        {pendingPoints > 0 && (
          <p className="mt-3 rounded-2xl border border-accent/20 bg-accent/10 px-4 py-3 text-xs font-medium text-accent">
            {pendingPoints} pts réservés pour un plat offert dans votre panier — finalisez la commande pour libérer vos points.
          </p>
        )}
        <ul className="mt-5 space-y-3">
          {REWARDS.map((r) => {
            const unlocked = effectivePoints >= r.points;
            const lockedByCart = points >= r.points && !unlocked;
            return (
              <motion.li
                key={r.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <button
                  type="button"
                  onClick={() => unlocked && setActiveReward(r)}
                  disabled={!unlocked}
                  className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all ${
                    unlocked
                      ? "border-accent-secondary/40 bg-accent-secondary/10 hover:bg-accent-secondary/20 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                      : lockedByCart
                      ? "border-accent/20 bg-accent/5 opacity-70 cursor-not-allowed"
                      : "border-foreground/10 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{r.emoji}</span>
                    <div>
                      <p className="font-display font-bold text-foreground">{r.label}</p>
                      <p className="text-xs text-muted">{r.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        unlocked
                          ? "bg-accent-secondary text-background"
                          : lockedByCart
                          ? "bg-accent/20 text-accent"
                          : "bg-foreground/10 text-muted"
                      }`}
                    >
                      {unlocked ? "Voir les plats →" : lockedByCart ? "Dans le panier" : `${r.points} pts`}
                    </span>
                  </div>
                </button>
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* Historique */}
      <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-6">
        <h2 className="font-display text-lg font-bold text-foreground">
          Historique des commandes
        </h2>
        {history.length === 0 ? (
          <p className="mt-5 text-sm text-muted">
            Aucune commande encore — passez votre première commande pour gagner des points !
          </p>
        ) : (
          <ul className="mt-5 space-y-3">
            {history.map((order) => (
              <li
                key={order.id}
                className="flex items-center justify-between border-b border-foreground/[0.06] pb-3 last:border-0 last:pb-0 text-sm"
              >
                <div>
                  <p className="font-medium text-foreground">
                    Retrait à {order.pickupTime}
                  </p>
                  <p className="text-xs text-muted">
                    {new Date(order.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">
                    {order.total.toFixed(2).replace(".", ",")} €
                  </p>
                  <p className="text-xs font-semibold text-accent-secondary">
                    +{order.points} pt{order.points > 1 ? "s" : ""}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </>
  );
}
