"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Gift, Home, MapPin, User, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/cn";
import { useAuth } from "@/lib/auth";

const tabs = [
  { href: "/", label: "Accueil", Icon: Home },
  { href: "/menu", label: "Menu", Icon: UtensilsCrossed },
  { href: "/fidelite", label: "Fidélité", Icon: Gift },
  { href: "/contact", label: "Contact", Icon: MapPin },
];

export function BottomTabBar() {
  const pathname = usePathname();
  const { user, openAuthModal } = useAuth();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-foreground/10 bg-background/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-2xl md:hidden"
      aria-label="Navigation mobile"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-around px-2 pt-2">
        {tabs.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={cn(
                  "relative flex flex-col items-center gap-1 py-2 text-[10px] font-medium transition-colors",
                  active ? "text-accent" : "text-muted"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-x-2 -top-0.5 h-1 rounded-full bg-gradient-to-r from-accent to-accent-secondary"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <motion.span
                  whileTap={{ scale: 0.88 }}
                  className="flex h-10 w-10 items-center justify-center rounded-2xl"
                >
                  <Icon
                    className={cn(
                      "h-5 w-5",
                      active && "drop-shadow-[0_0_8px_rgba(255,0,60,0.6)]"
                    )}
                    strokeWidth={active ? 2.5 : 2}
                  />
                </motion.span>
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
        {/* Onglet Profil */}
        <li className="flex-1">
          {user ? (
            <Link
              href="/fidelite"
              className={cn(
                "relative flex flex-col items-center gap-1 py-2 text-[10px] font-medium transition-colors",
                pathname === "/profil" ? "text-accent" : "text-muted"
              )}
            >
              <motion.span
                whileTap={{ scale: 0.88 }}
                className="flex h-10 w-10 items-center justify-center rounded-2xl"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white">
                  {user.name[0].toUpperCase()}
                </span>
              </motion.span>
              <span>{user.name.split(" ")[0]}</span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => openAuthModal("login")}
              className="relative flex w-full flex-col items-center gap-1 py-2 text-[10px] font-medium text-muted transition-colors"
            >
              <motion.span
                whileTap={{ scale: 0.88 }}
                className="flex h-10 w-10 items-center justify-center rounded-2xl"
              >
                <User className="h-5 w-5" strokeWidth={2} />
              </motion.span>
              <span>Connexion</span>
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}
