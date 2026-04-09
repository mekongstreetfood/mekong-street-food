"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { UserMenu } from "@/components/auth/UserMenu";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, setOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: scrolled ? "rgba(5, 5, 5, 0.72)" : "rgba(5, 5, 5, 0)",
      }}
      transition={{ duration: 0.25 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-transparent",
        scrolled && "border-foreground/10 backdrop-blur-xl"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center transition-opacity hover:opacity-85">
          <Image
            src="/logo.png"
            alt="Mekong Street Food"
            width={110}
            height={55}
            className="h-11 w-auto object-contain"
            priority
          />
        </Link>
        <Navbar scrolled={scrolled} />
        <div className="flex items-center gap-3">
          <UserMenu />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-foreground/15 text-foreground transition-colors hover:border-accent hover:text-accent"
            aria-label="Ouvrir le panier"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white"
              >
                {totalItems}
              </motion.span>
            )}
          </button>
          <Link
            href="/menu"
            className="hidden rounded-2xl bg-accent px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] md:inline-flex"
          >
            Commander
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
