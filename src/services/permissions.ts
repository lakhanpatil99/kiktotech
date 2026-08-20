import type { Role } from "@/types";

/**
 * Abstract, UX-only permission model.
 *
 * This decides what admin/mentor/faculty UI to *show*. It is NOT security.
 * Real authorization is enforced by the backend / Firestore rules later.
 */
export type Permission =
  | "view_admin"
  | "manage_users"
  | "manage_events"
  | "manage_interns"
  | "issue_certificate"
  | "view_mentor"
  | "view_faculty"
  | "view_dashboard";

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    "view_admin",
    "manage_users",
    "manage_events",
    "manage_interns",
    "issue_certificate",
    "view_mentor",
    "view_faculty",
    "view_dashboard",
  ],
  faculty: ["view_faculty", "view_dashboard"],
  mentor: ["view_mentor", "manage_interns", "view_dashboard"],
  intern: ["view_dashboard"],
  student: ["view_dashboard"],
  company: ["view_dashboard"],
};

export function createPermissions(role: Role | null | undefined) {
  const granted = role ? ROLE_PERMISSIONS[role] ?? [] : [];
  return {
    role: role ?? null,
    can(permission: Permission) {
      return granted.includes(permission);
    },
  };
}
