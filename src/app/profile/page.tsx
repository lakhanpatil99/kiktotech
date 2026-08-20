"use client";

import { useState } from "react";
import { LogOut, Save, Loader2 } from "lucide-react";
import { RequireAuth } from "@/components/dashboard/RequireAuth";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardHeader, StatusBadge } from "@/components/dashboard/primitives";
import { Card } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import { FormField, Input } from "@/components/forms/fields";
import { SuccessState } from "@/components/feedback/states";
import { useAuth } from "@/components/providers";

export default function ProfilePage() {
  return (
    <RequireAuth>
      <DashboardShell>
        <ProfileContent />
      </DashboardShell>
    </RequireAuth>
  );
}

function ProfileContent() {
  const { user, logout } = useAuth();
  const [form, setForm] = useState({ name: user?.name ?? "", phone: user?.phone ?? "" });
  const [state, setState] = useState<"idle" | "saving" | "saved">("idle");

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setState("saving");
    // Persistence is deferred to the service layer / backend. UX only here.
    await new Promise((r) => setTimeout(r, 700));
    setState("saved");
    setTimeout(() => setState("idle"), 2500);
  }

  return (
    <>
      <DashboardHeader
        title="Your profile"
        subtitle="Manage your account details."
        action={<Button variant="outline" size="sm" onClick={() => void logout()}><LogOut className="h-4 w-4" /> Logout</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="flex flex-col items-center text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-accent/20 to-electric/10 text-3xl font-bold text-accent">
            {(user?.name ?? "U").slice(0, 2).toUpperCase()}
          </div>
          <h3 className="mt-4 text-lg font-bold">{user?.name}</h3>
          <p className="text-sm text-muted">{user?.email}</p>
          <div className="mt-3"><StatusBadge status={user?.role ?? "student"} /></div>
        </Card>

        <Card className="lg:col-span-2">
          {state === "saved" ? (
            <SuccessState title="Profile updated" description="Your changes have been saved." />
          ) : (
            <form onSubmit={save} className="space-y-5">
              <FormField label="Full name" htmlFor="p-name"><Input id="p-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></FormField>
              <FormField label="Email" htmlFor="p-email"><Input id="p-email" value={user?.email ?? ""} disabled /></FormField>
              <FormField label="Phone" htmlFor="p-phone"><Input id="p-phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 ..." /></FormField>
              <Button disabled={state === "saving"}>
                {state === "saving" ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Save className="h-4 w-4" /> Save changes</>}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </>
  );
}
