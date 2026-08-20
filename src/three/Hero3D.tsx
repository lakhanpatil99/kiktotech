"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useQualityTier } from "@/hooks/useQualityTier";
import { SceneFallback, SceneLoader } from "./SceneLoader";

// The WebGL Canvas is code-split and never server-rendered, so it can't block
// the initial page render.
const NetworkScene = dynamic(() => import("./NetworkScene"), {
  ssr: false,
  loading: () => <SceneLoader />,
});

/**
 * Capability-aware 3D entrypoint. On low-end devices / reduced-motion it
 * renders a lightweight ambient fallback instead of WebGL.
 */
export function Hero3D() {
  const quality = useQualityTier();

  if (!quality.enable3D) return <SceneFallback />;

  return (
    <Suspense fallback={<SceneLoader />}>
      <NetworkScene quality={quality} />
    </Suspense>
  );
}
