import type { Metadata } from "next";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Voyage le long du Mékong — Vietnam, Cambodge, Thaïlande, Chine. Histoire et valeurs de Mekong Street Food.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-24 sm:px-6 lg:px-8">
      <AboutContent />
    </div>
  );
}
