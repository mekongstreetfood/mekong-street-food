"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Leaf, Sparkles, Truck } from "lucide-react";
import { Card } from "@/components/ui/Card";

const IMG =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80";

const items = [
  {
    title: "Produits frais",
    text: "Marchés locaux, préparations quotidiennes, zéro compromis sur la qualité.",
    icon: Leaf,
  },
  {
    title: "100 % halal",
    text: "Une cuisine inclusive, traçable et respectueuse de tous les convives.",
    icon: Sparkles,
  },
  {
    title: "À emporter",
    text: "Emballages soignés, prêt en quelques minutes — à déguster où vous voulez.",
    icon: Truck,
  },
];

export function HomeHighlights() {
  return (
    <section className="relative border-t border-foreground/10 bg-background py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45 }}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-foreground/10"
          >
            <Image
              src={IMG}
              alt="Plats colorés — placeholder à remplacer"
              fill
              loading="lazy"
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-background/80 to-transparent" />
          </motion.div>
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-wider text-accent-secondary">
              Pourquoi nous choisir
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
              Une expérience street food, pensée comme une app native.
            </h2>
            <ul className="mt-10 space-y-5">
              {items.map(({ title, text, icon: Icon }, i) => (
                <motion.li
                  key={title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <Card className="flex gap-4 p-4 hover:border-accent/40">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {title}
                      </h3>
                      <p className="mt-1 text-sm text-muted">{text}</p>
                    </div>
                  </Card>
                </motion.li>
              ))}
            </ul>
            <Link
              href="/menu"
              className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-secondary"
            >
              Voir le menu
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
