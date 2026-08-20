"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/components/providers";
import { authService } from "@/services";
import { AuthShell } from "@/components/layout/AuthShell";
import { FormField, Input } from "@/components/forms/fields";
import { Button } from "@/components/ui/Button";

export function LoginView() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/internship/dashboard";
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await authService.login(email, password);
    setLoading(false);
    if (res.user) {
      setUser(res.user);
      router.push(redirect);
    } else {
      setError(res.error ?? "Login failed. Please check your details.");
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your Kick To Tech account."
      footer={<>New here? <Link href="/signup" className="font-semibold text-accent">Create an account</Link></>}
    >
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <FormField label="Email" htmlFor="email">
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required autoComplete="email" />
        </FormField>
        <FormField label="Password" htmlFor="password">
          <div className="relative">
            <Input id="password" type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required autoComplete="current-password" className="pr-11" />
            <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-accent" aria-label={show ? "Hide password" : "Show password"}>
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </FormField>
        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-sm text-muted hover:text-accent">Forgot password?</Link>
        </div>
        {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
        <Button className="w-full" size="lg" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
        </Button>
      </form>
    </AuthShell>
  );
}
