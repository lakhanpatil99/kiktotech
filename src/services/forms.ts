import type { CollaborationSubmission, ContactSubmission, Result } from "@/types";
import { delay } from "@/lib/utils";

export interface ContactService {
  submitContact(data: ContactSubmission): Promise<Result<null>>;
}

export interface CollaborationService {
  submitCollaboration(data: CollaborationSubmission): Promise<Result<null>>;
}

export interface NewsletterService {
  subscribe(email: string): Promise<Result<null>>;
}

export interface EmailService {
  /** UX-facing hook only. Real send happens server-side (no secrets in client). */
  sendEnrollmentEmail(to: string): Promise<Result<null>>;
}

export const contactService: ContactService = {
  async submitContact(data) {
    await delay(800);
    if (!data.name || !data.email || !data.message)
      return { ok: false, error: "Please complete all fields." };
    return { ok: true, data: null };
  },
};

export const collaborationService: CollaborationService = {
  async submitCollaboration(data) {
    await delay(800);
    if (!data.organization || !data.email)
      return { ok: false, error: "Organization and email are required." };
    return { ok: true, data: null };
  },
};

export const newsletterService: NewsletterService = {
  async subscribe(email) {
    await delay(600);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      return { ok: false, error: "Enter a valid email." };
    return { ok: true, data: null };
  },
};

export const emailService: EmailService = {
  async sendEnrollmentEmail() {
    await delay(500);
    // No API key in the client. Server handles the actual Brevo call later.
    return { ok: true, data: null };
  },
};
