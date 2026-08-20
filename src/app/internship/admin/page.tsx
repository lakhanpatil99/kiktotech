"use client";

import { RequireAuth } from "@/components/dashboard/RequireAuth";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AdminConsole } from "@/components/views/AdminConsole";

/** Preserved legacy route — renders the same admin console as /admin. */
export default function InternshipAdminPage() {
  return (
    <RequireAuth permission="view_admin">
      <DashboardShell>
        <AdminConsole />
      </DashboardShell>
    </RequireAuth>
  );
}
