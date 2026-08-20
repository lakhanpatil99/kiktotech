import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "glass rounded-3xl p-6 shadow-card sm:p-8",
        interactive &&
          "transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Badge({
  children,
  className,
  tone = "accent",
}: {
  children: ReactNode;
  className?: string;
  tone?: "accent" | "neutral" | "success" | "warning";
}) {
  const tones = {
    accent: "bg-accent/12 text-accent border-accent/30",
    neutral: "bg-white/5 text-primary-foreground/80 border-line",
    success: "bg-emerald-400/12 text-emerald-300 border-emerald-400/30",
    warning: "bg-amber-400/12 text-amber-300 border-amber-400/30",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
