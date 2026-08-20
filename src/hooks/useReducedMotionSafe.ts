"use client";

import { useReducedMotion } from "framer-motion";

/** Thin wrapper so components have one import for reduced-motion intent. */
export function useReducedMotionSafe(): boolean {
  return useReducedMotion() ?? false;
}
