import type { Metadata } from "next";
import { Clock, Instagram, Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Adresse, téléphone, horaires et réseaux sociaux — Mekong Street Food.",
};


const infos = [
  {
    icon: MapPin,
    label: "Adresse",
    value: "368 route du Forez",
    sub: "07430 Davézieux",
    color: "text-accent",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+33 0 00 00 00 00",
    sub: "Lun–Dim · 10h–23h",
    color: "text-accent",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "contact@mekong-street-food.fr",
    sub: "Réponse sous 24h",
    color: "text-accent-secondary",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@mekongstreetfood",
    sub: "Suivez nos actualités",
    color: "text-accent-secondary",
  },
];

const horaires = [
  { jour: "Lundi – Vendredi", midi: "11h30 – 14h30", soir: "18h30 – 22h30" },
  { jour: "Samedi", midi: "11h30 – 15h00", soir: "18h00 – 23h00" },
  { jour: "Dimanche", midi: "12h00 – 15h00", soir: "18h30 – 22h00" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-24 sm:px-6 lg:px-8">
      <p className="font-display text-sm font-semibold uppercase tracking-wider text-accent-secondary">
        Nous trouver
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold text-foreground md:text-5xl">
        Contact
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        Venez nous rendre visite ou appelez-nous — toujours présents pour vous
        accueillir.
      </p>

      {/* Google Maps */}
      <div className="relative mt-12 overflow-hidden rounded-3xl border border-foreground/10">
        <iframe
          src="https://maps.google.com/maps?q=368%20route%20du%20Forez%2C%2007430%20Dav%C3%A9zieux&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="380"
          style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mekong Street Food — 368 route du Forez, 07430 Davézieux"
        />
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=368+route+du+Forez+07430+Dav%C3%A9zieux"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 flex items-center gap-2 rounded-2xl bg-background/90 px-4 py-2.5 text-sm font-semibold text-foreground backdrop-blur-md transition-colors hover:text-accent"
        >
          <MapPin className="h-4 w-4 text-accent" />
          Itinéraire
        </a>
      </div>

      {/* Infos */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {infos.map(({ icon: Icon, label, value, sub, color }) => (
          <div
            key={label}
            className="rounded-3xl border border-foreground/10 bg-foreground/[0.04] p-6"
          >
            <Icon className={`h-6 w-6 ${color}`} />
            <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted">
              {label}
            </p>
            <p className="mt-1 font-medium text-foreground">{value}</p>
            <p className="mt-0.5 text-xs text-muted">{sub}</p>
          </div>
        ))}
      </div>

      {/* Horaires */}
      <div className="mt-10 rounded-3xl border border-foreground/10 bg-foreground/[0.04] p-7">
        <div className="mb-5 flex items-center gap-2">
          <Clock className="h-5 w-5 text-accent-secondary" />
          <p className="font-display text-lg font-semibold text-foreground">
            Horaires d&apos;ouverture
          </p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-foreground/10 text-left text-xs uppercase tracking-wider text-muted">
              <th className="pb-2 font-medium">Jour</th>
              <th className="pb-2 font-medium">Midi</th>
              <th className="pb-2 font-medium">Soir</th>
            </tr>
          </thead>
          <tbody>
            {horaires.map((h) => (
              <tr
                key={h.jour}
                className="border-b border-foreground/[0.06] last:border-0"
              >
                <td className="py-3 font-medium text-foreground">{h.jour}</td>
                <td className="py-3 text-muted">{h.midi}</td>
                <td className="py-3 text-muted">{h.soir}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
