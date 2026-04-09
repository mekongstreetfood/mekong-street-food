"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingBag, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { MENU_ITEMS } from "@/data/menu";
import { type Reward, REWARD_CATEGORY, useLoyalty } from "@/lib/loyalty";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

interface RewardShopProps {
  reward: Reward | null;
  onClose: () => void;
}

export function RewardShop({ reward, onClose }: RewardShopProps) {
  const { redeemPoints, points } = useLoyalty();
  const { addItem, setOpen: openCart, items } = useCart();
  const [redeemedId, setRedeemedId] = useState<string | null>(null);

  // Points déjà réservés par des plats offerts dans le panier (non encore payés)
  const pendingPoints = items
    .filter((i) => i.isFree && i.pointsCost)
    .reduce((sum, i) => sum + (i.pointsCost ?? 0), 0);
  const effectivePoints = points - pendingPoints;

  // Ce shop est inabordable si les points effectifs sont insuffisants
  const canAfford = reward ? effectivePoints >= reward.points : false;

  const category = reward ? REWARD_CATEGORY[reward.id] : null;
  const dishes = category ? MENU_ITEMS.filter((d) => d.category === category) : [];

  const handleRedeem = (dishId: string) => {
    if (!reward || !canAfford) return;
    const dish = dishes.find((d) => d.id === dishId);
    if (!dish) return;
    // Les points sont déduits uniquement à la validation de la commande
    addItem(dish, { isFree: true, pointsCost: reward.points });
    setRedeemedId(dishId);
    setTimeout(() => {
      onClose();
      openCart(true);
      setRedeemedId(null);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {reward && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="fixed inset-x-4 bottom-0 top-[8%] z-[70] mx-auto flex max-w-xl flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-[#0a0a0a] shadow-2xl sm:inset-x-auto sm:left-1/2 sm:w-full sm:-translate-x-1/2"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent-secondary">
                  {reward.points} points · {effectivePoints} pts disponibles
                </p>
                <h2 className="mt-0.5 font-display text-xl font-bold text-foreground">
                  {reward.emoji} {reward.label}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-xl p-2 text-muted hover:text-foreground"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {!canAfford ? (
              <p className="mx-6 mt-4 rounded-2xl border border-accent/20 bg-accent/10 px-4 py-3 text-sm font-medium text-accent">
                Vous avez déjà un plat offert dans le panier. Finalisez votre commande pour utiliser cette récompense.
              </p>
            ) : (
              <p className="px-6 pt-4 text-sm text-muted">
                Choisissez un plat — il sera ajouté gratuitement à votre panier.
              </p>
            )}

            {/* Liste des plats */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-4">
                {dishes.map((dish) => {
                  const isRedeemed = redeemedId === dish.id;
                  return (
                    <motion.div
                      key={dish.id}
                      layout
                      className={cn(
                        "flex gap-4 overflow-hidden rounded-2xl border transition-colors",
                        isRedeemed
                          ? "border-accent-secondary/50 bg-accent-secondary/10"
                          : "border-foreground/10 bg-foreground/[0.03]"
                      )}
                    >
                      {/* Image */}
                      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-l-2xl">
                        <Image
                          src={dish.imageSrc}
                          alt={dish.imageAlt}
                          fill
                          className="object-cover"
                          sizes="112px"
                        />
                      </div>

                      {/* Infos */}
                      <div className="flex flex-1 flex-col justify-between py-3 pr-4">
                        <div>
                          <p className="font-display font-bold text-foreground">
                            {dish.name}
                          </p>
                          <p className="mt-1 line-clamp-2 text-xs text-muted">
                            {dish.description}
                          </p>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div>
                            <span className="text-xs text-muted line-through">
                              {dish.price}
                            </span>
                            <span className="ml-2 font-display text-sm font-bold text-accent-secondary">
                              {reward.points} pts
                            </span>
                          </div>
                          <motion.button
                            type="button"
                            whileTap={{ scale: 0.94 }}
                            onClick={() => handleRedeem(dish.id)}
                            disabled={!!redeemedId || !canAfford}
                            className={cn(
                              "flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-colors",
                              isRedeemed
                                ? "bg-accent-secondary text-background"
                                : canAfford
                                ? "bg-accent text-white hover:bg-accent/90 disabled:opacity-50"
                                : "cursor-not-allowed bg-foreground/10 text-muted"
                            )}
                          >
                            {isRedeemed ? (
                              <>
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                Ajouté !
                              </>
                            ) : (
                              <>
                                <ShoppingBag className="h-3.5 w-3.5" />
                                Commander
                              </>
                            )}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
