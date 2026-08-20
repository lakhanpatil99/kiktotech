"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { useAsync } from "@/hooks/useAsync";
import { contentService } from "@/services";
import { Container, Section, SectionHeading } from "@/components/ui";
import { Skeleton } from "@/components/ui/Skeleton";
import { AsyncBoundary } from "@/components/feedback/AsyncBoundary";
import { EmptyState } from "@/components/feedback/states";
import { cn } from "@/lib/utils";

/** Editorial, asymmetric moments layout (distinct from the plain gallery grid). */
const layout = [
  "sm:col-span-2 sm:row-span-2", // featured large
  "",
  "",
  "sm:col-span-2", // wide
  "",
  "",
];

export function CommunityMoments() {
  const { data, status, error, reload } = useAsync(() => contentService.getGallery(), []);
  const items = (data ?? []).slice(0, 6);
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(() => setActive((i) => (i === null ? i : (i + 1) % items.length)), [items.length]);
  const prev = useCallback(() => setActive((i) => (i === null ? i : (i - 1 + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, next, prev]);

  return (
    <Section>
      <Container>
        <SectionHeading eyebrow="Moments" title="Moments that bring us together" description="Real workshops, hackathons, and gatherings from the community." />

        <div className="mt-14">
          <AsyncBoundary
            status={status}
            error={error}
            onRetry={reload}
            loading={
              <div className="grid auto-rows-[180px] grid-cols-2 gap-4 sm:grid-cols-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className={cn("rounded-3xl", layout[i])} />
                ))}
              </div>
            }
            empty={<EmptyState title="No photos yet" icon={<ImageIcon className="h-7 w-7" />} />}
          >
            <div className="grid auto-rows-[160px] grid-cols-2 gap-4 sm:auto-rows-[190px] sm:grid-cols-4">
              {items.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className={cn("group relative overflow-hidden rounded-3xl border border-line focus-visible:ring-2 focus-visible:ring-accent", layout[i])}
                  aria-label={`Open ${item.title}`}
                >
                  <Image src={item.imageUrl} alt={item.title} fill sizes="(max-width:640px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/10 to-transparent opacity-70 transition-opacity group-hover:opacity-90" />
                  <span className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="text-xs font-semibold uppercase tracking-widest text-accent">{item.category}</span>
                    <span className="mt-0.5 block text-sm font-bold text-white">{item.title}</span>
                  </span>
                </motion.button>
              ))}
            </div>
          </AsyncBoundary>
        </div>
      </Container>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && items[active] && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/95 p-4 backdrop-blur-xl"
            role="dialog" aria-modal="true" aria-label={items[active].title} onClick={close}
          >
            <button onClick={close} className="absolute right-5 top-5 rounded-full bg-white/10 p-2 hover:bg-white/20" aria-label="Close"><X className="h-6 w-6" /></button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 rounded-full bg-white/10 p-2 hover:bg-white/20" aria-label="Previous"><ChevronLeft className="h-6 w-6" /></button>
            <motion.figure
              key={items[active].id}
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="relative max-h-[85vh] max-w-4xl overflow-hidden rounded-2xl" onClick={(e) => e.stopPropagation()}
            >
              <Image src={items[active].imageUrl} alt={items[active].title} width={items[active].width} height={items[active].height} className="h-auto max-h-[85vh] w-auto object-contain" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900 to-transparent p-5 text-center text-sm font-semibold">{items[active].title}</figcaption>
            </motion.figure>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 rounded-full bg-white/10 p-2 hover:bg-white/20" aria-label="Next"><ChevronRight className="h-6 w-6" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
