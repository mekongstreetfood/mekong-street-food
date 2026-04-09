"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ChevronRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="border-t border-foreground/10 bg-background py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/10 via-background to-accent-secondary/10 p-10 text-center md:p-16"
        >
          {/* Glow derrière */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 100%, #FF003C, transparent)",
            }}
          />
          <p className="relative font-display text-sm font-semibold uppercase tracking-wider text-accent-secondary">
            Prêt à voyager ?
          </p>
          <h2 className="relative mt-3 font-display text-3xl font-bold text-foreground md:text-5xl">
            Une faim du Mékong ?
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-muted">
            Composez votre commande et venez la chercher sur place — chaque plat
            préparé à la minute avec des produits frais.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/menu">
              <Button variant="neon" className="min-h-[52px] px-8 text-base">
                Voir le menu
              </Button>
            </Link>
            <Link href="/a-propos">
              <Button variant="ghost" className="min-h-[52px]">
                Notre histoire <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
