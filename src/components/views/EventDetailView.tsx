"use client";

import Link from "next/link";
import { useState } from "react";
import { CalendarDays, MapPin, Building, ArrowLeft, Loader2 } from "lucide-react";
import { GenerativeCover } from "@/components/ui/GenerativeCover";
import { useAsync } from "@/hooks/useAsync";
import { eventService } from "@/services";
import { Container, Section, Badge } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { AsyncBoundary } from "@/components/feedback/AsyncBoundary";
import { EmptyState, SuccessState } from "@/components/feedback/states";
import { FormField, Input } from "@/components/forms/fields";
import { EventCard } from "@/components/cards/EventCard";
import { formatDate } from "@/lib/utils";

export function EventDetailView({ id }: { id: string }) {
  const { data: event, status, error, reload } = useAsync(() => eventService.getEvent(id), [id]);
  const { data: all } = useAsync(() => eventService.getEvents(), []);

  return (
    <AsyncBoundary
      status={event === null && status === "success" ? "empty" : status}
      error={error}
      onRetry={reload}
      loading={
        <Container className="py-16">
          <Skeleton className="h-72 w-full rounded-3xl" />
          <Skeleton className="mt-6 h-10 w-2/3" />
          <Skeleton className="mt-4 h-24 w-full" />
        </Container>
      }
      empty={
        <Container className="py-24">
          <EmptyState title="Event not found" description="This event may have been moved or removed." action={<Button href="/events" variant="outline" size="sm">Back to events</Button>} />
        </Container>
      }
    >
      {event && (
        <>
          <Section className="pt-8">
            <Container>
              <Link href="/events" className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-accent">
                <ArrowLeft className="h-4 w-4" /> All events
              </Link>
              <div className="relative aspect-[21/9] overflow-hidden rounded-3xl border border-line">
                <GenerativeCover seed={event.id} src={event.imageUrl || undefined} label={event.title} sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <Badge tone={event.status === "past" ? "neutral" : "success"} className="mb-3 capitalize">{event.status}</Badge>
                  <h1 className="text-3xl font-bold sm:text-4xl">{event.title}</h1>
                </div>
              </div>

              <div className="mt-10 grid gap-10 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <p className="text-lg leading-relaxed text-primary-foreground/85">{event.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {event.tags.map((t) => (
                      <span key={t} className="rounded-full border border-line bg-white/5 px-3 py-1 text-xs text-muted">{t}</span>
                    ))}
                  </div>
                </div>
                <aside className="space-y-4">
                  <div className="glass rounded-3xl p-6">
                    <ul className="space-y-4 text-sm">
                      <li className="flex items-center gap-3"><CalendarDays className="h-5 w-5 text-accent" /> {formatDate(event.date)}</li>
                      <li className="flex items-center gap-3"><MapPin className="h-5 w-5 text-accent" /> {event.location}</li>
                      <li className="flex items-center gap-3"><Building className="h-5 w-5 text-accent" /> {event.organizer}</li>
                    </ul>
                    <div className="mt-6">
                      <RegisterInterest eventId={event.id} open={event.registrationOpen} />
                    </div>
                  </div>
                </aside>
              </div>
            </Container>
          </Section>

          {all && all.filter((e) => e.id !== event.id).length > 0 && (
            <Section className="pt-0">
              <Container>
                <h2 className="mb-8 text-2xl font-bold">Related events</h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {all.filter((e) => e.id !== event.id).slice(0, 3).map((e) => (
                    <EventCard key={e.id} event={e} />
                  ))}
                </div>
              </Container>
            </Section>
          )}
        </>
      )}
    </AsyncBoundary>
  );
}

function RegisterInterest({ eventId, open }: { eventId: string; open: boolean }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [err, setErr] = useState<string | null>(null);

  if (!open) {
    return <p className="text-center text-sm text-muted">Registration is closed for this event.</p>;
  }
  if (state === "done") {
    return <SuccessState title="You're on the list!" description="We'll email you the details." />;
  }

  return (
    <form
      className="space-y-3"
      onSubmit={async (e) => {
        e.preventDefault();
        setState("loading");
        setErr(null);
        const res = await eventService.registerForEvent({ eventId, name, email, phone: "", college: "", role: "student" });
        if (res.ok) setState("done");
        else { setState("error"); setErr(res.error ?? "Try again."); }
      }}
      noValidate
    >
      <FormField label="Name" htmlFor="ev-name"><Input id="ev-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required /></FormField>
      <FormField label="Email" htmlFor="ev-email" error={err ?? undefined}><Input id="ev-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required /></FormField>
      <Button size="md" className="w-full" disabled={state === "loading"}>
        {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Register interest"}
      </Button>
    </form>
  );
}
