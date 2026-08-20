"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { GraduationCap, Building2, HeartHandshake, Code2, Briefcase, Award, type LucideIcon } from "lucide-react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

/**
 * KICK TO TECH ecosystem network.
 *
 * The central logo is the CORE. Six satellite nodes connect to it with real,
 * DOM-measured connection lines (recomputed on resize via ResizeObserver), each
 * carrying an animated energy particle. Every node floats with its own timing;
 * hovering a node brightens its connection, dims the rest, and pulses the core.
 * Depth comes from layering/glow/parallax — no giant rotating 3D object.
 */

interface NodeDef {
  id: string;
  label: string;
  Icon: LucideIcon;
  x: number; // center position, % of panel
  y: number;
  color: string;
  float: { x: number; y: number; d: number }; // organic drift + duration
}

const NODES: NodeDef[] = [
  { id: "students", label: "Students", Icon: GraduationCap, x: 50, y: 13, color: "#22e3d6", float: { x: 0, y: -6, d: 5.5 } },
  { id: "colleges", label: "Colleges", Icon: Building2, x: 21, y: 33, color: "#3b82f6", float: { x: -5, y: 4, d: 6.4 } },
  { id: "mentors", label: "Mentors", Icon: HeartHandshake, x: 79, y: 33, color: "#5ff0e6", float: { x: 5, y: 4, d: 6.9 } },
  { id: "skills", label: "Skills", Icon: Code2, x: 21, y: 75, color: "#60a5fa", float: { x: -4, y: 6, d: 6.1 } },
  { id: "companies", label: "Companies", Icon: Briefcase, x: 79, y: 75, color: "#7ff5ec", float: { x: 5, y: 5, d: 7.4 } },
  { id: "careers", label: "Careers", Icon: Award, x: 50, y: 91, color: "#22e3d6", float: { x: 0, y: 6, d: 5.9 } },
];

interface Link {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  d: number;
}

