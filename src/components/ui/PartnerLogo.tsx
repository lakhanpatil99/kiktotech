import Image from "next/image";
import type { Partner } from "@/types";
import { cn } from "@/lib/utils";
import { gradientFor, monogram } from "@/lib/media";

/**
 * Renders a real partner logo when a logo URL is known; otherwise a clean,
 * high-contrast wordmark tile with a monogram badge (no invented logos).
 *
 * Real logos sit on a soft light plate so marks designed for light backgrounds
 * (e.g. the JSPM crest) stay legible on the dark UI.
 */
export function PartnerLogo({ partner, className }: { partner: Partner; className?: string }) {
  return (
    <div
      className={cn(
        "flex h-28 w-full items-center justify-center rounded-2xl border border-line bg-surface p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow",
        className,
      )}
    >
      {partner.logoUrl ? (
        <span className="flex h-full w-full items-center justify-center rounded-xl bg-white/95 px-5 py-3">
          <span className="relative h-full w-full">
            <Image src={partner.logoUrl} alt={partner.name} fill sizes="220px" unoptimized className="object-contain" />
          </span>
        </span>
      ) : (
        <span className="flex items-center gap-3">
          <span
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
            style={{ backgroundImage: gradientFor(partner.name) }}
          >
            {monogram(partner.name)}
          </span>
          <span className="text-left text-base font-bold leading-tight tracking-tight text-white">
            {partner.name}
          </span>
        </span>
      )}
    </div>
  );
}
