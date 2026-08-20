import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { VerifyCertView } from "@/components/views/VerifyCertView";
import { SceneLoader } from "@/three/SceneLoader";

export const metadata: Metadata = {
  title: "Verify Certificate",
  description: "Verify the authenticity of a Kick To Tech internship certificate.",
};

export default function VerifyCertPage() {
  return (
    <>
      <PageHeader eyebrow="Verification" title="Verify a certificate" description="Enter a certificate ID to confirm it was issued by Kick To Tech." />
      <Suspense fallback={<div className="relative h-40"><SceneLoader /></div>}>
        <VerifyCertView />
      </Suspense>
    </>
  );
}
