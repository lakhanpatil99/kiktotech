import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import type { EventItem } from "@/types";
import { Badge } from "@/components/ui";
import { GenerativeCover } from "@/components/ui/GenerativeCover";
import { formatDate } from "@/lib/utils";

const statusTone = {
  upcoming: "success",
  ongoing: "accent",
  past: "neutral",
} as const;

export function EventCard({ event }: { event: EventItem }) {
  return (
    <Link
      href={`/events/${event.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-lift"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
          <GenerativeCover seed={event.id} src={event.imageUrl || undefined} label={event.title} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 to-transparent" />
        <div className="absolute left-4 top-4">
          <Badge tone={statusTone[event.status]} className="capitalize">
            {event.status}
          </Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold leading-snug transition-colors group-hover:text-accent">
          {event.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted">{event.summary}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" /> {formatDate(event.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" /> {event.location}
          </span>
        </div>
      </div>
    </Link>
  );
}
