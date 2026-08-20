"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  once?: boolean;
  as?: "div" | "section" | "li" | "article" | "span";
}

/** Scroll-triggered reveal. Reduced-motion is handled globally by framer + CSS. */
export function Reveal({
  children,
  variants = fadeUp,
  className,
  delay = 0,
  once = true,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
