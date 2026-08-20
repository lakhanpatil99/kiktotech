import type { Metadata } from "next";
import { CommunityHero } from "@/components/community/CommunityHero";
import { CommunitySnapshot } from "@/components/community/CommunitySnapshot";
import { CommunityRoles } from "@/components/community/CommunityRoles";
import { ActivityFeed } from "@/components/community/ActivityFeed";
import { CommunityPeople } from "@/components/community/CommunityPeople";
import { CommunityStories } from "@/components/community/CommunityStories";
import { CommunityMoments } from "@/components/community/CommunityMoments";
import { CommunityFlow } from "@/components/community/CommunityFlow";
import { CommunityCTA } from "@/components/community/CommunityCTA";

export const metadata: Metadata = {
  title: "Community",
  description:
    "The Kick To Tech community — a living network of students, mentors, colleges, and partners learning, collaborating, and growing together.",
};

/**
 * Community page — "Kick To Tech, the living network".
 * A people-first, network-driven experience intentionally distinct from Home:
 * a multi-layer community network, real member constellation, activity
 * timeline, real stories, and an interactive pathway.
 *
 * Animation hierarchy (top → bottom): hero network → metrics → belonging →
 * activity timeline → people constellation → stories → moments → pathway → CTA.
 */
export default function CommunityPage() {
  return (
    <>
      <CommunityHero />
      <div className="py-10 sm:py-12">
        <CommunitySnapshot />
      </div>
      <CommunityRoles />
      <ActivityFeed />
      <CommunityPeople />
      <CommunityStories />
      <CommunityMoments />
      <CommunityFlow />
      <CommunityCTA />
    </>
  );
}
