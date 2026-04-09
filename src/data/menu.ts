export type MenuBadge = "vegan" | "spicy" | "best";

export type MenuCategory =
  | "Soupes & nouilles"
  | "Riz & wok"
  | "Street sandwiches"
  | "Desserts & boissons";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: MenuCategory;
  badges: MenuBadge[];
  imageSrc: string;
  imageAlt: string;
  featured?: boolean;
}

export const MENU_CATEGORIES: MenuCategory[] = [
  "Soupes & nouilles",
  "Riz & wok",
  "Street sandwiches",
  "Desserts & boissons",
];

/** Remplacez les URLs Unsplash par vos propres visuels. */
export const MENU_ITEMS: MenuItem[] = [
  {
    id: "pho-mekong",
    name: "Phở Mékong",
    description:
      "Bouillon parfumé 12h, bœuf halal, herbes fraîches, citron vert — notre signature.",
    price: "14,90 €",
    category: "Soupes & nouilles",
    badges: ["best"],
    featured: true,
    imageSrc:
      "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&q=80",
    imageAlt: "Bol de soupe phở — placeholder",
  },
  {
    id: "lok-lak-street",
    name: "Lok Lak Street",
    description:
      "Bœuf mariné, poivre du Kampot, riz vapeur, œuf au plat — Cambodge en assiette.",
    price: "13,50 €",
    category: "Riz & wok",
    badges: ["best", "spicy"],
    featured: true,
    imageSrc:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80",
    imageAlt: "Plat de riz et viune — placeholder",
  },
  {
    id: "banh-mi-mekong",
    name: "Bánh Mì Mékong",
    description:
      "Baguette croustillante, porc halal laqué, pickles maison, coriandre.",
    price: "9,90 €",
    category: "Street sandwiches",
    badges: ["best"],
    featured: true,
    imageSrc:
      "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&q=80",
    imageAlt: "Sandwich bánh mì — placeholder",
  },
  {
    id: "bun-bo-hue",
    name: "Bún Bò Huế",
    description: "Soupe épicée du centre Vietnam, pied de bœuf, citronnelle, menthe.",
    price: "13,90 €",
    category: "Soupes & nouilles",
    badges: ["spicy"],
    imageSrc:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80",
    imageAlt: "Soupe vietnamienne — placeholder",
  },
  {
    id: "pad-thai",
    name: "Pad Thaï Wok",
    description: "Nouilles de riz, crevettes ou tofu, cacahuètes, citron vert.",
    price: "12,50 €",
    category: "Riz & wok",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&q=80",
    imageAlt: "Pad thaï — placeholder",
  },
  {
    id: "green-curry",
    name: "Green Curry Maison",
    description: "Pâte de curry verte, lait de coco, légumes de saison, basilic thaï.",
    price: "13,90 €",
    category: "Riz & wok",
    badges: ["spicy"],
    imageSrc:
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80",
    imageAlt: "Curry vert — placeholder",
  },
  {
    id: "summer-rolls",
    name: "Rouleaux d'été Vegan",
    description: "Riz paper, légumes croquants, herbes, sauce arachide maison.",
    price: "7,50 €",
    category: "Street sandwiches",
    badges: ["vegan"],
    imageSrc:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
    imageAlt: "Rouleaux de printemps — placeholder",
  },
  {
    id: "mango-sticky",
    name: "Mangue Riz Gluant",
    description: "Riz gluant coco, mangue fraîche, graines de sésame torréfiées.",
    price: "6,90 €",
    category: "Desserts & boissons",
    badges: ["vegan"],
    imageSrc:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80",
    imageAlt: "Dessert mangue — placeholder",
  },
  {
    id: "thai-tea",
    name: "Thaï Tea Glacé",
    description: "Thé noir épices, lait concentré — douceur glacée du Siam.",
    price: "4,50 €",
    category: "Desserts & boissons",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80",
    imageAlt: "Boisson thaï — placeholder",
  },
];

export const BADGE_LABELS: Record<MenuBadge, string> = {
  vegan: "🌱 Vegan",
  spicy: "🌶️ Spicy",
  best: "⭐ Best",
};
