"use client";

import { useState } from "react";
import type { TeamMember } from "@/types";
import { TeamCard } from "./TeamCard";
import { TeamProfile } from "./TeamProfile";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";

/**
 * Team grid + profile drawer. Uses flex-wrap so an incomplete final row
 * centers instead of hugging the left edge. Data comes in via props.
 */
export function TeamGrid({
  members,
  tone = "core",
}: {
  members: TeamMember[];
  tone?: "lead" | "core";
}) {
  const [active, setActive] = useState<TeamMember | null>(null);

  // Responsive widths (gap = 20px). Leadership uses fixed premium-sized cards.
  const itemWidth =
    tone === "lead"
      ? "w-full min-[420px]:w-[clamp(280px,42%,340px)]"
      : "w-[calc(50%-10px)] min-[380px]:w-[calc(50%-10px)] md:w-[calc(33.333%-14px)] xl:w-[calc(25%-16px)]";

  return (
    <>
      <StaggerGroup
        className={cn(
          "flex flex-wrap gap-5",
          tone === "lead" ? "justify-start" : "justify-center",
        )}
      >
        {members.map((m) => (
          <StaggerItem key={m.id} className={itemWidth}>
            <TeamCard member={m} onOpen={setActive} prominent={tone === "lead"} />
          </StaggerItem>
        ))}
      </StaggerGroup>
      <TeamProfile member={active} onClose={() => setActive(null)} />
    </>
  );
}
