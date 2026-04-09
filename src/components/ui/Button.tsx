"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "neon";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  className?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white shadow-lg hover:bg-accent/90 active:scale-[0.98]",
  secondary:
    "bg-accent-secondary text-background font-semibold hover:brightness-110 active:scale-[0.98]",
  ghost:
    "bg-transparent text-foreground border border-foreground/20 hover:border-accent hover:text-accent",
  neon:
    "relative overflow-hidden bg-gradient-to-r from-accent to-accent-secondary text-white font-semibold animate-neon-pulse border border-accent/50 hover:brightness-110 active:scale-[0.98]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={disabled ? undefined : { scale: 0.97 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          className
        )}
        disabled={disabled}
        {...(props as HTMLMotionProps<"button">)}
      >
        {variant === "neon" && (
          <span
            className="pointer-events-none absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-40"
            aria-hidden
          />
        )}
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";
