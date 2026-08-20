"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Handshake, ArrowRight } from "lucide-react";
import { useAsync } from "@/hooks/useAsync";
import { contentService } from "@/services";
import { Container, Section, SectionHeading } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { AsyncBoundary } from "@/components/feedback/AsyncBoundary";
import { EmptyState } from "@/components/feedback/states";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import type { Partner } from "@/types";

const categoryLabel: Record<Partner["category"], string> = {
  community: "Community",
  academic: "Academic",
  industry: "Industry",
};

/** Clean white logo plate — normalizes all logo shapes/ratios consistently. */
function LogoPlate({ partner }: { partner: Partner }) {
  const plate = (
    <div className="group relative flex h-[104px] w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-line bg-surface p-3 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow">
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="flex h-12 w-full items-center justify-center rounded-xl bg-white px-4 shadow-sm ring-1 ring-black/5">
        <span className="relative h-8 w-full">
          <Image src={partner.logoUrl!} alt={partner.name} fill sizes="180px" unoptimized className="object-contain transition-transform duration-300 group-hover:scale-105" />
        </span>
      </span>
      <span className="text-[11px] font-semibold text-primary-foreground/80">{partner.name}</span>
    </div>
  );
  return partner.url ? (
    <a href={partner.url} target="_blank" rel="noopener noreferrer" aria-label={partner.name} className="block">
      {plate}
    </a>
  ) : (
    plate
  );
}

export function PartnersMarquee() {
  const { data, status, error, reload } = useAsync(() => contentService.getPartners(), []);
  const reduced = useReducedMotionSafe();
  const partners = data ?? [];

  return (
    <Section className="relative overflow-hidden">
      {!reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[130px]"
          style={{ background: "conic-gradient(from 0deg, rgba(34,227,214,0.35), transparent 35%, rgba(59,130,246,0.35), transparent 75%)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        />
      )}

      <Container className="relative">
        <SectionHeading
          eyebrow="Trusted By"
          title="Backed by a growing network"
          description="Communities, colleges, and industry partners collaborating to create real opportunities for students."
        />

        <div className="mt-14">
          <AsyncBoundary
            status={status}
            error={error}
            onRetry={reload}
            loading={
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
                {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-[104px] rounded-2xl" />)}
              </div>
            }
            empty={<EmptyState title="Partners coming soon" icon={<Handshake className="h-7 w-7" />} />}
          >
            {reduced ? (
              // Static, accessible grid under reduced-motion
              <StaggerGroup className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
                {partners.map((p) => (
                  <StaggerItem key={p.id}>
                    <LogoPlate partner={p} />
                  </StaggerItem>
                ))}
              </StaggerGroup>
            ) : (
              // Seamless auto-scrolling logo rail (pause on hover, edge fade)
              <div className="marquee-mask group/rail overflow-hidden py-1">
                <div className="flex w-max gap-5 animate-marquee group-hover/rail:[animation-play-state:paused]">
                  {[...partners, ...partners].map((p, i) => (
                    <div key={`${p.id}-${i}`} className="w-44 flex-shrink-0 sm:w-48">
                      <LogoPlate partner={p} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* category legend */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted">
              {(["community", "academic", "industry"] as const).map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {categoryLabel[c]}
                </span>
              ))}
            </div>
          </AsyncBoundary>

          {/* Premium collaborate CTA */}
          <div className="relative mx-auto mt-14 max-w-5xl overflow-hidden rounded-[1.75rem] p-[1px]">
            <div className="absolute inset-0 opacity-80" style={{ background: "linear-gradient(120deg, rgba(34,227,214,0.6), rgba(59,130,246,0.35) 45%, transparent 70%)" }} aria-hidden />
            <div className="relative flex flex-col items-center gap-6 rounded-[1.7rem] bg-ink-800/90 px-8 py-9 text-center backdrop-blur-xl sm:flex-row sm:justify-between sm:text-left">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" aria-hidden />
              <div className="relative">
                <h3 className="text-xl font-bold sm:text-2xl">Want to collaborate with Kick To Tech?</h3>
                <p className="mt-2 max-w-md text-sm text-muted">
                  Companies, colleges, and communities — partner with us to build the next generation of talent.
                </p>
              </div>
              <Button href="/collaborate" size="lg" className="relative flex-shrink-0">
                Become a partner <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
