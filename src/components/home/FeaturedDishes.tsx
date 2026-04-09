"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MENU_ITEMS, BADGE_LABELS } from "@/data/menu";
import { cn } from "@/lib/cn";

const featured = MENU_ITEMS.filter((i) => i.featured);

export function FeaturedDishes() {
  return (
    <section className="border-t border-foreground/10 bg-background py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-wider text-accent-secondary">
              Les incontournables
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
              Nos plats signatures
            </h2>
          </div>
          <Link
            href="/menu"
            className="hidden items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-secondary sm:inline-flex"
          >
            Tout voir <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {featured.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.07, duration: 0.42 }}
              className="group relative overflow-hidden rounded-3xl border border-foreground/10"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <motion.div
                  className="h-full w-full"
                  whileHover={{ scale: 1.07 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                >
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    loading="lazy"
                    sizes="(max-width:640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-1.5">
                  {item.badges.map((b) => (
                    <span
                      key={b}
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-medium",
                        b === "best" && "bg-amber-500/15 text-amber-200",
                        b === "spicy" && "bg-orange-500/15 text-orange-300",
                        b === "vegan" && "bg-emerald-500/15 text-emerald-300"
                      )}
                    >
                      {BADGE_LABELS[b]}
                    </span>
                  ))}
                </div>
                <h3 className="mt-3 font-display text-xl font-bold text-foreground">
                  {item.name}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm text-muted">
                  {item.description}
                </p>
                <p className="mt-4 font-display text-lg font-semibold text-accent">
                  {item.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/menu"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
          >
            Voir tout le menu <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
