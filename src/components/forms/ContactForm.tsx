"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SuccessBurst } from "@/components/forms/SuccessBurst";
import { cn } from "@/lib/cn";

type FormValues = {
  name: string;
  email: string;
  subject: string;
  body: string;
};

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: { name: "", email: "", subject: "", body: "" },
  });

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 550));
    console.info("Contact (démo)", data);
    setSubmitted(true);
    reset();
  };

  const inputClass =
    "mt-1.5 w-full rounded-2xl border border-foreground/15 bg-background/60 px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted focus:border-accent focus:ring-1 focus:ring-accent";

  return (
    <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center py-8 text-center"
          >
            <SuccessBurst />
            <p className="mt-6 font-display text-xl font-bold text-foreground">
              Message reçu
            </p>
            <p className="mt-2 text-sm text-muted">
              Merci — nous revenons vers vous rapidement.
            </p>
            <Button
              type="button"
              variant="ghost"
              className="mt-6"
              onClick={() => setSubmitted(false)}
            >
              Écrire un autre message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="f"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <h3 className="font-display text-lg font-bold text-foreground">
              Nous écrire
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted">
                  Nom
                </label>
                <input
                  className={cn(inputClass, errors.name && "border-red-500/50")}
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
                    errors.email && "border-red-500/50"
                  )}
                  {...register("email", {
                    required: "Requis",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalide",
                    },
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted">
                Sujet
              </label>
              <input
                className={cn(
                  inputClass,
                  errors.subject && "border-red-500/50"
                )}
                {...register("subject", {
                  required: "Requis",
                  minLength: { value: 3, message: "Trop court" },
                })}
              />
              {errors.subject && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.subject.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted">
                Message
              </label>
              <textarea
                rows={4}
                className={cn(
                  inputClass,
                  "resize-none",
                  errors.body && "border-red-500/50"
                )}
                {...register("body", {
                  required: "Requis",
                  minLength: { value: 10, message: "10 caractères min." },
                })}
              />
              {errors.body && (
                <p className="mt-1 text-xs text-red-400">{errors.body.message}</p>
              )}
            </div>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Envoi…" : "Envoyer"}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
