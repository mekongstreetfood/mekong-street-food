"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import {
  MENU_CATEGORIES,
  MENU_ITEMS,
  type MenuCategory,
} from "@/data/menu";
import { DishCard } from "@/components/menu/DishCard";
import { cn } from "@/lib/cn";

export function MenuClient() {
  const [category, setCategory] = useState<MenuCategory | "Tout">("Tout");

  const featured = useMemo(
    () => MENU_ITEMS.filter((i) => i.featured),
    []
  );
  const featuredIds = useMemo(
    () => new Set(featured.map((i) => i.id)),
    [featured]
  );

  const filtered = useMemo(() => {
    if (category === "Tout") {
      return MENU_ITEMS.filter((i) => !featuredIds.has(i.id));
    }
    return MENU_ITEMS.filter((i) => i.category === category);
  }, [category, featuredIds]);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl"
      >
        <p className="font-display text-sm font-semibold uppercase tracking-wider text-accent-secondary">
          Carte
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold text-foreground md:text-5xl">
          Menu Mékong
        </h1>
        <p className="mt-4 text-muted">
          Filtrez par catégorie — sans rechargement. Remplacez les visuels
          Unsplash par vos photos.
        </p>
      </motion.div>

      {category === "Tout" && (
        <section className="mt-14">
          <h2 className="font-display text-lg font-semibold text-foreground">
            Plats mis en avant
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <DishCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      <div className="sticky top-16 z-30 -mx-4 mt-16 border-y border-foreground/10 bg-background/80 px-4 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
          Catégories
        </p>
        <LayoutGroup>
          <div className="flex flex-wrap gap-2">
            {(["Tout", ...MENU_CATEGORIES] as const).map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-white"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="category-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-secondary shadow-lg"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      <motion.div layout className="mt-10">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={category}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((item) => (
              <DishCard key={item.id} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
