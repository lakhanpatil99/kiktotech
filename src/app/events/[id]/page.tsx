import type { Metadata } from "next";
import { EventDetailView } from "@/components/views/EventDetailView";

export const metadata: Metadata = {
  title: "Event",
  description: "Event details and registration.",
};

export default function EventDetailPage({ params }: { params: { id: string } }) {
  return <EventDetailView id={params.id} />;
}
