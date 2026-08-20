"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, GraduationCap, Building2 } from "lucide-react";
import { useAuth } from "@/components/providers";
import { authService } from "@/services";
import { AuthShell } from "@/components/layout/AuthShell";
import { FormField, Input } from "@/components/forms/fields";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Role = "student" | "company";

export function SignupView() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<Role>("student");
  const [account, setAccount] = useState({ name: "", email: "", password: "" });
  const [extra, setExtra] = useState({ phone: "", college: "", company: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const accountValid =
    account.name.length >= 2 &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(account.email) &&
    account.password.length >= 6;

  async function submit() {
    setLoading(true);
    setError(null);
    const res = await authService.signup({
      name: account.name,
      email: account.email,
      password: account.password,
      phone: extra.phone,
      role,
      college: role === "student" ? extra.college : undefined,
      company: role === "company" ? extra.company : undefined,
    });
    setLoading(false);
    if (res.user) {
      setUser(res.user);
      router.push("/internship/dashboard");
    } else {
      setError(res.error ?? "Could not create account.");
    }
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join Pune's student tech community."
      footer={<>Already have an account? <Link href="/login" className="font-semibold text-accent">Sign in</Link></>}
    >
      {/* progress */}
      <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted">
        <span>Step {step + 1} of 3</span>
        <span>{["Account", "Role", "Details"][step]}</span>
      </div>
      <div className="mb-7 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className={cn("h-1.5 flex-1 rounded-full transition-colors duration-300", i <= step ? "bg-accent" : "bg-line")} />
        ))}
      </div>

      <motion.div key={step} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}>
        {step === 0 && (
          <div className="space-y-4">
            <FormField label="Full name" htmlFor="s-name"><Input id="s-name" value={account.name} onChange={(e) => setAccount({ ...account, name: e.target.value })} placeholder="Your name" autoComplete="name" /></FormField>
            <FormField label="Email" htmlFor="s-email"><Input id="s-email" type="email" value={account.email} onChange={(e) => setAccount({ ...account, email: e.target.value })} placeholder="you@example.com" autoComplete="email" /></FormField>
            <FormField label="Password" htmlFor="s-pass" hint="At least 6 characters."><Input id="s-pass" type="password" value={account.password} onChange={(e) => setAccount({ ...account, password: e.target.value })} placeholder="••••••••" autoComplete="new-password" /></FormField>
            <Button className="mt-2 w-full" size="lg" onClick={() => accountValid && setStep(1)} disabled={!accountValid}>Continue</Button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <p className="text-sm font-medium text-primary-foreground/90">I am a</p>
            <div className="grid grid-cols-2 gap-3">
              {([["student", GraduationCap, "Student"], ["company", Building2, "Company"]] as const).map(([value, Icon, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRole(value)}
                  aria-pressed={role === value}
                  className={cn("flex flex-col items-center gap-2.5 rounded-2xl border p-6 transition-all duration-300", role === value ? "border-accent bg-accent/10 shadow-glow" : "border-line hover:-translate-y-0.5 hover:border-accent/40")}
                >
                  <Icon className={cn("h-7 w-7 transition-colors", role === value ? "text-accent" : "text-muted")} />
                  <span className="text-sm font-semibold">{label}</span>
                </button>
              ))}
            </div>
            <p className="text-xs leading-relaxed text-muted">Role selection tailors your experience. Real permissions are enforced by the backend later.</p>
            <Button className="w-full" size="lg" onClick={() => setStep(2)}>Continue</Button>
            <button type="button" onClick={() => setStep(0)} className="mx-auto block text-sm font-medium text-muted transition-colors hover:text-accent">Back</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <FormField label="Phone" htmlFor="s-phone"><Input id="s-phone" value={extra.phone} onChange={(e) => setExtra({ ...extra, phone: e.target.value })} placeholder="+91 ..." autoComplete="tel" /></FormField>
            {role === "student" ? (
              <FormField label="College" htmlFor="s-college"><Input id="s-college" value={extra.college} onChange={(e) => setExtra({ ...extra, college: e.target.value })} placeholder="Your college" /></FormField>
            ) : (
              <FormField label="Company" htmlFor="s-company"><Input id="s-company" value={extra.company} onChange={(e) => setExtra({ ...extra, company: e.target.value })} placeholder="Your company" /></FormField>
            )}
            {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
            <Button className="mt-2 w-full" size="lg" onClick={submit} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create account"}
            </Button>
            <button type="button" onClick={() => setStep(1)} className="mx-auto block text-sm font-medium text-muted transition-colors hover:text-accent">Back</button>
          </div>
        )}
      </motion.div>
    </AuthShell>
  );
}
