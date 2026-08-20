"use client";

import { useState, type FormEvent } from "react";
import { Check, Loader2 } from "lucide-react";
import { newsletterService } from "@/services";
import { Input } from "./fields";

type State = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setState("loading");
    setError(null);
    const res = await newsletterService.subscribe(email);
    if (res.ok) {
      setState("success");
      setEmail("");
    } else {
      setState("error");
      setError(res.error ?? "Please try again.");
    }
  }

  if (state === "success") {
    return (
      <p className="flex items-center gap-2 text-sm text-emerald-300">
        <Check className="h-4 w-4" /> Subscribed. Welcome aboard!
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2" noValidate>
      <div className="flex gap-2">
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          aria-label="Email address for newsletter"
          invalid={state === "error"}
          className="flex-1"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="inline-flex h-[46px] items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-accent-foreground transition-colors hover:shadow-glow disabled:opacity-60"
        >
          {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Join"}
        </button>
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </form>
  );
}
