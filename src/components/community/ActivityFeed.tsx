"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CalendarClock, ArrowRight } from "lucide-react";
import { useAsync } from "@/hooks/useAsync";
import { eventService } from "@/services";
import { Container, Section, SectionHeading, Badge } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { AsyncBoundary } from "@/components/feedback/AsyncBoundary";
import { EmptyState } from "@/components/feedback/states";
import { formatDate } from "@/lib/utils";
import { easePremium } from "@/lib/motion";

const typeTone: Record<string, "accent" | "success" | "neutral" | "warning"> = {
  workshop: "accent",
  hackathon: "warning",
  meetup: "success",
  talk: "neutral",
  bootcamp: "accent",
};

function Timeline({
  events,
}: {
  events: { id: string; title: string; category: string; date: string; organizer: string; imageUrl?: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative mx-auto max-w-3xl">
      {/* rail track */}
      <div className="absolute left-[22px] top-2 h-[calc(100%-1rem)] w-px bg-line sm:left-[26px]" aria-hidden />
      {/* animated progress rail */}
      <motion.div
        className="absolute left-[22px] top-2 w-px bg-gradient-to-b from-accent via-accent to-electric shadow-glow sm:left-[26px]"
        style={{ height: lineHeight }}
        aria-hidden
      />

      <div className="space-y-5">
        {events.map((e, i) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: easePremium }}
            className="relative flex items-stretch gap-5 pl-0 sm:gap-6"
          >
            {/* timeline node */}
            <div className="relative z-10 flex-shrink-0 pt-5">
              <span className="relative flex h-[46px] w-[46px] items-center justify-center rounded-full border border-accent/40 bg-ink-800 sm:h-[54px] sm:w-[54px]">
                <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-glow" />
                <span className="absolute inset-0 animate-ping rounded-full border border-accent/30 [animation-duration:3s]" aria-hidden />
              </span>
            </div>

            {/* activity card */}
            <Link
              href={`/events/${e.id}`}
              className="group flex flex-1 items-center gap-4 rounded-2xl border border-line bg-surface p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card sm:gap-5 sm:p-4"
            >
              <span className="relative hidden h-16 w-24 flex-shrink-0 overflow-hidden rounded-xl sm:block">
                <Image
                  src={e.imageUrl ?? "/images/tech-community-conference.jpg"}
                  alt={e.title}
                  fill
                  sizes="96px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink-900/40 to-transparent" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={typeTone[e.category] ?? "neutral"} className="capitalize">{e.category}</Badge>
                  <span className="text-xs text-muted">{formatDate(e.date)}</span>
                </div>
                <h3 className="mt-1.5 truncate font-bold transition-colors group-hover:text-accent">{e.title}</h3>
                <p className="truncate text-sm text-muted">{e.organizer}</p>
              </div>
              <ArrowRight className="h-5 w-5 flex-shrink-0 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ActivityFeed() {
  const { data, status, error, reload } = useAsync(() => eventService.getEvents(), []);

  return (
    <Section>
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Live · Community"
            title="What's happening in the community"
            description="Workshops, hackathons, and meetups — the community is always moving."
            className="mx-0"
          />
          <Button href="/events" variant="outline" size="sm" className="flex-shrink-0">See all events</Button>
        </div>

        <div className="mt-14">
          <AsyncBoundary
            status={status}
            error={error}
            onRetry={reload}
            loading={
              <div className="mx-auto max-w-3xl space-y-5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 rounded-2xl" />
                ))}
              </div>
            }
            empty={<EmptyState title="No activity yet" icon={<CalendarClock className="h-7 w-7" />} />}
          >
            {data && <Timeline events={data} />}
          </AsyncBoundary>
        </div>
      </Container>
    </Section>
  );
}
