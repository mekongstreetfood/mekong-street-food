"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { MenuItem } from "@/data/menu";
import { BADGE_LABELS } from "@/data/menu";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/cn";

export function DishCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      className="group relative overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/[0.04]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.div
          className="h-full w-full"
          whileHover={{ scale: 1.06 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          <Image
            src={item.imageSrc}
            alt={item.imageAlt}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            loading="lazy"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
        <motion.button
          type="button"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-white shadow-[0_8px_32px_rgba(255,0,60,0.45)] transition-shadow hover:shadow-[0_12px_40px_rgba(255,0,60,0.55)]"
          onClick={() => addItem(item)}
          aria-label={`Ajouter ${item.name}`}
        >
          <Plus className="h-6 w-6" strokeWidth={2.5} />
        </motion.button>
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          {item.featured && (
            <span className="rounded-full bg-accent-secondary/20 px-2.5 py-0.5 text-xs font-medium text-accent-secondary">
              Mis en avant
            </span>
          )}
          {item.badges.map((b) => (
            <span
              key={b}
              className={cn(
                "rounded-full px-2.5 py-0.5 text-xs font-medium",
                b === "vegan" && "bg-emerald-500/15 text-emerald-300",
                b === "spicy" && "bg-orange-500/15 text-orange-300",
                b === "best" && "bg-amber-500/15 text-amber-200"
              )}
            >
              {BADGE_LABELS[b]}
            </span>
          ))}
        </div>
        <h3 className="mt-3 font-display text-xl font-bold text-foreground">
          {item.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{item.description}</p>
        <p className="mt-4 font-display text-lg font-semibold text-accent">
          {item.price}
        </p>
      </div>
    </motion.article>
  );
}
