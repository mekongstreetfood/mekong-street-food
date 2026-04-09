import type { Metadata } from "next";
import Image from "next/image";
import { Clock, MapPin, Phone } from "lucide-react";
import { ReservationForm } from "@/components/forms/ReservationForm";

export const metadata: Metadata = {
  title: "Réservation",
  description:
    "Réservez votre table en ligne chez Mekong Street Food — 368 route du Forez, 07430 Davézieux.",
};

const SIDE_IMAGE =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80";

const horaires = [
  { jour: "Lundi – Vendredi", midi: "11h30 – 14h30", soir: "18h30 – 22h30" },
  { jour: "Samedi", midi: "11h30 – 15h00", soir: "18h00 – 23h00" },
  { jour: "Dimanche", midi: "12h00 – 15h00", soir: "18h30 – 22h00" },
];

export default function ReservationPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-24 sm:px-6 lg:px-8">
      <p className="font-display text-sm font-semibold uppercase tracking-wider text-accent-secondary">
        Table
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold text-foreground md:text-5xl">
        Réserver une table
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        Remplissez le formulaire — nous vous confirmons sous 24h par e-mail ou téléphone.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start">
        {/* Colonne gauche : formulaire + infos */}
        <div className="space-y-6">
          <ReservationForm />

          {/* Ou par téléphone */}
          <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.04] p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Ou par téléphone
            </p>
            <a
              href="tel:+33000000000"
              className="mt-2 flex items-center gap-3 text-foreground transition-colors hover:text-accent"
            >
              <Phone className="h-5 w-5 text-accent" />
              <span className="font-display text-xl font-bold">
                +33 0 00 00 00 00
              </span>
            </a>
            <div className="mt-4 flex items-start gap-3 text-sm text-muted">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-secondary" />
              <span>368 route du Forez — 07430 Davézieux</span>
            </div>
          </div>
        </div>

        {/* Colonne droite : image + horaires */}
        <div className="space-y-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-foreground/10">
            <Image
              src={SIDE_IMAGE}
              alt="Salle du restaurant — placeholder"
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 45vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="font-display text-xl font-bold text-foreground">
                Une table pour vous
              </p>
              <p className="mt-1 text-sm text-muted">
                Ambiance authentique, saveurs du Mékong.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.04] p-6">
            <div className="mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent-secondary" />
              <p className="font-display text-base font-semibold text-foreground">
                Horaires
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
                    <td className="py-2.5 font-medium text-foreground">
                      {h.jour}
                    </td>
                    <td className="py-2.5 text-muted">{h.midi}</td>
                    <td className="py-2.5 text-muted">{h.soir}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
