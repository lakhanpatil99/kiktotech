import Image from "next/image";
import { gradientFor, monogram } from "@/lib/media";
import { cn } from "@/lib/utils";

/**
 * Avatar with a UNIQUE deterministic gradient + monogram per person.
 * If a real `src` is provided later, it renders the photo instead — so wiring
 * real portraits is a one-field change with zero layout impact.
 *
 * For "fill the container" usage, pass a large size and override with
 * `!h-full !w-full !rounded-none`; the monogram font is capped so it stays
 * tasteful regardless of container size.
 */
export function Avatar({
  name,
  src,
  size = 80,
  className,
  rounded = "2xl",
}: {
  name: string;
  src?: string;
  size?: number;
  className?: string;
  rounded?: "full" | "2xl" | "3xl";
}) {
  const radius = rounded === "full" ? "rounded-full" : rounded === "3xl" ? "rounded-3xl" : "rounded-2xl";

  if (src) {
    return (
      <span className={cn("relative block overflow-hidden", radius, className)} style={{ width: size, height: size }}>
        <Image src={src} alt={name} fill sizes={`${size}px`} className="object-cover" />
      </span>
    );
  }

  return (
    <span
      aria-label={name}
      role="img"
      className={cn("flex flex-shrink-0 items-center justify-center font-bold tracking-tight text-white/90", radius, className)}
      style={{
        width: size,
        height: size,
        backgroundImage: gradientFor(name),
        fontSize: Math.min(size * 0.36, 88),
      }}
    >
      {monogram(name)}
    </span>
  );
}
