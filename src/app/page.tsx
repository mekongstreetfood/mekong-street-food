import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { HomeHighlights } from "@/components/home/HomeHighlights";
import { FeaturedDishes } from "@/components/home/FeaturedDishes";
import { Origins } from "@/components/home/Origins";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaBanner } from "@/components/home/CtaBanner";

export const metadata: Metadata = {
  title: "Accueil",
  description:
    "Voyagez au cœur des saveurs du Mékong. Street food authentique, livraison et réservation.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeHighlights />
      <FeaturedDishes />
      <Origins />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
