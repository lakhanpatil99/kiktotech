import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { BlogView } from "@/components/views/BlogView";

export const metadata: Metadata = {
  title: "Blog",
  description: "Ideas, updates, and stories from the Kick To Tech community.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader eyebrow="Blog" title="Stories & insights" description="Updates, learnings, and perspectives from our community and programs." />
      <BlogView />
    </>
  );
}
