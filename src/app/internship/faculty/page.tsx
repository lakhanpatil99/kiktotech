"use client";

import { GraduationCap, Users2, FileBarChart } from "lucide-react";
import { RequireAuth } from "@/components/dashboard/RequireAuth";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardHeader, StatCard } from "@/components/dashboard/primitives";
import { Card } from "@/components/ui";
import { EmptyState } from "@/components/feedback/states";

export default function FacultyPage() {
  return (
    <RequireAuth permission="view_faculty">
      <DashboardShell>
        <DashboardHeader title="Faculty portal" subtitle="Monitor students from your institution." />
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard icon={Users2} label="Students" value="—" hint="Loaded from backend later" />
          <StatCard icon={GraduationCap} label="Enrolled interns" value="—" />
          <StatCard icon={FileBarChart} label="Reports" value="—" />
        </div>
        <Card className="mt-6">
          <h3 className="mb-4 font-semibold">Student activity</h3>
          <EmptyState
            title="No student data yet"
            icon={<GraduationCap className="h-7 w-7" />}
            description="Institution reporting and student activity will surface here once connected to the backend."
          />
        </Card>
      </DashboardShell>
    </RequireAuth>
  );
}
