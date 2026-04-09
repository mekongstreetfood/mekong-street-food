"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { GoogleReview } from "@/app/api/reviews/route";

const FALLBACK_REVIEWS = [
  { author_name: "Camille R.", rating: 5, text: "Le Phở Mékong est incroyable — bouillon parfumé, viande fondante. Je reviens chaque semaine.", relative_time_description: "il y a 2 semaines", profile_photo_url: "" },
  { author_name: "Youssef M.", rating: 5, text: "Cuisine 100 % halal et tellement savoureuse. Le Lok Lak est une révélation. Service rapide.", relative_time_description: "il y a 1 mois", profile_photo_url: "" },
  { author_name: "Sophie D.", rating: 5, text: "Le meilleur Bánh Mì du secteur. Tout est frais, généreux. L'équipe est adorable.", relative_time_description: "il y a 3 semaines", profile_photo_url: "" },
  { author_name: "Karim B.", rating: 5, text: "Thai tea + pad thaï = combo parfait. Un vrai voyage sensoriel dès la première bouchée.", relative_time_description: "il y a 2 mois", profile_photo_url: "" },
  { author_name: "Léa T.", rating: 5, text: "Les rouleaux vegan sont légers et généreux. L'ambiance street food est au top !", relative_time_description: "il y a 1 semaine", profile_photo_url: "" },
  { author_name: "Mehdi A.", rating: 5, text: "Plats encore chauds, service souriant. Le curry vert est mémorable.", relative_time_description: "il y a 3 mois", profile_photo_url: "" },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: Math.min(n, 5) }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function Avatar({ name, src }: { name: string; src: string }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={name} className="h-9 w-9 rounded-full object-cover" referrerPolicy="no-referrer" />;
  }
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

export function Testimonials() {
  const [reviews, setReviews] = useState<GoogleReview[]>(FALLBACK_REVIEWS);
  const [rating, setRating] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [fromGoogle, setFromGoogle] = useState(false);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data) => {
        if (data.configured && data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews);
          setRating(data.rating ?? null);
          setTotal(data.total ?? null);
          setFromGoogle(true);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="border-t border-foreground/10 bg-background py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.42 }}
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-wider text-accent-secondary">
              Avis clients
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Ce qu&apos;ils en disent
              </h2>
              {fromGoogle && rating && (
                <span className="flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-sm font-semibold text-amber-300">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {rating.toFixed(1)} · {total} avis Google
                </span>
              )}
            </div>
          </div>
          <a
            href="https://www.google.com/maps/search/Mekong+Street+Food+368+route+du+Forez+07430+Davézieux"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-2xl border border-foreground/15 bg-foreground/[0.04] px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:text-accent"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Laisser un avis Google
          </a>
        </motion.div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.blockquote
              key={`${r.author_name}-${i}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="flex flex-col gap-4 rounded-3xl border border-foreground/10 bg-foreground/[0.04] p-6"
            >
              <Stars n={r.rating} />
              <p className="flex-1 text-sm leading-relaxed text-foreground/85">
                &ldquo;{r.text}&rdquo;
              </p>
              <footer className="flex items-center justify-between border-t border-foreground/10 pt-4">
                <div className="flex items-center gap-2.5">
                  <Avatar name={r.author_name} src={r.profile_photo_url} />
                  <p className="font-medium text-foreground">{r.author_name}</p>
                </div>
                <p className="text-xs text-muted">{r.relative_time_description}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>

        {!fromGoogle && (
          <p className="mt-6 text-center text-xs text-muted">
            Avis provisoires — configurez{" "}
            <code className="rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-accent">
              GOOGLE_PLACES_API_KEY
            </code>{" "}
            dans <code className="rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-accent">.env.local</code> pour afficher vos vrais avis Google.
          </p>
        )}
      </div>
    </section>
  );
}
