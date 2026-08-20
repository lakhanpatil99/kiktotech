import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { EventsView } from "@/components/views/EventsView";

export const metadata: Metadata = {
  title: "Events",
  description: "Workshops, hackathons, and meetups from the Kick To Tech community.",
};

export default function EventsPage() {
  return (
    <>
      <PageHeader eyebrow="Events" title="What's happening" description="Discover our workshops, hackathons, and community meetups — past and upcoming." />
      <EventsView />
    </>
  );
}
