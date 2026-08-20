"use client";

import { Eye, Rocket, GraduationCap, Briefcase, ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion";

const values = ["Outcomes over hype", "Build in public", "Community first", "Access for all"];

export function VisionMission() {
  return (
    <Section className="relative overflow-hidden">
      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
            Why we exist
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Closing the gap between <span className="text-gradient">education</span> and{" "}
            <span className="text-gradient">employability</span>
          </h2>
        </Reveal>

        {/* Education -> Employability bridge visual */}
        <Reveal className="mx-auto mt-10 flex max-w-xl items-center justify-center gap-3 text-sm font-semibold sm:gap-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2">
            <GraduationCap className="h-4 w-4 text-accent" /> Education
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-accent/60 to-electric/60" />
          <ArrowRight className="h-4 w-4 text-accent" />
          <span className="h-px flex-1 bg-gradient-to-r from-electric/60 to-accent/60" />
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2">
            <Briefcase className="h-4 w-4 text-accent" /> Employability
          </span>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="group relative h-full overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-accent/[0.12] via-surface to-transparent p-8 sm:p-10">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl transition-transform duration-700 group-hover:scale-125" />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                  <Eye className="h-7 w-7" />
                </div>
                <p className="mt-6 text-xs font-bold uppercase tracking-widest text-accent">Our Vision</p>
                <p className="mt-3 text-2xl font-semibold leading-snug sm:text-[1.7rem]">
                  A vibrant ecosystem where every student in Pune can turn curiosity into a career.
                </p>
                <p className="mt-4 leading-relaxed text-muted">
                  Driving technological advancement through collaboration, creativity, and continuous
                  learning — so talent is never limited by access.
                </p>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <article className="group relative h-full overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-electric/[0.12] via-surface to-transparent p-8 sm:p-10">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-electric/10 blur-3xl transition-transform duration-700 group-hover:scale-125" />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-electric/15 text-electric">
                  <Rocket className="h-7 w-7" />
                </div>
                <p className="mt-6 text-xs font-bold uppercase tracking-widest text-electric">Our Mission</p>
                <p className="mt-3 text-2xl font-semibold leading-snug sm:text-[1.7rem]">
                  Empower students through hands-on work, mentorship, and real opportunity.
                </p>
                <p className="mt-4 leading-relaxed text-muted">
                  Workshops, collaborative hackathons, and industry mentorship that build the skills
                  and networks shaping the future of technology.
                </p>
              </div>
            </article>
          </Reveal>
        </div>

        {/* Values strip */}
        <StaggerGroup className="mt-8 flex flex-wrap justify-center gap-3">
          {values.map((v) => (
            <StaggerItem key={v}>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-accent to-electric" /> {v}
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
