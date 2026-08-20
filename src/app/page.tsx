import { Hero } from "@/components/sections/Hero";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { InternshipHighlight } from "@/components/sections/InternshipHighlight";
import { Activities } from "@/components/sections/Activities";
import { VisionMission } from "@/components/sections/VisionMission";
import { EventsPreview } from "@/components/sections/EventsPreview";
import { PartnersMarquee } from "@/components/sections/PartnersMarquee";
import { Founder } from "@/components/sections/Founder";
import { TeamSection } from "@/components/sections/TeamSection";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <InternshipHighlight />
      <Activities />
      <VisionMission />
      <EventsPreview />
      <PartnersMarquee />
      <Founder />
      <TeamSection />
      <FinalCTA />
    </>
  );
}
