import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { OriginStory } from "@/components/about/OriginStory";
import { BeliefSystem } from "@/components/about/BeliefSystem";
import { StudentJourney } from "@/components/about/StudentJourney";
import { WhatMakesUsDifferent } from "@/components/about/WhatMakesUsDifferent";
import { EcosystemModel } from "@/components/about/EcosystemModel";
import { AboutTimeline } from "@/components/about/AboutTimeline";
import { ImpactPhilosophy } from "@/components/about/ImpactPhilosophy";
import { FutureVision } from "@/components/about/FutureVision";
import { FounderLetter } from "@/components/about/FounderLetter";
import { AboutCTA } from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Why Kick To Tech exists and how it's being built — the story, philosophy, and future direction behind Pune's student tech community.",
};

/**
 * About Us — the story, philosophy, and future of Kick To Tech.
 * Home = what we do. Community = who is connected. About = WHY we exist and
 * HOW it became what it is. Intentionally distinct: editorial storytelling,
 * pathways, and timelines instead of the shared card grids / node network.
 */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OriginStory />
      <BeliefSystem />
      <StudentJourney />
      <WhatMakesUsDifferent />
      <EcosystemModel />
      <AboutTimeline />
      <ImpactPhilosophy />
      <FutureVision />
      <FounderLetter />
      <AboutCTA />
    </>
  );
}
