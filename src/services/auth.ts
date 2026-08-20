import type { AuthResult, Profile, Result, Role } from "@/types";
import { delay } from "@/lib/utils";

/**
 * AuthService — the ONLY boundary the UI talks to for authentication.
 * The mock adapter simulates async auth. A Firebase adapter can replace
 * this later WITHOUT touching any component.
 *
 * Security note: nothing here is a real security boundary. Roles returned
 * are for UX shaping only; real enforcement is server/rules in a later phase.
 */
export interface AuthService {
  login(email: string, password: string): Promise<AuthResult>;
  signup(input: SignupInput): Promise<AuthResult>;
  logout(): Promise<void>;
  requestPasswordReset(email: string): Promise<Result<null>>;
  getCurrentUser(): Promise<Profile | null>;
}

export interface SignupInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: Extract<Role, "student" | "company">;
  college?: string;
  company?: string;
}

const STORAGE_KEY = "ktt.mock.session";

function inferRole(email: string): Role {
  // UX-only role hinting for the mock. NOT authorization.
  if (email.endsWith("@kicktotech.in")) return "admin";
  return "student";
}

const mockAuthService: AuthService = {
  async login(email, password) {
    await delay(700);
    if (!email || !password) return { user: null, error: "Email and password are required." };
    const user: Profile = {
      uid: "mock-" + btoa(email).slice(0, 8),
      name: email.split("@")[0].replace(/[.]/g, " "),
      email,
      role: inferRole(email),
      createdAt: new Date().toISOString(),
    };
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
    return { user };
  },

  async signup(input) {
    await delay(900);
    const user: Profile = {
      uid: "mock-" + btoa(input.email).slice(0, 8),
      name: input.name,
      email: input.email,
      phone: input.phone,
      role: input.role,
      college: input.college,
      company: input.company,
      createdAt: new Date().toISOString(),
    };
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
    return { user };
  },

  async logout() {
    await delay(200);
    if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
  },

  async requestPasswordReset(email) {
    await delay(700);
    if (!email) return { ok: false, error: "Please enter your email." };
    return { ok: true, data: null };
  },

  async getCurrentUser() {
    await delay(120);
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Profile) : null;
  },
};

export const authService: AuthService = mockAuthService;
