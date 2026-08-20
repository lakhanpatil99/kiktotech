"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

// A subtle background network — nodes + connecting lines with travelling pulses.
const NODES = [
  { x: 10, y: 26 }, { x: 28, y: 62 }, { x: 44, y: 20 }, { x: 58, y: 74 },
  { x: 72, y: 30 }, { x: 88, y: 66 }, { x: 50, y: 46 }, { x: 20, y: 84 },
];
const EDGES: [number, number][] = [
  [0, 2], [2, 6], [6, 4], [4, 5], [6, 3], [3, 1], [1, 7], [1, 6], [4, 3],
];

export function CommunityCTA() {
  const reduced = useReducedMotionSafe();
  return (
    <Section>
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-accent/20 bg-gradient-to-br from-accent/12 via-electric/8 to-transparent px-6 py-20 text-center sm:px-12">
            {/* radial glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]" aria-hidden />

            {/* living network background */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              {EDGES.map(([a, b], i) => (
                <g key={i}>
                  <line
                    x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y}
                    stroke="#22e3d6" strokeWidth={0.15} opacity={0.4}
                  />
                  {!reduced && (
                    <motion.circle
                      r={0.5} fill="#7ff5ec"
                      initial={{ opacity: 0 }}
                      animate={{
                        cx: [NODES[a].x, NODES[b].x],
                        cy: [NODES[a].y, NODES[b].y],
                        opacity: [0, 1, 0],
                      }}
                      transition={{ duration: 3.5, delay: i * 0.5, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
                    />
                  )}
                </g>
              ))}
              {NODES.map((n, i) => (
                <motion.circle
                  key={i}
                  cx={n.x} cy={n.y} r={0.7} fill="#22e3d6"
                  animate={reduced ? undefined : { opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 3 + (i % 4), repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
            </svg>

            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-balance text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
                Your next connection could <span className="text-gradient">change everything.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-muted">
                Join students, mentors, builders, and industry professionals creating opportunities together.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                <Button href="/join" size="lg">Join the Community <ArrowRight className="h-4 w-4" /></Button>
                <Button href="/events" variant="outline" size="lg">Explore Events</Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
