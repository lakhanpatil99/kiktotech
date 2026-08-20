"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { BadgeCheck, Search, ShieldX, Loader2, Award } from "lucide-react";
import { certificateService } from "@/services";
import { Container, Section, Badge } from "@/components/ui";
import { FormField, Input } from "@/components/forms/fields";
import { formatDate } from "@/lib/utils";
import type { Certificate } from "@/types";

type State = "idle" | "loading" | "verified" | "invalid";

export function VerifyCertView() {
  const params = useSearchParams();
  const router = useRouter();
  const initial = params.get("cert") ?? "";
  const [value, setValue] = useState(initial);
  const [state, setState] = useState<State>("idle");
  const [cert, setCert] = useState<Certificate | null>(null);

  async function verify(id: string) {
    if (!id.trim()) return;
    setState("loading");
    const result = await certificateService.verifyCertificate(id);
    if (result) {
      setCert(result);
      setState("verified");
    } else {
      setCert(null);
      setState("invalid");
    }
  }

  // Auto-verify when arriving via /verify_cert?cert=...
  useEffect(() => {
    if (initial) void verify(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial]);

  return (
    <Section className="pt-8">
      <Container className="max-w-2xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.replace(`/verify_cert?cert=${encodeURIComponent(value.trim())}`);
            void verify(value);
          }}
          className="glass rounded-3xl p-6 sm:p-8"
          noValidate
        >
          <FormField label="Certificate ID" htmlFor="cert-id" hint="Format: KTT-YYYY-NNNN (try KTT-2026-0001)">
            <div className="flex gap-2">
              <Input id="cert-id" value={value} onChange={(e) => setValue(e.target.value)} placeholder="KTT-2026-0001" className="flex-1" />
              <button type="submit" className="inline-flex h-[46px] items-center gap-2 rounded-xl bg-accent px-5 font-semibold text-accent-foreground hover:shadow-glow">
                {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                Verify
              </button>
            </div>
          </FormField>
        </form>

        <div className="mt-8">
          {state === "verified" && cert && (
            <div className="overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent">
              <div className="flex items-center gap-3 border-b border-accent/20 p-6">
                <BadgeCheck className="h-8 w-8 text-accent" />
                <div>
                  <Badge tone="success">Verified</Badge>
                  <p className="mt-1 text-sm text-muted">This is an authentic Kick To Tech certificate.</p>
                </div>
              </div>
              <div className="p-6">
                <Award className="mb-4 h-10 w-10 text-accent" />
                <dl className="space-y-3 text-sm">
                  {[
                    ["Certificate ID", cert.certificateId],
                    ["Recipient", cert.internName],
                    ["Domain", cert.domainTitle],
                    ["Duration", cert.durationLabel],
                    ["Mentor", cert.mentorName],
                    ["Issued on", formatDate(cert.issuedOn)],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4">
                      <dt className="text-muted">{k}</dt>
                      <dd className="text-right font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          )}

          {state === "invalid" && (
            <div className="flex flex-col items-center rounded-3xl border border-red-400/30 bg-red-400/5 p-10 text-center">
              <ShieldX className="h-10 w-10 text-red-300" />
              <h3 className="mt-4 text-lg font-semibold">Certificate not found</h3>
              <p className="mt-2 max-w-sm text-sm text-muted">
                We couldn&apos;t verify that ID. Please double-check the certificate ID and try again.
              </p>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
