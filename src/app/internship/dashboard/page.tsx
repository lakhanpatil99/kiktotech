"use client";

import { BookOpen, Award, CreditCard, CalendarClock, FileText, LifeBuoy } from "lucide-react";
import { RequireAuth } from "@/components/dashboard/RequireAuth";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardHeader, StatCard, ProgressCard, StatusBadge, Timeline } from "@/components/dashboard/primitives";
import { Card } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/feedback/states";
import { useAuth } from "@/components/providers";
import { internshipProgram } from "@/data/mock/internship";
import { formatINR } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <RequireAuth permission="view_dashboard">
      <DashboardShell>
        <DashboardContent />
      </DashboardShell>
    </RequireAuth>
  );
}

function DashboardContent() {
  const { user } = useAuth();
  // Mock: a fresh account has no active enrollment yet.
  const hasEnrollment = false;

  return (
    <>
      <DashboardHeader
        title={`Welcome, ${user?.name ?? "there"}`}
        subtitle="Your internship at a glance."
        action={<Button href="/internship/register" size="sm">Enroll in a domain</Button>}
      />

      {!hasEnrollment ? (
        <EmptyState
          title="No active enrollment yet"
          icon={<BookOpen className="h-7 w-7" />}
          description="Choose a domain to begin your 5-week project-first internship."
          action={<Button href="/internship" size="sm" variant="outline">Explore domains</Button>}
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard icon={BookOpen} label="Domain" value="Python (AI)" />
              <StatCard icon={CreditCard} label="Payment" value={<StatusBadge status="active" />} hint={formatINR(internshipProgram.priceRupees)} />
              <StatCard icon={Award} label="Certificate" value={<StatusBadge status="pending" />} />
            </div>
            <Card>
              <h3 className="mb-4 font-semibold">Progress</h3>
              <ProgressCard label="Overall completion" value={40} />
            </Card>
          </div>
          <Card>
            <h3 className="mb-4 flex items-center gap-2 font-semibold"><CalendarClock className="h-4 w-4 text-accent" /> Timeline</h3>
            <Timeline
              items={[
                { title: "Enrolled", date: "18 May 2026", done: true },
                { title: "Mid-program review", date: "1 Jun 2026" },
                { title: "Final submission", date: "18 Jun 2026" },
                { title: "Certificate issued", date: "21 Jun 2026" },
              ]}
            />
          </Card>
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card className="flex items-center justify-between">
          <div className="flex items-center gap-3"><FileText className="h-5 w-5 text-accent" /> <span className="text-sm">Documents & resources</span></div>
          <Button href="/internship" size="sm" variant="ghost">Open</Button>
        </Card>
        <Card className="flex items-center justify-between">
          <div className="flex items-center gap-3"><LifeBuoy className="h-5 w-5 text-accent" /> <span className="text-sm">Need help?</span></div>
          <Button href="/contact" size="sm" variant="ghost">Contact</Button>
        </Card>
      </div>
    </>
  );
}
