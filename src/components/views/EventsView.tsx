"use client";

import { useMemo, useState } from "react";
import { CalendarSearch, Search } from "lucide-react";
import { useAsync } from "@/hooks/useAsync";
import { eventService } from "@/services";
import { Container, Section } from "@/components/ui";
import { CardSkeleton } from "@/components/ui/Skeleton";
import { AsyncBoundary } from "@/components/feedback/AsyncBoundary";
import { EmptyState } from "@/components/feedback/states";
import { EventCard } from "@/components/cards/EventCard";
import { Input } from "@/components/forms/fields";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";
import type { EventStatus } from "@/types";

const filters: { label: string; value: EventStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Ongoing", value: "ongoing" },
  { label: "Past", value: "past" },
];

export function EventsView() {
  const { data, status, error, reload } = useAsync(() => eventService.getEvents(), []);
  const [filter, setFilter] = useState<EventStatus | "all">("all");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    let list = data ?? [];
    if (filter !== "all") list = list.filter((e) => e.status === filter);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((e) => e.title.toLowerCase().includes(q) || e.tags.some((t) => t.toLowerCase().includes(q)));
    }
    return list;
  }, [data, filter, query]);

  return (
    <Section className="pt-8">
      <Container>
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  filter === f.value
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-line text-muted hover:text-primary-foreground",
                )}
                aria-pressed={filter === f.value}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events"
              aria-label="Search events"
              className="pl-9"
            />
          </div>
        </div>

        <AsyncBoundary
          status={status === "success" && results.length === 0 ? "empty" : status}
          error={error}
          onRetry={reload}
          loading={
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          }
          empty={<EmptyState title="No matching events" icon={<CalendarSearch className="h-7 w-7" />} description="Try a different filter or search term." />}
        >
          <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((event) => (
              <StaggerItem key={event.id} className="h-full">
                <EventCard event={event} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </AsyncBoundary>
      </Container>
    </Section>
  );
}
