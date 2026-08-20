"use client";

import { useEffect, useState } from "react";
import { QUALITY_PRESETS, type QualitySettings } from "@/config/quality";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

/**
 * Detects an appropriate 3D quality tier from device capability:
 * device memory, CPU cores, screen size, and reduced-motion preference.
 * Falls back to the lightweight (non-WebGL) tier on weak devices.
 */
export function useQualityTier(): QualitySettings {
  const reduced = useReducedMotionSafe();
  const [settings, setSettings] = useState<QualitySettings>(QUALITY_PRESETS.medium);

  useEffect(() => {
    if (reduced) {
      setSettings(QUALITY_PRESETS.low);
      return;
    }

    const nav = navigator as Navigator & { deviceMemory?: number };
    const memory = nav.deviceMemory ?? 4;
    const cores = navigator.hardwareConcurrency ?? 4;
    const isSmall = window.matchMedia("(max-width: 767px)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let tier: keyof typeof QUALITY_PRESETS = "high";
    if (memory <= 4 || cores <= 4 || (isSmall && coarse)) tier = "medium";
    if (memory <= 2 || cores <= 2) tier = "low";

    setSettings(QUALITY_PRESETS[tier]);
  }, [reduced]);

  return settings;
}
