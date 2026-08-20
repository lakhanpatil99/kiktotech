/** 3D / rendering quality tiers and their budgets. */
export type QualityTier = "high" | "medium" | "low";

export interface QualitySettings {
  tier: QualityTier;
  particleCount: number;
  dpr: [number, number];
  shadows: boolean;
  antialias: boolean;
  /** When false, render a lightweight non-WebGL fallback visual. */
  enable3D: boolean;
}

export const QUALITY_PRESETS: Record<QualityTier, QualitySettings> = {
  high: { tier: "high", particleCount: 2600, dpr: [1, 2], shadows: true, antialias: true, enable3D: true },
  medium: { tier: "medium", particleCount: 1300, dpr: [1, 1.5], shadows: false, antialias: true, enable3D: true },
  low: { tier: "low", particleCount: 500, dpr: [1, 1], shadows: false, antialias: false, enable3D: false },
};
