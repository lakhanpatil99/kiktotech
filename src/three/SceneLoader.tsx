"use client";

/** Lightweight loader shown while a 3D scene's chunk/GPU warms up. */
export function SceneLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/10 border-t-accent" />
    </div>
  );
}

/** Non-WebGL ambient fallback for low-end devices / reduced motion. */
export function SceneFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]" />
      <div className="absolute right-10 top-16 h-40 w-40 rounded-full bg-electric/20 blur-[80px]" />
      <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:26px_26px] opacity-40" />
    </div>
  );
}
