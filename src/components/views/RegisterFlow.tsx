"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, ArrowRight, ArrowLeft, ShieldCheck } from "lucide-react";
import { internshipProgram } from "@/data/mock/internship";
import { internshipService, paymentService } from "@/services";
import { Container, Section, Badge } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import { DomainCard } from "@/components/cards/DomainCard";
import { FormField, Input } from "@/components/forms/fields";
import { SuccessState, ErrorState } from "@/components/feedback/states";
import { cn, formatINR } from "@/lib/utils";
import type { PaymentStatus } from "@/types";

const steps = ["Personal", "Academic", "Domain", "Review", "Payment"] as const;

export function RegisterFlow() {
  const [step, setStep] = useState(0);
  const [personal, setPersonal] = useState({ name: "", email: "", phone: "" });
  const [academic, setAcademic] = useState({ college: "", year: "", city: "" });
  const [domainId, setDomainId] = useState<string | null>(null);
  const [payment, setPayment] = useState<PaymentStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const domain = internshipProgram.domains.find((d) => d.id === domainId);

  const canNext =
    (step === 0 && personal.name && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(personal.email) && personal.phone) ||
    (step === 1 && academic.college && academic.year) ||
    (step === 2 && domainId) ||
    step === 3;

  async function startPayment() {
    setPayment("loading");
    setError(null);
    // 1) Ask (future) backend to create an order. 2) Backend verifies. The
    // client NEVER self-certifies payment success.
    const intent = await paymentService.createPaymentIntent({ domainId: domainId!, amountRupees: internshipProgram.priceRupees });
    if (!intent.ok || !intent.data) {
      setPayment("failure");
      setError(intent.error ?? "Could not start payment.");
      return;
    }
    const verified = await paymentService.getVerifiedStatus(intent.data.intentId);
    setPayment(verified);
  }

  return (
    <Section className="pt-8">
      <Container className="max-w-3xl">
        {/* Stepper */}
        <ol className="mb-10 flex items-center justify-between">
          {steps.map((label, i) => (
            <li key={label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors",
                    i < step ? "border-accent bg-accent text-accent-foreground" : i === step ? "border-accent text-accent" : "border-line text-muted",
                  )}
                >
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span className="mt-2 hidden text-xs text-muted sm:block">{label}</span>
              </div>
              {i < steps.length - 1 && <span className={cn("mx-2 h-0.5 flex-1 rounded", i < step ? "bg-accent" : "bg-line")} />}
            </li>
          ))}
        </ol>

        <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-3xl p-6 sm:p-8">
          {step === 0 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold">Personal information</h2>
              <FormField label="Full name" htmlFor="r-name"><Input id="r-name" value={personal.name} onChange={(e) => setPersonal({ ...personal, name: e.target.value })} placeholder="Your name" /></FormField>
              <FormField label="Email" htmlFor="r-email"><Input id="r-email" type="email" value={personal.email} onChange={(e) => setPersonal({ ...personal, email: e.target.value })} placeholder="you@example.com" /></FormField>
              <FormField label="Phone" htmlFor="r-phone"><Input id="r-phone" value={personal.phone} onChange={(e) => setPersonal({ ...personal, phone: e.target.value })} placeholder="+91 ..." /></FormField>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold">Academic details</h2>
              <FormField label="College / Institution" htmlFor="r-college"><Input id="r-college" value={academic.college} onChange={(e) => setAcademic({ ...academic, college: e.target.value })} placeholder="Your college" /></FormField>
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Year" htmlFor="r-year"><Input id="r-year" value={academic.year} onChange={(e) => setAcademic({ ...academic, year: e.target.value })} placeholder="e.g. 2nd year" /></FormField>
                <FormField label="City" htmlFor="r-city"><Input id="r-city" value={academic.city} onChange={(e) => setAcademic({ ...academic, city: e.target.value })} placeholder="Pune" /></FormField>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="mb-5 text-xl font-bold">Choose your domain</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {internshipProgram.domains.map((d) => (
                  <DomainCard key={d.id} domain={d} selected={domainId === d.id} onSelect={setDomainId} />
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Review</h2>
              <dl className="divide-y divide-line rounded-2xl border border-line">
                {[
                  ["Name", personal.name],
                  ["Email", personal.email],
                  ["Phone", personal.phone],
                  ["College", academic.college],
                  ["Year", academic.year],
                  ["Domain", domain?.title ?? "-"],
                  ["Program fee", formatINR(internshipProgram.priceRupees)],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 p-4 text-sm">
                    <dt className="text-muted">{k}</dt>
                    <dd className="font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="flex items-center gap-2 text-xs text-muted">
                <ShieldCheck className="h-4 w-4 text-accent" /> Payment is verified server-side before enrollment is confirmed.
              </p>
            </div>
          )}

          {step === 4 && (
            <div>
              {payment === "success" ? (
                <SuccessState title="Registration received!" description="Once payment is verified, your enrollment will be activated and you'll get a confirmation email." />
              ) : payment === "failure" ? (
                <ErrorState message={error ?? "Payment could not be completed."} onRetry={startPayment} />
              ) : (
                <div className="text-center">
                  <h2 className="text-xl font-bold">Complete your enrollment</h2>
                  <p className="mt-2 text-muted">{domain?.title} · {formatINR(internshipProgram.priceRupees)}</p>
                  <Button size="lg" className="mt-6" onClick={startPayment} disabled={payment === "loading"}>
                    {payment === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> Processing…</> : <>Pay {formatINR(internshipProgram.priceRupees)}</>}
                  </Button>
                  <p className="mt-4 text-xs text-muted">This is a demo checkout. No real payment is taken in this build.</p>
                </div>
              )}
            </div>
          )}

          {/* Nav */}
          {step < 4 && (
            <div className="mt-8 flex items-center justify-between">
              <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <Button onClick={() => canNext && setStep((s) => s + 1)} disabled={!canNext}>
                {step === 3 ? "Proceed to payment" : "Continue"} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </motion.div>
      </Container>
    </Section>
  );
}
