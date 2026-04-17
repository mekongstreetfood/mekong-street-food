export type MenuBadge = "vegan" | "spicy" | "best";

export type MenuCategory =
  | "Menus"
  | "Bowls & Nouilles"
  | "Woks & Curry"
  | "Sandwichs Street Food"
  | "À Partager"
  | "Accompagnements"
  | "Plats Familiaux"
  | "Desserts & Glaces"
  | "Douceurs du Mékong"
  | "Boissons";

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
  "Menus",
  "Bowls & Nouilles",
  "Woks & Curry",
  "Sandwichs Street Food",
  "À Partager",
  "Accompagnements",
  "Plats Familiaux",
  "Desserts & Glaces",
  "Douceurs du Mékong",
  "Boissons",
];

/** Remplacez les URLs Unsplash par vos propres visuels. */
export const MENU_ITEMS: MenuItem[] = [

  // ─── MENUS ───────────────────────────────────────────────────────────────────

  {
    id: "menu-banh-mi",
    name: "Menu Bánh Mì",
    description: "Bánh mì au choix + boisson classique",
    price: "8,90 €",
    category: "Menus",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1715925717150-2a6d181d8846?w=800&q=80",
    imageAlt: "Sandwichs bánh mì sur une planche",
  },
  {
    id: "menu-street-food",
    name: "Menu Street Food",
    description: "Plat au choix + boisson classique",
    price: "14,90 €",
    category: "Menus",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1641440615059-42c8ed3af8c8?w=800&q=80",
    imageAlt: "Table garnie de bols vietnamiens",
  },
  {
    id: "menu-gourmand",
    name: "Menu Gourmand",
    description: "Plat au choix + boisson classique + dessert au choix",
    price: "18,90 €",
    category: "Menus",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1675150277436-9c7348972c11?w=800&q=80",
    imageAlt: "Table avec plusieurs plats asiatiques",
  },
  {
    id: "gouter-mekong",
    name: "Goûter Mékong",
    description: "Bubble tea + kakigori ou taiyaki",
    price: "8,90 €",
    category: "Menus",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1525803377221-4f6ccdaa5133?w=800&q=80",
    imageAlt: "Deux bubble teas dans des verres avec pailles",
  },
  {
    id: "supplement-bubble-tea",
    name: "Supplément Bubble Tea",
    description: "Remplace boisson classique par bubble tea",
    price: "+2,00 €",
    category: "Menus",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1572932759882-bb34c848d1b3?w=800&q=80",
    imageAlt: "Gobelets bubble tea colorés",
  },

  // ─── BOWLS & NOUILLES ────────────────────────────────────────────────────────

  {
    id: "pho-mekong",
    name: "Phở Mékong",
    description:
      "Bouillon clair longuement infusé, bœuf ou poulet, herbes fraîches, citron vert et piment",
    price: "12,90 €",
    category: "Bowls & Nouilles",
    badges: ["best"],
    featured: true,
    imageSrc:
      "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&q=80",
    imageAlt: "Bol de phở vietnamien aux herbes fraîches",
  },
  {
    id: "bun-cha-ha-noi",
    name: "Bún Chả Hà Nội",
    description:
      "Bœuf ou poulet mariné grillé minute, vermicelles, herbes fraîches et sauce aigre-douce",
    price: "12,90 €",
    category: "Bowls & Nouilles",
    badges: ["vegan"],
    imageSrc:
      "https://images.unsplash.com/photo-1583316175701-0bc5f25a0a44?w=800&q=80",
    imageAlt: "Bol de nouilles blanches avec viande et légumes",
  },
  {
    id: "nom-banh-chok",
    name: "Nom Banh Chok",
    description:
      "Nouilles de riz fraîches, curry vert léger coco, poulet effiloché et légumes croquants",
    price: "11,90 €",
    category: "Bowls & Nouilles",
    badges: ["spicy"],
    imageSrc:
      "https://images.unsplash.com/photo-1618449840665-9ed506d73a34?w=800&q=80",
    imageAlt: "Bol de soupe curry en céramique noire",
  },
  {
    id: "lort-cha-mekong",
    name: "Lort Cha Mékong",
    description:
      "Nouilles sautées au wok, poulet mariné, sauce soja maison, œuf, ciboule et germes de soja",
    price: "11,90 €",
    category: "Bowls & Nouilles",
    badges: ["best", "vegan"],
    featured: true,
    imageSrc:
      "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&q=80",
    imageAlt: "Plat de nouilles sautées en bol blanc",
  },

  // ─── WOKS & CURRY ────────────────────────────────────────────────────────────

  {
    id: "lok-lak-street",
    name: "Lok Lak Street",
    description:
      "Bœuf sauté au wok, oignons, poivrons, sauce poivre-citron vert, riz jasmin",
    price: "13,90 €",
    category: "Woks & Curry",
    badges: ["best"],
    featured: true,
    imageSrc:
      "https://images.unsplash.com/photo-1622919946352-8ee892a6cd00?w=800&q=80",
    imageAlt: "Viande grillée au wok sur plateau noir",
  },
  {
    id: "amok-revisite",
    name: "Amok Revisité",
    description:
      "Poulet ou poisson, curry coco crémeux, citronnelle, galanga et riz parfumé",
    price: "12,90 €",
    category: "Woks & Curry",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80",
    imageAlt: "Curry coco en vue de dessus, bol blanc",
  },
  {
    id: "curry-vert-mekong",
    name: "Curry Vert du Mékong",
    description:
      "Poulet, aubergines thaï, basilic, lait de coco et riz jasmin",
    price: "12,90 €",
    category: "Woks & Curry",
    badges: ["spicy"],
    imageSrc:
      "https://images.unsplash.com/photo-1587040690786-b091531837a2?w=800&q=80",
    imageAlt: "Plat de légumes et curry vert en assiette blanche",
  },
  {
    id: "nouilles-cantonaises",
    name: "Nouilles Sautées Cantonaises",
    description:
      "Nouilles sautées au wok, poulet, crevettes, omelette et légumes",
    price: "11,90 €",
    category: "Woks & Curry",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1628997323766-c846909a7049?w=800&q=80",
    imageAlt: "Plat de nouilles sautées dans un bol brun",
  },

  // ─── SANDWICHS STREET FOOD ───────────────────────────────────────────────────

  {
    id: "banh-mi-mekong",
    name: "Bánh Mì Mékong",
    description:
      "Poulet citronnelle ou bœuf mariné, pickles carotte-daïkon, coriandre et sauce maison",
    price: "7,90 €",
    category: "Sandwichs Street Food",
    badges: ["vegan"],
    imageSrc:
      "https://images.unsplash.com/photo-1600454309261-3dc9b7597637?w=800&q=80",
    imageAlt: "Bánh mì garni de légumes verts et herbes",
  },
  {
    id: "banh-mi-saigon",
    name: "Bánh Mì Saigon",
    description:
      "Poulet grillé citronnelle, concombre, pickles, coriandre et mayo sriracha",
    price: "7,90 €",
    category: "Sandwichs Street Food",
    badges: ["vegan", "spicy"],
    imageSrc:
      "https://images.unsplash.com/photo-1715925717150-2a6d181d8846?w=800&q=80",
    imageAlt: "Bánh mì coupé sur une planche en bois",
  },

  // ─── À PARTAGER ──────────────────────────────────────────────────────────────

  {
    id: "nems-maison",
    name: "Nems Maison (x4)",
    description: "Poulet et légumes, sauce nuoc cham douce",
    price: "6,90 €",
    category: "À Partager",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1648726443433-d5a62ba13863?w=800&q=80",
    imageAlt: "Assiette de nems dorés croustillants",
  },
  {
    id: "bao-vapeur",
    name: "Bao Vapeur (x2)",
    description: "Poulet laqué ou bœuf mariné, pickles et coriandre",
    price: "7,90 €",
    category: "À Partager",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1668934807953-dffa0f3c575e?w=800&q=80",
    imageAlt: "Bao vapeur moelleux dans une assiette",
  },
  {
    id: "brochettes-satay",
    name: "Brochettes Satay (x3)",
    description: "Poulet mariné au curcuma, sauce cacahuète maison",
    price: "6,90 €",
    category: "À Partager",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1568882041008-c0954e91caba?w=800&q=80",
    imageAlt: "Brochettes de viande grillée sur brochettes",
  },
  {
    id: "raviolis-vapeur",
    name: "Raviolis Vapeur (x4)",
    description: "Poulet et légumes, sauce soja maison",
    price: "6,90 €",
    category: "À Partager",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1775883379159-6b9c8e3ed8df?w=800&q=80",
    imageAlt: "Raviolis vapeur dorés disposés en cercle",
  },
  {
    id: "banh-cuon-ha-noi",
    name: "Bánh Cuốn Hà Nội",
    description:
      "Crêpes de riz vapeur roulées, poulet & champignons, oignons frits et herbes fraîches",
    price: "7,90 €",
    category: "À Partager",
    badges: ["vegan"],
    imageSrc:
      "https://images.unsplash.com/photo-1597345637412-9fd611e758f3?w=800&q=80",
    imageAlt: "Bol de riz vapeur aux feuilles vertes",
  },

  // ─── ACCOMPAGNEMENTS ─────────────────────────────────────────────────────────

  {
    id: "riz-jasmin",
    name: "Riz Jasmin Parfumé",
    description: "",
    price: "3,50 €",
    category: "Accompagnements",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=800&q=80",
    imageAlt: "Bol de riz jasmin blanc parfumé",
  },
  {
    id: "riz-cantonais",
    name: "Riz Cantonais",
    description: "",
    price: "5,90 €",
    category: "Accompagnements",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1509072619873-adb3dc289b50?w=800&q=80",
    imageAlt: "Baguettes en bois sur bol de riz",
  },

  // ─── PLATS FAMILIAUX ─────────────────────────────────────────────────────────

  {
    id: "wok-du-mekong",
    name: "Wok du Mékong",
    description:
      "Nouilles sautées, curry vert, poulet satay, riz jasmin et légumes croquants",
    price: "39,00 €",
    category: "Plats Familiaux",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1668934807768-86542a6f579d?w=800&q=80",
    imageAlt: "Table festive avec de nombreux plats asiatiques",
  },
  {
    id: "banquet-street-food",
    name: "Banquet Street Food",
    description:
      "Nems, bao vapeur, raviolis, satay, nouilles sautées et riz parfumé",
    price: "49,00 €",
    category: "Plats Familiaux",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1641440615059-42c8ed3af8c8?w=800&q=80",
    imageAlt: "Banquet vietnamien avec de nombreux bols",
  },

  // ─── DESSERTS & GLACES ───────────────────────────────────────────────────────

  {
    id: "riz-gluant-coco-mangue",
    name: "Riz Gluant Coco & Mangue",
    description: "",
    price: "4,90 €",
    category: "Desserts & Glaces",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1705056508219-0aa0ceb16820?w=800&q=80",
    imageAlt: "Assiette noire avec riz gluant et tranches de mangue",
  },
  {
    id: "bananes-roties",
    name: "Bananes Rôties au Miel & Sésame",
    description: "",
    price: "4,90 €",
    category: "Desserts & Glaces",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1688084484828-b64b96b34855?w=800&q=80",
    imageAlt: "Assiette avec banane caramélisée et riz",
  },
  {
    id: "glaces-thai-plancha",
    name: "Glaces Thaï à la Plancha",
    description: "Mangue • Coco • Thé vert matcha",
    price: "5,90 €",
    category: "Desserts & Glaces",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1557142046-c704a3adf364?w=800&q=80",
    imageAlt: "Glaces colorées à la plancha",
  },
  {
    id: "kakigori-mekong",
    name: "Kakigori du Mékong",
    description: "Mangue • Passion • Tropical",
    price: "5,90 €",
    category: "Desserts & Glaces",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&q=80",
    imageAlt: "Kakigori — glace pilée aux fruits tropicaux",
  },
  {
    id: "taiyaki",
    name: "Taiyaki",
    description: "Haricot rouge • Crème • Nutella",
    price: "3,50 €",
    category: "Desserts & Glaces",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=800&q=80",
    imageAlt: "Taiyaki — gaufre japonaise en forme de poisson",
  },

  // ─── DOUCEURS DU MÉKONG (servies à partir de 14h) ───────────────────────────

  {
    id: "roti-thai-banane",
    name: "Roti Thaï Banane",
    description: "",
    price: "5,90 €",
    category: "Douceurs du Mékong",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1518206618010-53b76c9e4b2a?w=800&q=80",
    imageAlt: "Roti thaï croustillant à la banane",
  },
  {
    id: "kanoum-krok-coco",
    name: "Kanoum Krok Coco (x6)",
    description: "",
    price: "5,90 €",
    category: "Douceurs du Mékong",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80",
    imageAlt: "Petits gâteaux ronds à la noix de coco",
  },
  {
    id: "mangue-fraiche-riz-gluant",
    name: "Mangue fraîche & riz gluant",
    description: "",
    price: "6,90 €",
    category: "Douceurs du Mékong",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1705234384751-84081009588e?w=800&q=80",
    imageAlt: "Assiette de riz gluant avec mangue fraîche et sauce coco",
  },
  {
    id: "supplement-nutella-mangue",
    name: "Supplément Nutella ou mangue",
    description: "",
    price: "+1,00 €",
    category: "Douceurs du Mékong",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1703763253190-4af44c87a23e?w=800&q=80",
    imageAlt: "Coupe de fruits et glace en verre",
  },

  // ─── BOISSONS ────────────────────────────────────────────────────────────────

  {
    id: "eaux",
    name: "Eaux",
    description: "",
    price: "2,50 €",
    category: "Boissons",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1523371054106-bbf80586c54b?w=800&q=80",
    imageAlt: "Bouteille d'eau minérale",
  },
  {
    id: "sodas",
    name: "Sodas",
    description: "",
    price: "3,00 €",
    category: "Boissons",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&q=80",
    imageAlt: "Canettes de sodas colorées",
  },
  {
    id: "the-glace-citronnelle-menthe",
    name: "Thé glacé citronnelle-menthe",
    description: "",
    price: "3,50 €",
    category: "Boissons",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1637273484093-3e205aed2c59?w=800&q=80",
    imageAlt: "Thé vert glacé versé dans un verre",
  },
  {
    id: "the-au-jasmin",
    name: "Thé au jasmin",
    description: "",
    price: "3,50 €",
    category: "Boissons",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1686860792691-d324f79d3fcc?w=800&q=80",
    imageAlt: "Verre de thé au jasmin chaud",
  },
  {
    id: "bubble-tea",
    name: "Bubble Tea",
    description: "Mangue • Litchi • Thé au lait",
    price: "4,90 €",
    category: "Boissons",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1525803377221-4f6ccdaa5133?w=800&q=80",
    imageAlt: "Bubble tea dans des verres avec pailles et tapioca",
  },
  {
    id: "jus-frais",
    name: "Jus frais",
    description: "",
    price: "4,50 €",
    category: "Boissons",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=800&q=80",
    imageAlt: "Verre de jus de fruit frais pressé",
  },
  {
    id: "cafe-vietnamien",
    name: "Café vietnamien",
    description: "",
    price: "3,50 €",
    category: "Boissons",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1558857563-7a5bd4b7c71e?w=800&q=80",
    imageAlt: "Café vietnamien au lait condensé",
  },
  {
    id: "citronnade-maison",
    name: "Citronnade maison",
    description: "",
    price: "3,50 €",
    category: "Boissons",
    badges: [],
    imageSrc:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80",
    imageAlt: "Citronnade maison avec glaçons et citron",
  },
];

export const BADGE_LABELS: Record<MenuBadge, string> = {
  best: "⭐ Signature",
  vegan: "🌱 Végétarien possible",
  spicy: "🌶️ Piment",
};
