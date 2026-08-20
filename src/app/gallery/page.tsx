import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { GalleryView } from "@/components/views/GalleryView";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Moments from Kick To Tech workshops, hackathons, and community events.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader eyebrow="Gallery" title="Moments in motion" description="A look at our workshops, hackathons, and community gatherings." />
      <GalleryView />
    </>
  );
}
