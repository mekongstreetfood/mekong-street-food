"use client";

import { motion } from "framer-motion";

const countries = [
  {
    flag: "🇻🇳",
    name: "Vietnam",
    tag: "Phở · Bánh Mì · Bún",
    text: "Bouillons fumants, herbes fraîches, équilibre parfait entre l'acide, le sucré et l'umami.",
    color: "from-red-500/20 to-yellow-500/10",
  },
  {
    flag: "🇰🇭",
    name: "Cambodge",
    tag: "Lok Lak · Amok · Kuy Teav",
    text: "Poivre de Kampot, lait de coco, pâtes de curry — la royauté Khmer dans l'assiette.",
    color: "from-blue-500/20 to-red-500/10",
  },
  {
    flag: "🇹🇭",
    name: "Thaïlande",
    tag: "Pad Thaï · Green Curry · Tom Kha",
    text: "Basilic sacré, wok à feu vif, currys crémeux — la street food la plus populaire au monde.",
    color: "from-red-500/20 to-blue-500/10",
  },
  {
    flag: "🇨🇳",
    name: "Chine du Sud",
    tag: "Dim Sum · Wonton · Char Siu",
    text: "Influence millénaire du fleuve Mékong : sauces fermentées, nouilles, saveurs profondes.",
    color: "from-yellow-500/20 to-red-500/10",
  },
];

export function Origins() {
  return (
    <section className="border-t border-foreground/10 bg-background py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.42 }}
          className="text-center"
        >
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-accent-secondary">
            Le voyage
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
            Quatre pays, un fleuve, une passion
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Le Mékong traverse 4 000 km de cultures et de saveurs. Nous les
            rassemblons dans chaque assiette.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {countries.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06, duration: 0.42 }}
              className={`rounded-3xl border border-foreground/10 bg-gradient-to-br ${c.color} p-6 backdrop-blur-sm`}
            >
              <span className="text-4xl">{c.flag}</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-foreground">
                {c.name}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-accent-secondary">
                {c.tag}
              </p>
              <p className="mt-3 text-sm text-muted">{c.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
