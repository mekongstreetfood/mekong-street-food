"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ChevronRight } from "lucide-react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1400&q=85";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-16">
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="Ambiance street food — image placeholder à remplacer"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
        <div className="smoke-layer" />
        <div className="film-grain" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl items-center px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-10 lg:grid-cols-2">

          {/* Colonne texte */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.45 }}
              className="font-display text-sm font-semibold uppercase tracking-[0.35em] text-accent-secondary"
            >
              368 route du Forez · 07430 Davézieux
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mt-4 font-display text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl"
            >
              Voyagez au cœur des saveurs du Mékong, entre street food authentique
              et explosion de goûts.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.45 }}
              className="mt-6 max-w-xl text-base text-muted"
            >
              À emporter · Sur place — cuisine maison, produits frais, 100 % halal.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.45 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link href="/menu">
                <Button variant="neon" className="min-h-[52px] px-8 text-base">
                  Commander
                </Button>
              </Link>
              <Link href="/a-propos">
                <Button variant="ghost" className="min-h-[52px]">
                  Notre histoire
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Logo géant à droite */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="hidden items-center justify-center lg:flex"
          >
            <Image
              src="/logo.png"
              alt="Mekong Street Food"
              width={480}
              height={480}
              className="w-full max-w-md drop-shadow-[0_8px_48px_rgba(255,138,0,0.4)]"
              priority
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
