"use client";

import { CalendarDays } from "lucide-react";
import { useAsync } from "@/hooks/useAsync";
import { eventService } from "@/services";
import { Container, Section, SectionHeading } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import { CardSkeleton } from "@/components/ui/Skeleton";
import { AsyncBoundary } from "@/components/feedback/AsyncBoundary";
import { EmptyState } from "@/components/feedback/states";
import { EventCard } from "@/components/cards/EventCard";
import { StaggerGroup, StaggerItem } from "@/components/motion";

export function EventsPreview() {
  const { data, status, error, reload } = useAsync(() => eventService.getEvents(), []);

  return (
    <Section className="border-y border-line bg-ink-800/30">
      <Container>
        <div className="flex flex-col items-end justify-between gap-6 sm:flex-row">
          <SectionHeading
            align="left"
            eyebrow="Events & Achievements"
            title="Where our community shows up"
            className="mx-0"
          />
          <Button href="/events" variant="outline" size="sm" className="flex-shrink-0">
            View all events
          </Button>
        </div>

        <div className="mt-12">
          <AsyncBoundary
            status={status}
            error={error}
            onRetry={reload}
            loading={
              <div className="grid gap-6 md:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            }
            empty={<EmptyState title="No events yet" icon={<CalendarDays className="h-7 w-7" />} description="Check back soon for upcoming workshops and hackathons." />}
          >
            <StaggerGroup className="grid gap-6 md:grid-cols-3">
              {data?.slice(0, 3).map((event) => (
                <StaggerItem key={event.id} className="h-full">
                  <EventCard event={event} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </AsyncBoundary>
        </div>
      </Container>
    </Section>
  );
}
