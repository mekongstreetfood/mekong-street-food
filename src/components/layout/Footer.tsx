import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-foreground/10 bg-background/90 pb-28 md:pb-12">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Image
              src="/logo.png"
              alt="Mekong Street Food"
              width={130}
              height={65}
              className="h-14 w-auto object-contain"
            />
            <p className="mt-3 max-w-xs text-sm text-muted">
              Street food du Mékong — Vietnam, Cambodge, Thaïlande. Frais,
              maison, 100 % halal.
            </p>
          </div>
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-wider text-accent-secondary">
              Liens
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>
                <Link href="/menu" className="hover:text-foreground">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/fidelite" className="hover:text-foreground">
                  Fidélité
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-foreground">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-wider text-accent-secondary">
              Horaires
            </p>
            <p className="mt-4 text-sm text-muted">
              Lun–Dim · 11h30 – 14h30 · 18h30 – 22h30
              <br />
              <span className="text-foreground/80">
                368 route du Forez<br />07430 Davézieux
              </span>
            </p>
          </div>
        </div>
        <p className="mt-10 border-t border-foreground/10 pt-8 text-center text-xs text-muted">
          © {new Date().getFullYear()} Mekong Street Food. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
