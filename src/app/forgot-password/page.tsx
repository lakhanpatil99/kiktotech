"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, MailCheck } from "lucide-react";
import { authService } from "@/services";
import { AuthShell } from "@/components/layout/AuthShell";
import { FormField, Input } from "@/components/forms/fields";
import { Button } from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setError(null);
    const res = await authService.requestPasswordReset(email);
    if (res.ok) setState("sent");
    else { setState("error"); setError(res.error ?? "Please try again."); }
  }

  return (
    <AuthShell
      title="Reset your password"
      subtitle="We'll send a reset link to your email."
      footer={<><Link href="/login" className="font-semibold text-accent">Back to login</Link></>}
    >
      {state === "sent" ? (
        <div className="flex flex-col items-center py-4 text-center">
          <MailCheck className="h-12 w-12 text-accent" />
          <p className="mt-4 font-semibold">Check your inbox</p>
          <p className="mt-2 text-sm text-muted">If an account exists for {email}, a reset link is on its way.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="space-y-5">
          <FormField label="Email" htmlFor="fp-email" error={error ?? undefined}>
            <Input id="fp-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          </FormField>
          <Button className="w-full" size="lg" disabled={state === "loading"}>
            {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send reset link"}
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
