import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PartnersView } from "@/components/views/PartnersView";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Partners",
  description: "The organizations, colleges, and communities collaborating with Kick To Tech.",
};

export default function PartnersPage() {
  return (
    <>
      <PageHeader eyebrow="Collaborations" title="Our partners" description="We work with communities, colleges, and industry to create real opportunities for students." />
      <PartnersView />
      <FinalCTA />
    </>
  );
}
