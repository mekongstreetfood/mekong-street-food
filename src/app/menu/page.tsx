import type { Metadata } from "next";
import { MenuClient } from "@/components/menu/MenuClient";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Phở Mékong, Lok Lak Street, Bánh Mì et spécialités du Vietnam, du Cambodge et de la Thaïlande. Filtres par catégorie.",
};

export default function MenuPage() {
  return <MenuClient />;
}
