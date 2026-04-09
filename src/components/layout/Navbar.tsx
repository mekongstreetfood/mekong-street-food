"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/menu", label: "Menu" },
  { href: "/fidelite", label: "Fidélité" },
  { href: "/contact", label: "Contact" },
  { href: "/a-propos", label: "À propos" },
];

export function Navbar({ scrolled }: { scrolled: boolean }) {
  const pathname = usePathname();

  return (
    <nav
      className="hidden items-center gap-1 md:flex"
      aria-label="Navigation principale"
    >
      {links.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "relative rounded-xl px-4 py-2 text-sm font-medium transition-colors",
              active
                ? "text-accent"
                : "text-muted hover:text-foreground",
              scrolled && "text-foreground/90"
            )}
          >
            {label}
            {active && (
              <span
                className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-accent to-accent-secondary"
                aria-hidden
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
