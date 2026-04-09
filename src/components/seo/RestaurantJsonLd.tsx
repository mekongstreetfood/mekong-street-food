const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Mekong Street Food",
  description:
    "Street food authentique du Mékong — Vietnam, Cambodge, Thaïlande. Cuisine maison, produits frais, 100 % halal.",
  servesCuisine: ["Vietnamese", "Thai", "Cambodian", "Asian"],
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "368 route du Forez",
    addressLocality: "Davézieux",
    postalCode: "07430",
    addressCountry: "FR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "11:30",
      closes: "14:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "18:30",
      closes: "22:30",
    },
  ],
};

export function RestaurantJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
