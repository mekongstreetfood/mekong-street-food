import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomTabBar } from "@/components/layout/BottomTabBar";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { RestaurantJsonLd } from "@/components/seo/RestaurantJsonLd";
import { CartProvider } from "@/lib/cart";
import { LoyaltyProvider } from "@/lib/loyalty";
import { AuthProvider } from "@/lib/auth";
import { CartDrawer } from "@/components/cart/CartDrawer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const siteUrl = "https://mekong-street-food.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mekong Street Food | Street food du Mékong",
    template: "%s | Mekong Street Food",
  },
  description:
    "Street food authentique du Mékong — Vietnam, Cambodge, Thaïlande. Produits frais, cuisine maison, 100 % halal. Commandez ou réservez.",
  keywords: [
    "street food",
    "Mékong",
    "Vietnam",
    "pho",
    "restaurant halal",
    "livraison",
    "asian food",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Mekong Street Food",
    title: "Mekong Street Food | Saveurs du Mékong",
    description:
      "Street food premium — authentique, frais, 100 % halal. Menu, réservation, contact.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mekong Street Food",
    description: "Street food du Mékong — livraison & réservation.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${oswald.variable}`}>
      <body className="min-h-dvh font-sans">
        <AuthProvider>
        <LoyaltyProvider>
        <CartProvider>
          <RestaurantJsonLd />
          <CustomCursor />
          <Header />
          <CartDrawer />
          <main className="min-h-dvh">{children}</main>
          <Footer />
          <BottomTabBar />
        </CartProvider>
        </LoyaltyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
