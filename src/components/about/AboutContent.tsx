"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const STORY_IMAGE =
  "https://images.unsplash.com/photo-1552912470-ee2e96439539?w=1400&q=80";

const countries = [
  {
    name: "Vietnam",
    text: "Phở fumant, herbes parfumées, équilibre sucré-salé-aigre.",
  },
  {
    name: "Cambodge",
    text: "Lok lak, citronnelle, piments du soleil — saveurs royales populaires.",
  },
  {
    name: "Thaïlande",
    text: "Currys coco, basilic sacré, street woks au feu vif.",
  },
  {
    name: "Chine du Sud",
    text: "Influences Mékong : nouilles, dim sum, fumées de wok.",
  },
];

export function AboutContent() {
  return (
    <>
      <p className="font-display text-sm font-semibold uppercase tracking-wider text-accent-secondary">
        Notre histoire
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold text-foreground md:text-5xl">
        Voyage le long du Mékong
      </h1>
        <p className="mt-6 max-w-3xl text-lg text-muted">
        Du delta au marché de nuit, nous suivons le fleuve pour rassembler ce
        qui fait la magie de la street food : produits frais, cuisine maison,
        et une promesse{" "}
        <strong className="text-foreground">100 % halal</strong> pour accueillir
        tous les gourmands.
      </p>

      <div className="relative mt-14 aspect-[21/9] overflow-hidden rounded-3xl border border-foreground/10">
        <Image
          src={STORY_IMAGE}
          alt="Cuisinière à un stand de street food asiatique"
          fill
          loading="lazy"
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        <p className="absolute bottom-6 left-6 max-w-md font-display text-2xl font-bold text-foreground drop-shadow-lg">
          Authentique. Généreux. Irrésistible.
        </p>
      </div>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Quatre rives, une même passion
        </h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {countries.map((c, i) => (
            <motion.li
              key={c.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-6"
            >
              <h3 className="font-display text-xl font-semibold text-accent-secondary">
                {c.name}
              </h3>
              <p className="mt-2 text-sm text-muted">{c.text}</p>
            </motion.li>
          ))}
        </ul>
      </section>
    </>
  );
}
