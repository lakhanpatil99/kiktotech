import Image from "next/image";
import { dots, gradientFor, hues } from "@/lib/media";
import { cn } from "@/lib/utils";

/**
 * Cover visual for a card/media slot.
 * - If a real `src` exists → render the photo (object-cover, fill).
 * - Otherwise → render a UNIQUE deterministic constellation/gradient derived
 *   from `seed` (distinct per item, never a duplicated placeholder photo).
 *
 * Fills its positioned parent by default. Pass `aspect` (a Tailwind class like
 * "aspect-[16/10]" or "h-full") when the component must establish its own box.
 */
export function GenerativeCover({
  src,
  seed,
  label,
  alt,
  aspect,
  className,
  sizes = "(max-width: 768px) 100vw, 33vw",
}: {
  src?: string;
  seed: string;
  label?: string;
  alt?: string;
  aspect?: string;
  className?: string;
  sizes?: string;
}) {
  const description = alt ?? label ?? seed;
  const root = cn("relative block h-full w-full overflow-hidden", aspect, className);

  if (src) {
    return (
      <span className={root}>
        <Image src={src} alt={description} fill sizes={sizes} className="object-cover" />
      </span>
    );
  }

  const { from } = hues(seed);
  const pts = dots(seed, 16);

  return (
    <span className={root} style={{ backgroundImage: gradientFor(seed) }} aria-label={description} role="img">
      <svg className="absolute inset-0 h-full w-full opacity-70" viewBox="0 0 100 60" preserveAspectRatio="xMidYMid slice" aria-hidden>
        {pts.map((p, i) => {
          const next = pts[(i + 1) % pts.length];
          return (
            <g key={i}>
              <line x1={p.x * 100} y1={p.y * 60} x2={next.x * 100} y2={next.y * 60} stroke={`hsl(${from} 90% 70% / 0.25)`} strokeWidth="0.3" />
              <circle cx={p.x * 100} cy={p.y * 60} r={p.r * 0.5} fill={`hsl(${from} 95% 75%)`} />
            </g>
          );
        })}
      </svg>
      {label && (
        <span className="absolute bottom-3 left-3 rounded-full bg-black/30 px-2.5 py-1 text-xs font-semibold text-white/90 backdrop-blur">
          {label}
        </span>
      )}
    </span>
  );
}
