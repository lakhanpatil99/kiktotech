"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import { Container } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/motion";
import { CommunityNetwork } from "./CommunityNetwork";
import { easePremium } from "@/lib/motion";

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: easePremium } }),
};

export function CommunityHero() {
  return (
    <section className="relative overflow-hidden pt-14 lg:pt-20">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-electric/10 blur-[150px]" />

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-6">
          {/* Copy */}
          <div>
            <motion.span custom={0} variants={fade} initial="hidden" animate="show"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent">
              <Users className="h-3.5 w-3.5" /> The Community
            </motion.span>

            <motion.h1 custom={1} variants={fade} initial="hidden" animate="show"
              className="mt-6 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Stronger <span className="text-gradient">together.</span>
            </motion.h1>

            <motion.p custom={2} variants={fade} initial="hidden" animate="show"
              className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Kick To Tech is more than events — it&apos;s a living network where students
              learn, collaborate, build, and grow together with mentors and industry.
            </motion.p>

            <motion.div custom={3} variants={fade} initial="hidden" animate="show"
              className="mt-9 flex flex-col gap-3 sm:flex-row">
              <MagneticButton>
                <Button href="/join" size="lg">Join the Community <ArrowRight className="h-4 w-4" /></Button>
              </MagneticButton>
              <Button href="/events" variant="outline" size="lg">Explore What&apos;s Happening</Button>
            </motion.div>
          </div>

          {/* Living community network */}
          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: easePremium }}>
            <CommunityNetwork />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
