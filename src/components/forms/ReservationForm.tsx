"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SuccessBurst } from "@/components/forms/SuccessBurst";
import { cn } from "@/lib/cn";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: string;
  message: string;
};

export function ReservationForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      guests: "2",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 650));
    console.info("Réservation (démo)", data);
    setSubmitted(true);
    reset();
  };

  const inputClass =
    "mt-1.5 w-full rounded-2xl border border-foreground/15 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent focus:ring-1 focus:ring-accent";

  return (
    <Card className="relative overflow-hidden p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center py-6 text-center"
          >
            <SuccessBurst />
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-6 font-display text-2xl font-bold text-foreground"
            >
              Demande envoyée
            </motion.p>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Nous vous confirmons par e-mail ou téléphone sous peu.
            </p>
            <Button
              type="button"
              variant="ghost"
              className="mt-8"
              onClick={() => setSubmitted(false)}
            >
              Nouvelle réservation
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Réserver une table
              </h2>
              <p className="mt-2 text-sm text-muted">
                Validation en temps réel — aucune donnée n&apos;est envoyée en
                production sans votre backend.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted">
                  Nom complet
                </label>
                <input
                  className={cn(inputClass, errors.name && "border-red-500/60")}
                  placeholder="Jean Dupont"
                  {...register("name", {
                    required: "Requis",
                    minLength: { value: 2, message: "Trop court" },
                  })}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted">
                  E-mail
                </label>
                <input
                  type="email"
                  className={cn(
                    inputClass,
                    errors.email && "border-red-500/60"
                  )}
                  placeholder="vous@email.com"
                  {...register("email", {
                    required: "Requis",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "E-mail invalide",
                    },
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted">
                  Téléphone
                </label>
                <input
                  type="tel"
                  className={cn(
                    inputClass,
                    errors.phone && "border-red-500/60"
                  )}
                  placeholder="06 12 34 56 78"
                  {...register("phone", {
                    required: "Requis",
                    pattern: {
                      value: /^[\d\s+.()-]{10,}$/,
                      message: "Numéro invalide",
                    },
                  })}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted">
                  Date souhaitée
                </label>
                <input
                  type="date"
                  className={cn(inputClass, errors.date && "border-red-500/60")}
                  {...register("date", { required: "Choisissez une date" })}
                />
                {errors.date && (
                  <p className="mt-1 text-xs text-red-400">{errors.date.message}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted">
                  Convives
                </label>
                <select
                  className={inputClass}
                  {...register("guests", { required: true })}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={String(n)}>
                      {n} {n > 1 ? "personnes" : "personne"}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted">
                  Message (optionnel)
                </label>
                <textarea
                  rows={3}
                  className={inputClass + " resize-none"}
                  placeholder="Allergies, occasion…"
                  {...register("message")}
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="neon"
              className="w-full sm:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Envoi…" : "Envoyer la demande"}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </Card>
  );
}
