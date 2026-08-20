"use client";

import Image from "next/image";
import type { TeamMember } from "@/types";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";

/**
 * Team card built around the REAL portrait. Interaction is intentionally
 * restrained: a small lift, a brighter border, and a subtle image lift on
 * hover — no scaling, sweeps, or continuous animation.
 */
export function TeamCard({
  member,
  onOpen,
  prominent = false,
}: {
  member: TeamMember;
  onOpen: (m: TeamMember) => void;
  prominent?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(member)}
      className="group relative block h-full w-full overflow-hidden rounded-[22px] border border-line bg-surface text-left shadow-[0_10px_30px_rgba(0,0,0,0.16)] transition-[transform,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-accent/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      aria-label={`View ${member.name}'s profile`}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="(max-width: 380px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            loading="lazy"
            className="object-cover brightness-[0.92] transition-[filter] duration-200 group-hover:brightness-100"
            style={{ objectPosition: member.objectPosition ?? "center top" }}
          />
        ) : (
          <Avatar name={member.name} size={9999} rounded="2xl" className="!h-full !w-full !rounded-none" />
        )}

        {/* readable gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/25 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className={cn("font-bold leading-tight text-white", prominent ? "text-lg sm:text-xl" : "text-[15px] sm:text-base")}>
            {member.name}
          </h3>
          <p className={cn("mt-0.5 font-medium text-accent", prominent ? "text-sm" : "text-xs sm:text-[13px]")}>
            {member.role}
          </p>
        </div>
      </div>
    </button>
  );
}
