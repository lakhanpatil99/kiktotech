"use client";

import { RequireAuth } from "@/components/dashboard/RequireAuth";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AdminConsole } from "@/components/views/AdminConsole";

export default function AdminPage() {
  return (
    <RequireAuth permission="view_admin">
      <DashboardShell>
        <AdminConsole />
      </DashboardShell>
    </RequireAuth>
  );
}
