"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Instagram, MapPin } from "lucide-react";

const ADDRESS = "368 route du Forez, 07430 Davézieux";
const MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=368+route+du+Forez+07430+Dav%C3%A9zieux";
const INSTAGRAM_URL = "https://www.instagram.com/mekongstreetfood";

export function MaintenanceScreen() {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(255,0,60,0.12),transparent_60%)]" />
      <div className="smoke-layer" />
      <div className="film-grain" />

      <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/logo.png"
            alt="Mekong Street Food"
            width={140}
            height={70}
            className="mx-auto h-14 w-auto object-contain"
            priority
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="mt-8 font-display text-sm font-semibold uppercase tracking-[0.35em] text-accent-secondary"
        >
          Ouverture imminente
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.5 }}
          className="mt-4 font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl"
        >
          Notre site arrive bientôt
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.45 }}
          className="mx-auto mt-5 max-w-lg text-base text-muted"
        >
          Nous peaufinons le site en ce moment. Le restaurant ouvrira très bientôt.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.45 }}
          className="mt-10 grid gap-4 text-left sm:grid-cols-2"
        >
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-foreground/10 bg-foreground/[0.04] p-5 transition-colors hover:border-accent/40 hover:bg-foreground/[0.07]"
          >
            <MapPin className="h-5 w-5 text-accent" />
            <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted">
              Adresse
            </p>
            <p className="mt-1 text-sm font-medium text-foreground group-hover:text-accent">
              {ADDRESS}
            </p>
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-foreground/10 bg-foreground/[0.04] p-5 transition-colors hover:border-accent-secondary/40 hover:bg-foreground/[0.07]"
          >
            <Instagram className="h-5 w-5 text-accent-secondary" />
            <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted">
              Instagram
            </p>
            <p className="mt-1 text-sm font-medium text-foreground group-hover:text-accent-secondary">
              @mekongstreetfood
            </p>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.45 }}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.04] px-5 py-2.5 text-sm text-muted"
        >
          <Clock className="h-4 w-4 text-accent-secondary" />
          Lun–Dim · 11h–23h
        </motion.div>

        <motion.a
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.45 }}
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center rounded-2xl bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-accent/90 hover:shadow-[0_0_32px_rgba(255,0,60,0.35)]"
        >
          Voir l&apos;adresse
        </motion.a>
      </div>
    </div>
  );
}
