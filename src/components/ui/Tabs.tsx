"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easePremium } from "@/lib/motion";

export interface TabItem {
  key: string;
  label: string;
  content: ReactNode;
}

/** Accessible animated tabs with a sliding active indicator. */
export function Tabs({ items, className }: { items: TabItem[]; className?: string }) {
  const [active, setActive] = useState(items[0]?.key);

  return (
    <div className={className}>
      <div role="tablist" className="flex flex-wrap gap-1 border-b border-line">
        {items.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={active === t.key}
            onClick={() => setActive(t.key)}
            className={cn(
              "relative px-4 py-2.5 text-sm font-medium transition-colors",
              active === t.key ? "text-accent" : "text-muted hover:text-primary-foreground",
            )}
          >
            {t.label}
            {active === t.key && (
              <motion.span
                layoutId="tabs-underline"
                className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-accent"
                transition={{ duration: 0.3, ease: easePremium }}
              />
            )}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="pt-6">
        {items.find((t) => t.key === active)?.content}
      </div>
    </div>
  );
}
