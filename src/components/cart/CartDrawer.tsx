"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Gift, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useLoyalty, type Reward } from "@/lib/loyalty";
import { useAuth } from "@/lib/auth";
import { getPickupSlots } from "@/lib/pickupSlots";
import { Button } from "@/components/ui/Button";
import { CheckoutModal } from "@/components/cart/CheckoutModal";

export function CartDrawer() {
  const { items, open, note, pickupTime, totalItems, totalPrice, setOpen, increment, decrement, removeItem, clearCart, setNote, setPickupTime } =
    useCart();

  const { points, availableRewards } = useLoyalty();
  const { user, openAuthModal } = useAuth();
  const [slots, setSlots] = useState<string[]>([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const pointsToEarn = Math.floor(totalPrice);

  // Recalcule les créneaux à chaque ouverture du drawer
  useEffect(() => {
    if (!open) return;
    const s = getPickupSlots();
    setSlots(s);
    // Si le créneau sélectionné n'est plus dispo, reset
    if (pickupTime && !s.includes(pickupTime)) {
      setPickupTime("");
    }
  }, [open, pickupTime, setPickupTime]);

  const noSlots = slots.length === 0;

  return (
    <>
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 32 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col border-l border-foreground/10 bg-[#0a0a0a] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-foreground/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-accent" />
                <span className="font-display text-lg font-bold text-foreground">
                  Ma commande
                </span>
                {totalItems > 0 && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl p-2 text-muted transition-colors hover:text-foreground"
                aria-label="Fermer le panier"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <ShoppingBag className="h-16 w-16 text-foreground/15" />
                  <p className="font-display text-lg font-semibold text-foreground">
                    Votre panier est vide
                  </p>
                  <p className="text-sm text-muted">
                    Ajoutez des plats depuis le menu.
                  </p>
                  <Button
                    variant="ghost"
                    onClick={() => setOpen(false)}
                    className="mt-2"
                  >
                    Voir le menu
                  </Button>
                </div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                        className="flex gap-4 rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-3"
                      >
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                          <Image
                            src={item.imageSrc}
                            alt={item.imageAlt}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-display text-sm font-semibold text-foreground leading-tight">
                                {item.name}
                              </p>
                              {item.isFree && (
                                <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-accent-secondary/20 px-2 py-0.5 text-xs font-semibold text-accent-secondary">
                                  <Gift className="h-3 w-3" /> Offert
                                </span>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="shrink-0 text-muted transition-colors hover:text-red-400"
                              aria-label="Supprimer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className={`font-display text-sm font-semibold ${item.isFree ? "text-accent-secondary" : "text-accent"}`}>
                              {item.isFree ? "Offert" : `${(item.priceNum * item.quantity).toFixed(2).replace(".", ",")} €`}
                            </p>
                            {!item.isFree && (
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => decrement(item.id)}
                                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-foreground/15 text-foreground transition-colors hover:border-accent hover:text-accent"
                                  aria-label="Diminuer"
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </button>
                                <span className="w-5 text-center text-sm font-bold text-foreground">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => increment(item.id)}
                                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-white transition-colors hover:bg-accent/90"
                                  aria-label="Augmenter"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer total */}
            {items.length > 0 && (
              <div className="border-t border-foreground/10 px-5 py-5 space-y-4">

                {/* Créneau de retrait */}
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
                    <Clock className="h-3.5 w-3.5 text-accent-secondary" />
                    Heure de retrait
                  </label>
                  {noSlots ? (
                    <p className="rounded-2xl border border-foreground/15 bg-background/60 px-4 py-3 text-sm text-muted">
                      Fermé pour le moment — revenez pendant les horaires d&apos;ouverture.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {slots.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setPickupTime(s)}
                          className={`rounded-xl border px-3 py-1.5 text-sm font-medium transition-colors ${
                            pickupTime === s
                              ? "border-accent bg-accent text-white"
                              : "border-foreground/15 bg-background/60 text-foreground hover:border-accent/50 hover:text-accent"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Commentaire */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                    Commentaire / instructions
                  </label>
                  <textarea
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Allergies, cuisson, demandes spéciales…"
                    className="w-full resize-none rounded-2xl border border-foreground/15 bg-background/60 px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted/60 focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                </div>

                {/* Récompenses fidélité */}
                {availableRewards.length > 0 && (
                  <div>
                    <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent-secondary">
                      <Gift className="h-3.5 w-3.5" />
                      Récompenses disponibles
                    </p>
                    <div className="space-y-2">
                      {availableRewards.map((r) => {
                        const active = selectedReward?.id === r.id;
                        return (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => setSelectedReward(active ? null : r)}
                            className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm transition-colors ${
                              active
                                ? "border-accent-secondary/60 bg-accent-secondary/10 text-foreground"
                                : "border-foreground/15 text-muted hover:border-foreground/30 hover:text-foreground"
                            }`}
                          >
                            <span className="flex items-center gap-2 font-medium">
                              <span>{r.emoji}</span>
                              {r.description}
                            </span>
                            <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${active ? "bg-accent-secondary text-background" : "bg-foreground/10 text-muted"}`}>
                              {r.points} pts
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {selectedReward && (
                      <p className="mt-2 text-xs text-accent-secondary">
                        ✓ Votre plat offert sera noté dans la commande
                      </p>
                    )}
                  </div>
                )}

                {/* Total */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted">
                      {totalItems} article{totalItems > 1 ? "s" : ""}
                    </span>
                    <span className="font-display text-xl font-bold text-foreground">
                      {totalPrice.toFixed(2).replace(".", ",")} €
                    </span>
                  </div>
                  <p className="text-right text-xs text-accent-secondary">
                    +{pointsToEarn} pt{pointsToEarn > 1 ? "s" : ""} fidélité à gagner
                  </p>
                </div>

                {!user ? (
                  <Button
                    variant="neon"
                    className="w-full text-base min-h-[52px]"
                    onClick={() => { setOpen(false); openAuthModal("login"); }}
                  >
                    Se connecter pour commander
                  </Button>
                ) : (
                  <Button
                    variant="neon"
                    className="w-full text-base min-h-[52px] disabled:opacity-50"
                    disabled={!pickupTime || noSlots}
                    onClick={() => {
                      if (pickupTime) {
                        setOpen(false);
                        setCheckoutOpen(true);
                      }
                    }}
                  >
                    {pickupTime ? `Commander pour ${pickupTime}` : "Choisissez un créneau"}
                  </Button>
                )}
                <button
                  type="button"
                  onClick={clearCart}
                  className="w-full text-center text-xs text-muted transition-colors hover:text-red-400"
                >
                  Vider le panier
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
    <CheckoutModal
      open={checkoutOpen}
      onClose={() => setCheckoutOpen(false)}
      redeemPoints={selectedReward?.points ?? 0}
      finalPrice={totalPrice}
      freeReward={selectedReward ?? undefined}
    />
    </>
  );
}
