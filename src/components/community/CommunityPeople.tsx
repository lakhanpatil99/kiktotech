"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAsync } from "@/hooks/useAsync";
import { contentService } from "@/services";
import { Container, Section, SectionHeading } from "@/components/ui";
import { Skeleton } from "@/components/ui/Skeleton";
import { AsyncBoundary } from "@/components/feedback/AsyncBoundary";
import { EmptyState } from "@/components/feedback/states";
import { Button } from "@/components/ui/Button";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/types";

// Curated organic constellation layout (star + ring) using real member ids.
const LAYOUT: { id: string; x: number; y: number; size: number }[] = [
  { id: "mayur-patil", x: 50, y: 50, size: 104 },
  { id: "kalpak-narkhede", x: 50, y: 13, size: 62 },
  { id: "kanchan-patil", x: 79, y: 27, size: 70 },
  { id: "tauheed", x: 86, y: 63, size: 66 },
  { id: "pooja-kolekar", x: 66, y: 84, size: 64 },
  { id: "luv-parab", x: 33, y: 84, size: 62 },
  { id: "omkar-pawar", x: 13, y: 62, size: 66 },
  { id: "kaustubh-pawar", x: 21, y: 27, size: 72 },
];

const LINKS: [string, string][] = [
  // star from the centre
  ["mayur-patil", "kalpak-narkhede"],
  ["mayur-patil", "kanchan-patil"],
  ["mayur-patil", "tauheed"],
  ["mayur-patil", "pooja-kolekar"],
  ["mayur-patil", "luv-parab"],
  ["mayur-patil", "omkar-pawar"],
  ["mayur-patil", "kaustubh-pawar"],
  // outer ring
  ["kaustubh-pawar", "kalpak-narkhede"],
  ["kalpak-narkhede", "kanchan-patil"],
  ["kanchan-patil", "tauheed"],
  ["tauheed", "pooja-kolekar"],
  ["pooja-kolekar", "luv-parab"],
  ["luv-parab", "omkar-pawar"],
  ["omkar-pawar", "kaustubh-pawar"],
];

interface Line {
  id: string;
  a: string;
  b: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

function Constellation({ byId }: { byId: Map<string, TeamMember> }) {
  const reduced = useReducedMotionSafe();
  const panelRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [lines, setLines] = useState<Line[]>([]);
  const [size, setSize] = useState({ w: 1, h: 1 });
  const [active, setActive] = useState<string | null>(null);

  const nodes = useMemo(() => LAYOUT.filter((n) => byId.has(n.id)), [byId]);
  const links = useMemo(() => {
    const set = new Set(nodes.map((n) => n.id));
    return LINKS.filter(([a, b]) => set.has(a) && set.has(b));
  }, [nodes]);

  const neighbours = useMemo(() => {
    const map: Record<string, Set<string>> = {};
    for (const [a, b] of links) {
      (map[a] ??= new Set()).add(b);
      (map[b] ??= new Set()).add(a);
    }
    return map;
  }, [links]);

  const measure = useCallback(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const pr = panel.getBoundingClientRect();
    const c: Record<string, { x: number; y: number; r: number }> = {};
    for (const n of nodes) {
      const el = nodeRefs.current[n.id];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      c[n.id] = { x: r.left + r.width / 2 - pr.left, y: r.top + r.height / 2 - pr.top, r: Math.min(r.width, r.height) / 2 };
    }
    const next: Line[] = [];
    for (const [a, b] of links) {
      const p = c[a];
      const q = c[b];
      if (!p || !q) continue;
      const dx = q.x - p.x;
      const dy = q.y - p.y;
      const dist = Math.hypot(dx, dy) || 1;
      const ux = dx / dist;
      const uy = dy / dist;
      next.push({
        id: `${a}-${b}`,
        a,
        b,
        x1: p.x + ux * (p.r + 2),
        y1: p.y + uy * (p.r + 2),
        x2: q.x - ux * (q.r + 2),
        y2: q.y - uy * (q.r + 2),
      });
    }
    setLines(next);
    setSize({ w: pr.width, h: pr.height });
  }, [nodes, links]);

