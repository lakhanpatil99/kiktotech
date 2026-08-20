/**
 * Deterministic generative visuals.
 *
 * We have no real photos of people/events in the project assets, so instead of
 * reusing one image everywhere (or inventing faces), we derive a UNIQUE, stable
 * visual per entity from its name/id. Same input → same visual, always distinct
 * across different inputs. A real image can override any of this later.
 */

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

/** Two harmonious hues derived from the seed. */
export function hues(seed: string): { from: number; to: number } {
  const h = hash(seed);
  const from = h % 360;
  const to = (from + 40 + (h % 60)) % 360;
  return { from, to };
}

/** A CSS linear-gradient string, tuned to the brand's teal/blue family. */
export function gradientFor(seed: string, angle = 135): string {
  const { from, to } = hues(seed);
  return `linear-gradient(${angle}deg, hsl(${from} 70% 22%), hsl(${to} 75% 32%))`;
}

/** Up to two initials from a name. */
export function monogram(name: string): string {
  const parts = name.trim().split(/\s+/);
  const letters = parts.length === 1 ? parts[0].slice(0, 2) : parts[0][0] + parts[parts.length - 1][0];
  return letters.toUpperCase();
}

/** A small deterministic dot-grid pattern seed (0..1 positions) for cover art. */
export function dots(seed: string, count = 14): { x: number; y: number; r: number }[] {
  let h = hash(seed) || 1;
  const rng = () => {
    h = (h * 1103515245 + 12345) & 0x7fffffff;
    return h / 0x7fffffff;
  };
  return Array.from({ length: count }, () => ({
    x: rng(),
    y: rng(),
    r: 1 + rng() * 3,
  }));
}
