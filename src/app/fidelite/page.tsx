import type { Metadata } from "next";
import { LoyaltyPageClient } from "@/components/loyalty/LoyaltyPageClient";

export const metadata: Metadata = {
  title: "Fidélité",
  description:
    "Programme de fidélité Mekong Street Food — gagnez des points à chaque commande et profitez de plats offerts.",
};

export default function FidelitePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-28 pt-24 sm:px-6 lg:px-8">
      <p className="font-display text-sm font-semibold uppercase tracking-wider text-accent-secondary">
        Programme
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold text-foreground md:text-5xl">
        Fidélité
      </h1>
      <p className="mt-4 text-muted">
        Commandez, cumulez des points et profitez de plats offerts — automatiquement.
      </p>
      <div className="mt-10">
        <LoyaltyPageClient />
      </div>
    </div>
  );
}
