"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CreditCard, Wallet, CheckCircle2, AlertCircle } from "lucide-react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "@/lib/cart";
import { useLoyalty, type Reward } from "@/lib/loyalty";
import { useAuth } from "@/lib/auth";
import { saveOrderWithUserId } from "@/lib/orders";
import { Button } from "@/components/ui/Button";

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY &&
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY !== "pk_test_COLLE_TA_CLE_ICI"
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID &&
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID !== "COLLE_TON_CLIENT_ID_ICI"
  ? process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  : null;

type PayMethod = "card" | "paypal";
type Step = "method" | "pay" | "success" | "error";

/* ─── Formulaire Stripe ─── */
function StripeForm({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (msg: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.href },
      redirect: "if_required",
    });

    if (error) {
      onError(error.message ?? "Paiement refusé");
    } else {
      onSuccess();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <PaymentElement />
      <Button
        type="submit"
        variant="neon"
        className="w-full min-h-[52px] text-base"
        disabled={!stripe || loading}
      >
        {loading ? "Traitement…" : "Payer par carte"}
      </Button>
    </form>
  );
}

/* ─── Contenu principal du modal ─── */
function CheckoutContent({
  onClose,
  totalPrice,
  pickupTime,
  redeemPoints,
  freeReward,
}: {
  onClose: () => void;
  totalPrice: number;
  pickupTime: string;
  redeemPoints: number;
  freeReward?: Reward;
}) {
  const { items, note, clearCart } = useCart();
  const { earnOrder, redeemPoints: spendPoints } = useLoyalty();
  const { user } = useAuth();
  const pointsToEarn = Math.floor(totalPrice);
  const [method, setMethod] = useState<PayMethod>("card");
  const [step, setStep] = useState<Step>("method");
  const [clientSecret, setClientSecret] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingIntent, setLoadingIntent] = useState(false);

  const stripeConfigured = !!stripePromise;
  const paypalConfigured = !!paypalClientId;

  const createStripeIntent = useCallback(async () => {
    setLoadingIntent(true);
    try {
      const res = await fetch("/api/checkout/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalPrice, items, pickupTime, note }),
      });
      const data = await res.json();
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        setStep("pay");
      } else {
        setErrorMsg(data.error ?? "Erreur lors de la création du paiement");
        setStep("error");
      }
    } catch {
      setErrorMsg("Impossible de contacter le serveur de paiement");
      setStep("error");
    } finally {
      setLoadingIntent(false);
    }
  }, [totalPrice, items, pickupTime, note]);

  const handleSuccess = () => {
    // Déduit les points des récompenses sélectionnées dans le drawer
    if (redeemPoints > 0) spendPoints(redeemPoints);
    // Déduit les points des plats offerts ajoutés via RewardShop
    const freeItemsPoints = items
      .filter((i) => i.isFree && i.pointsCost)
      .reduce((sum, i) => sum + (i.pointsCost ?? 0), 0);
    if (freeItemsPoints > 0) spendPoints(freeItemsPoints);
    // Crédite les points gagnés sur le montant payé
    earnOrder(totalPrice, pickupTime);
    // Sauvegarde la commande pour la cuisine
    if (user) {
      saveOrderWithUserId({
        id: `cmd-${Date.now()}`,
        date: new Date().toISOString(),
        pickupTime,
        note: note ?? "",
        userName: user.name,
        userEmail: user.email,
        items: [...items],
        total: totalPrice,
        status: "new",
      }, user.id);
    }
    clearCart();
    setStep("success");
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-4">
        <h2 className="font-display text-lg font-bold text-foreground">
          {step === "success" ? "Commande confirmée !" : "Paiement"}
        </h2>
        <button
          onClick={onClose}
          className="rounded-xl p-2 text-muted hover:text-foreground"
          aria-label="Fermer"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="overflow-y-auto px-6 py-6">
        {/* Récap commande */}
        {step !== "success" && (
          <div className="mb-6 rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
              Récapitulatif · retrait à {pickupTime}
            </p>
            <ul className="space-y-1.5 text-sm">
              {items.map((i) => (
                <li key={i.id} className="flex justify-between text-foreground/80">
                  <span>{i.name} × {i.quantity}</span>
                  <span>{(i.priceNum * i.quantity).toFixed(2).replace(".", ",")} €</span>
                </li>
              ))}
              {freeReward && (
                <li className="flex justify-between text-accent-secondary font-medium pt-1 border-t border-foreground/10 mt-1">
                  <span>{freeReward.emoji} {freeReward.label} offert(e)</span>
                  <span>−{freeReward.points} pts</span>
                </li>
              )}
            </ul>
            <div className="mt-3 flex justify-between border-t border-foreground/10 pt-3 font-display font-bold text-foreground">
              <span>Total</span>
              <span className="text-accent">{totalPrice.toFixed(2).replace(".", ",")} €</span>
            </div>
          </div>
        )}

        {/* Choix méthode */}
        {step === "method" && (
          <div className="space-y-5">
            <p className="text-sm font-semibold text-foreground">Mode de paiement</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMethod("card")}
                className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-sm font-medium transition-colors ${
                  method === "card"
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-foreground/15 text-muted hover:border-foreground/30"
                }`}
              >
                <CreditCard className="h-6 w-6" />
                Carte bancaire
              </button>
              <button
                type="button"
                onClick={() => setMethod("paypal")}
                className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-sm font-medium transition-colors ${
                  method === "paypal"
                    ? "border-blue-500 bg-blue-500/10 text-blue-400"
                    : "border-foreground/15 text-muted hover:border-foreground/30"
                }`}
              >
                <Wallet className="h-6 w-6" />
                PayPal
              </button>
            </div>

            {method === "card" && (
              <Button
                variant="neon"
                className="w-full min-h-[52px] text-base"
                disabled={!stripeConfigured || loadingIntent}
                onClick={createStripeIntent}
              >
                {!stripeConfigured
                  ? "Stripe non configuré"
                  : loadingIntent
                  ? "Chargement…"
                  : "Continuer"}
              </Button>
            )}

            {method === "paypal" && (
              <div>
                {paypalConfigured ? (
                  <PayPalScriptProvider
                    options={{ clientId: paypalClientId!, currency: "EUR" }}
                  >
                    <PayPalButtons
                      style={{ layout: "vertical", color: "blue", shape: "rect" }}
                      createOrder={(_data, actions) =>
                        actions.order.create({
                          intent: "CAPTURE",
                          purchase_units: [
                            {
                              amount: {
                                currency_code: "EUR",
                                value: totalPrice.toFixed(2),
                              },
                              description: `Mekong Street Food · retrait ${pickupTime}`,
                            },
                          ],
                        })
                      }
                      onApprove={async (_data, actions) => {
                        await actions.order?.capture();
                        handleSuccess();
                      }}
                      onError={() => {
                        setErrorMsg("Paiement PayPal annulé ou refusé");
                        setStep("error");
                      }}
                    />
                  </PayPalScriptProvider>
                ) : (
                  <p className="rounded-2xl border border-foreground/15 bg-foreground/[0.04] px-4 py-3 text-sm text-muted text-center">
                    PayPal non configuré — ajoutez{" "}
                    <code className="text-accent">NEXT_PUBLIC_PAYPAL_CLIENT_ID</code>{" "}
                    dans .env.local
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Paiement Stripe */}
        {step === "pay" && clientSecret && stripePromise && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: "night",
                variables: {
                  colorPrimary: "#FF003C",
                  colorBackground: "#0a0a0a",
                  colorText: "#F5F5F5",
                  borderRadius: "12px",
                },
              },
            }}
          >
            <StripeForm onSuccess={handleSuccess} onError={(msg) => { setErrorMsg(msg); setStep("error"); }} />
          </Elements>
        )}

        {/* Succès */}
        {step === "success" && (
          <div className="flex flex-col items-center py-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-secondary shadow-[0_0_40px_rgba(255,0,60,0.5)]"
            >
              <CheckCircle2 className="h-10 w-10 text-white" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 font-display text-2xl font-bold text-foreground"
            >
              Commande confirmée !
            </motion.p>
            <p className="mt-2 text-sm text-muted">
              À récupérer à <strong className="text-foreground">{pickupTime}</strong> au 368 route du Forez, Davézieux.
            </p>
            <div className="mt-4 rounded-2xl border border-accent-secondary/30 bg-accent-secondary/10 px-5 py-3 text-sm text-accent-secondary font-semibold">
              +{pointsToEarn} point{pointsToEarn > 1 ? "s" : ""} fidélité ajouté{pointsToEarn > 1 ? "s" : ""} 🎉
            </div>
            {freeReward && (
              <div className="mt-3 rounded-2xl border border-accent/30 bg-accent/10 px-5 py-3 text-sm text-foreground">
                {freeReward.emoji} <strong>{freeReward.description}</strong> — présentez cette commande au comptoir.
              </div>
            )}
            <Button variant="ghost" className="mt-8" onClick={onClose}>
              Fermer
            </Button>
          </div>
        )}

        {/* Erreur */}
        {step === "error" && (
          <div className="flex flex-col items-center py-6 text-center">
            <AlertCircle className="h-16 w-16 text-red-400" />
            <p className="mt-4 font-display text-xl font-bold text-foreground">
              Paiement échoué
            </p>
            <p className="mt-2 text-sm text-muted">{errorMsg}</p>
            <Button
              variant="ghost"
              className="mt-6"
              onClick={() => setStep("method")}
            >
              Réessayer
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Modal wrapper ─── */
export function CheckoutModal({
  open,
  onClose,
  redeemPoints = 0,
  finalPrice,
  freeReward,
}: {
  open: boolean;
  onClose: () => void;
  redeemPoints?: number;
  finalPrice?: number;
  freeReward?: Reward;
}) {
  const { totalPrice: cartTotal, pickupTime } = useCart();
  const totalPrice = finalPrice ?? cartTotal;

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            className="fixed inset-x-4 top-[5%] z-[90] mx-auto max-w-lg overflow-hidden rounded-3xl border border-foreground/10 bg-[#0a0a0a] shadow-2xl sm:inset-x-auto sm:left-1/2 sm:w-full sm:-translate-x-1/2"
            style={{ maxHeight: "90svh" }}
          >
            <CheckoutContent
              onClose={onClose}
              totalPrice={totalPrice}
              pickupTime={pickupTime}
              redeemPoints={redeemPoints}
              freeReward={freeReward}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