export function EcosystemVisual() {
  const reduced = useReducedMotionSafe();
  const isMobile = useIsMobile();
  const interactive = !reduced && !isMobile;

  const panelRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [links, setLinks] = useState<Link[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [active, setActive] = useState<string | null>(null);

  // Measure real DOM positions → connection endpoints (core edge → node edge).
  const measure = useCallback(() => {
    const panel = panelRef.current;
    const core = coreRef.current;
    if (!panel || !core) return;
    const pr = panel.getBoundingClientRect();
    const cr = core.getBoundingClientRect();
    const cx = cr.left + cr.width / 2 - pr.left;
    const cy = cr.top + cr.height / 2 - pr.top;
    const coreRad = cr.width / 2;

    const next: Link[] = [];
    for (const n of NODES) {
      const el = nodeRefs.current[n.id];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      const nx = r.left + r.width / 2 - pr.left;
      const ny = r.top + r.height / 2 - pr.top;
      const dx = nx - cx;
      const dy = ny - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const ux = dx / dist;
      const uy = dy / dist;
      const nodeRad = Math.min(r.width, r.height) / 2 + 6;
      next.push({
        id: n.id,
        x1: cx + ux * (coreRad + 6),
        y1: cy + uy * (coreRad + 6),
        x2: nx - ux * nodeRad,
        y2: ny - uy * nodeRad,
        color: n.color,
        d: n.float.d,
      });
    }
    setLinks(next);
    setSize({ w: pr.width, h: pr.height });
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(measure);
    const ro = new ResizeObserver(() => measure());
    if (panelRef.current) ro.observe(panelRef.current);
    window.addEventListener("resize", measure);
    // Re-measure after fonts/layout settle.
    const t = setTimeout(measure, 400);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, isMobile]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      {/* outer ambient glow */}
      <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-accent/15 via-transparent to-electric/15 blur-3xl" />

      <div
        ref={panelRef}
        className="glass-strong relative h-full w-full overflow-hidden rounded-[2.5rem]"
      >
        {/* very subtle technical grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:34px_34px]" />
        {/* soft radial lighting */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />

        {/* Connections (measured) */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox={`0 0 ${size.w || 1} ${size.h || 1}`}
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <filter id="eco-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {links.map((l) => {
            const dim = active && active !== l.id;
            const on = active === l.id;
            return (
              <g key={l.id} style={{ opacity: dim ? 0.25 : 1, transition: "opacity .35s" }}>
                {/* glow layer */}
                <line
                  x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                  stroke={l.color}
                  strokeWidth={on ? 3 : 2}
                  strokeLinecap="round"
                  opacity={on ? 0.5 : 0.18}
                  filter="url(#eco-glow)"
                  style={{ transition: "opacity .35s, stroke-width .35s" }}
                />
                {/* base line */}
                <line
                  x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                  stroke={l.color}
                  strokeWidth={1}
                  strokeLinecap="round"
                  opacity={on ? 0.9 : 0.45}
                  style={{ transition: "opacity .35s" }}
                />
                {/* energy particle (center → node) */}
                {!reduced && (
                  <motion.circle
                    r={on ? 3.2 : 2.4}
                    fill="#eafffb"
                    initial={{ cx: l.x1, cy: l.y1, opacity: 0 }}
                    animate={{ cx: [l.x1, l.x2], cy: [l.y1, l.y2], opacity: [0, 1, 1, 0] }}
                    transition={{
                      duration: on ? l.d * 0.5 : l.d,
                      repeat: Infinity,
                      repeatDelay: on ? 0.2 : 0.9,
                      ease: "easeInOut",
                    }}
                    style={{ filter: `drop-shadow(0 0 5px ${l.color})` }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* CORE — stable, layered, alive (no big spin) */}
        <div
          ref={coreRef}
          className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
        >
          <div className="relative flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-3xl border border-accent/40 bg-ink-800/90 shadow-glow-lg sm:h-24 sm:w-24">
            {/* dashed technical ring (slow) */}
            {!reduced && (
              <span className="absolute -inset-2 animate-spin-slow rounded-full border border-dashed border-accent/25" />
            )}
            {/* breathing aura reacts to hover */}
            {!reduced && (
              <motion.span
                className="absolute inset-0 rounded-3xl border border-accent/40"
                animate={active ? { scale: [1, 1.28, 1], opacity: [0.7, 0, 0.7] } : { scale: [1, 1.35], opacity: [0.5, 0] }}
                transition={{ duration: active ? 1.1 : 2.4, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <Image src="/brand/logo.png" alt="Kick To Tech" width={44} height={44} className="h-10 w-10 rounded-xl object-contain sm:h-11 sm:w-11" />
          </div>
          <span className="mt-2.5 rounded-full bg-ink-900/80 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-accent">
            Kick To Tech
          </span>
        </div>

        {/* NODES */}
        {NODES.map((n, i) => {
          const dim = active && active !== n.id;
          const on = active === n.id;
          return (
            <div
              key={n.id}
              className="absolute z-10"
              style={{ left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%, -50%)" }}
            >
              <motion.div
                ref={(el) => { nodeRefs.current[n.id] = el; }}
                onMouseEnter={() => interactive && setActive(n.id)}
                onMouseLeave={() => interactive && setActive(null)}
                animate={reduced ? undefined : { x: [0, n.float.x, 0], y: [0, n.float.y, 0] }}
                transition={{ duration: n.float.d, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                style={{ scale: on ? 1.08 : dim ? 0.96 : 1, opacity: dim ? 0.55 : 1 }}
                className={cn(
                  "flex cursor-default items-center gap-2 rounded-2xl border bg-ink-800/95 py-1.5 pl-1.5 pr-3.5 shadow-card backdrop-blur transition-[opacity,scale,border-color] duration-300",
                  on ? "border-accent/60" : "border-line",
                )}
              >
                <span
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-300"
                  style={{
                    backgroundColor: `${n.color}22`,
                    color: n.color,
                    boxShadow: on ? `0 0 14px ${n.color}` : "none",
                  }}
                >
                  <n.Icon className="h-4 w-4" />
                </span>
                <span className="whitespace-nowrap text-xs font-semibold text-primary-foreground">{n.label}</span>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