  useEffect(() => {
    const raf = requestAnimationFrame(measure);
    const ro = new ResizeObserver(() => measure());
    if (panelRef.current) ro.observe(panelRef.current);
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 400);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return (
    <div
      ref={panelRef}
      className="relative mx-auto aspect-square w-full max-w-[620px]"
      onMouseLeave={() => setActive(null)}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox={`0 0 ${size.w} ${size.h}`}
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <filter id="people-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {lines.map((l, i) => {
          const on = active === l.a || active === l.b;
          const dim = active !== null && !on;
          return (
            <g key={l.id} style={{ opacity: dim ? 0.1 : 1, transition: "opacity .35s" }}>
              {/* soft glow underlay */}
              <line
                x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                stroke="#22e3d6"
                strokeWidth={on ? 2 : 1.2}
                strokeLinecap="round"
                opacity={on ? 0.4 : 0.1}
                filter="url(#people-glow)"
                style={{ transition: "opacity .35s, stroke-width .35s" }}
              />
              {/* base line */}
              <line
                x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                stroke="#22e3d6"
                strokeWidth={on ? 1.3 : 0.7}
                strokeLinecap="round"
                opacity={on ? 0.95 : 0.3}
                style={{ transition: "opacity .35s, stroke-width .35s" }}
              />
              {/* continuous idle pulse — always alive, staggered */}
              {!reduced && (
                <motion.circle
                  r={on ? 2.4 : 1.5}
                  fill={on ? "#eafffb" : "#7ff5ec"}
                  initial={{ cx: l.x1, cy: l.y1, opacity: 0 }}
                  animate={{ cx: [l.x1, l.x2], cy: [l.y1, l.y2], opacity: [0, on ? 1 : 0.7, 0] }}
                  transition={{
                    duration: on ? 1.4 : 3.2,
                    delay: (i % 5) * 0.55,
                    repeat: Infinity,
                    repeatDelay: on ? 0.15 : 1.3,
                    ease: "easeInOut",
                  }}
                  style={{ filter: `drop-shadow(0 0 4px ${on ? "#22e3d6" : "#5ff0e6"})` }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {nodes.map((n, i) => {
        const m = byId.get(n.id)!;
        const on = active === n.id;
        const dim = active !== null && !on && !neighbours[active]?.has(n.id);
        return (
          <div
            key={n.id}
            className="absolute z-10"
            style={{ left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%, -50%)" }}
          >
            <motion.div
              ref={(el) => {
                nodeRefs.current[n.id] = el;
              }}
              onMouseEnter={() => setActive(n.id)}
              onFocus={() => setActive(n.id)}
              onBlur={() => setActive(null)}
              tabIndex={0}
              role="button"
              aria-label={`${m.name} — ${m.role}`}
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              animate={{ opacity: dim ? 0.4 : 1, scale: on ? 1.12 : dim ? 0.94 : 1 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col items-center outline-none"
            >
              <span className="relative flex items-center justify-center" style={{ width: n.size, height: n.size }}>
                {/* idle soft aura — always breathing, never moves the centre */}
                {!reduced && (
                  <motion.span
                    className="absolute -inset-1.5 rounded-full bg-accent/20 blur-md"
                    animate={{ opacity: [0.25, 0.55, 0.25], scale: [1, 1.06, 1] }}
                    transition={{ duration: 3.4 + (i % 4) * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  />
                )}
                {!reduced && on && (
                  <motion.span
                    className="absolute inset-0 rounded-full border border-accent"
                    animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                    transition={{ duration: 1.3, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <span
                  className={cn(
                    "block h-full w-full overflow-hidden rounded-full border-2 shadow-card transition-colors duration-300",
                    on ? "border-accent" : "border-white/12",
                  )}
                >
                  <Image
                    src={m.photo ?? "/brand/logo.png"}
                    alt={m.name}
                    width={n.size}
                    height={n.size}
                    className="h-full w-full object-cover"
                    style={{ objectPosition: m.objectPosition }}
                  />
                </span>
                <span className="absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full border-2 border-ink-900 bg-emerald-400" />
              </span>

              {/* hover card */}
              <motion.span
                initial={false}
                animate={{ opacity: on ? 1 : 0, y: on ? 0 : 6 }}
                className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-max -translate-x-1/2 rounded-xl border border-line bg-ink-800/95 px-3 py-1.5 text-center shadow-lift backdrop-blur"
              >
                <span className="block text-xs font-bold text-primary-foreground">{m.name}</span>
                <span className="block text-[11px] text-accent">{m.role}</span>
              </motion.span>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

function PeopleGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
      {members.map((m) => (
        <div key={m.id} className="group text-center">
          <span className="relative mx-auto block aspect-square w-full max-w-[110px] overflow-hidden rounded-full border-2 border-white/12 shadow-card transition-colors group-hover:border-accent">
            <Image src={m.photo ?? "/brand/logo.png"} alt={m.name} fill sizes="110px" className="object-cover" style={{ objectPosition: m.objectPosition }} />
          </span>
          <p className="mt-2.5 truncate text-sm font-bold">{m.name}</p>
          <p className="truncate text-xs text-muted">{m.role}</p>
        </div>
      ))}
    </div>
  );
}

export function CommunityPeople() {
  const { data, status, error, reload } = useAsync(() => contentService.getTeam(), []);
  const isMobile = useIsMobile();

  const byId = useMemo(() => new Map((data ?? []).map((m) => [m.id, m] as const)), [data]);
  const gridMembers = useMemo(
    () => LAYOUT.map((n) => byId.get(n.id)).filter((m): m is TeamMember => Boolean(m)),
    [byId],
  );

  return (
    <Section className="border-y border-line bg-ink-800/30">
      <Container>
        <SectionHeading
          eyebrow="People"
          title="The people behind the community"
          description="Real students and mentors, connected by a shared mission — hover to trace the relationships."
        />

        <div className="mt-10 sm:mt-14">
          <AsyncBoundary
            status={status}
            error={error}
            onRetry={reload}
            loading={<Skeleton className="mx-auto aspect-square w-full max-w-[560px] rounded-3xl" />}
            empty={<EmptyState title="Team coming soon" />}
          >
            {data && (isMobile ? <PeopleGrid members={gridMembers} /> : <Constellation byId={byId} />)}
          </AsyncBoundary>

          <div className="mt-10 text-center">
            <Button href="/team" variant="outline">Meet the full team</Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
