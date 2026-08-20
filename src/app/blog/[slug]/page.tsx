import type { Metadata } from "next";
import { BlogDetailView } from "@/components/views/BlogDetailView";

export const metadata: Metadata = {
  title: "Article",
  description: "Read the latest from Kick To Tech.",
};

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  return <BlogDetailView slug={params.slug} />;
}
