import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Mekong Street Food — éditeur, hébergeur, données personnelles.",
  robots: { index: false, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-28 pt-28 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
        Mentions légales
      </h1>
      <p className="mt-2 text-sm text-muted">
        Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l&apos;économie numérique.
      </p>

      <Section title="1. Éditeur du site">
        <Row label="Dénomination sociale" value="Mekong Street Food" />
        <Row label="Forme juridique" value="[SARL / SAS / EI — à compléter]" placeholder />
        <Row label="Capital social" value="[Montant — à compléter]" placeholder />
        <Row label="SIRET" value="[Numéro SIRET — à compléter]" placeholder />
        <Row label="Siège social" value="368 route du Forez, 07430 Davézieux" />
        <Row label="Téléphone" value="[Numéro — à compléter]" placeholder />
        <Row label="Email" value="[contact@mekongstreetfood.fr — à compléter]" placeholder />
        <Row label="Directeur de la publication" value="[Nom du gérant — à compléter]" placeholder />
      </Section>

      <Section title="2. Hébergeur">
        <Row label="Société" value="Vercel Inc." />
        <Row label="Adresse" value="340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis" />
        <Row label="Site web" value="https://vercel.com" />
      </Section>

      <Section title="3. Propriété intellectuelle">
        <p className="text-sm leading-relaxed text-muted">
          L&apos;ensemble du contenu de ce site (textes, images, logos, photographies, vidéos, illustrations) est la propriété exclusive de Mekong Street Food, sauf mention contraire. Toute reproduction, distribution, modification ou utilisation de ce contenu, même partielle, sans autorisation écrite préalable de l&apos;éditeur est strictement interdite et constituerait une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Les photographies de plats utilisées à titre illustratif proviennent de la bibliothèque libre de droits Unsplash et seront progressivement remplacées par des visuels propriétaires.
        </p>
      </Section>

      <Section title="4. Données personnelles (RGPD)">
        <p className="text-sm leading-relaxed text-muted">
          Dans le cadre de l&apos;utilisation de ce site, Mekong Street Food est susceptible de collecter des données personnelles vous concernant (nom, adresse email, historique de commandes) afin de gérer votre compte client et votre programme de fidélité.
        </p>
        <ul className="mt-3 space-y-1.5 text-sm text-muted list-disc list-inside">
          <li><strong className="text-foreground/70">Responsable du traitement :</strong> Mekong Street Food, 368 route du Forez, 07430 Davézieux</li>
          <li><strong className="text-foreground/70">Finalité :</strong> gestion des comptes clients, programme de fidélité, traitement des commandes</li>
          <li><strong className="text-foreground/70">Base légale :</strong> exécution du contrat et consentement de l&apos;utilisateur</li>
          <li><strong className="text-foreground/70">Durée de conservation :</strong> 3 ans à compter de la dernière activité</li>
          <li><strong className="text-foreground/70">Sous-traitant :</strong> Supabase Inc. (stockage des données d&apos;authentification)</li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits, contactez-nous à{" "}
          <a href="mailto:contact@mekongstreetfood.fr" className="text-accent-secondary hover:underline">
            contact@mekongstreetfood.fr
          </a>.
        </p>
      </Section>

      <Section title="5. Cookies">
        <p className="text-sm leading-relaxed text-muted">
          Ce site utilise des cookies techniques strictement nécessaires à son fonctionnement (authentification, panier). Aucun cookie publicitaire ou de traçage tiers n&apos;est utilisé sans votre consentement.
        </p>
      </Section>

      <Section title="6. Limitation de responsabilité">
        <p className="text-sm leading-relaxed text-muted">
          Mekong Street Food s&apos;efforce de maintenir les informations publiées sur ce site à jour et exactes. Toutefois, l&apos;éditeur ne saurait être tenu responsable des erreurs ou omissions, ni des dommages directs ou indirects résultant de l&apos;utilisation de ce site.
        </p>
      </Section>

      <Section title="7. Droit applicable">
        <p className="text-sm leading-relaxed text-muted">
          Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.
        </p>
      </Section>

      <p className="mt-10 text-xs text-muted/60">
        Dernière mise à jour : avril 2026
      </p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-lg font-semibold text-foreground border-b border-foreground/10 pb-2">
        {title}
      </h2>
      <div className="mt-4 space-y-2">{children}</div>
    </section>
  );
}

function Row({ label, value, placeholder }: { label: string; value: string; placeholder?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2 text-sm">
      <span className="w-48 shrink-0 font-medium text-foreground/60">{label}</span>
      <span className={placeholder ? "italic text-muted/50" : "text-muted"}>{value}</span>
    </div>
  );
}
