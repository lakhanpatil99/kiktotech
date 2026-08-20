import type { Enrollment, InternshipProgram, Result } from "@/types";
import { internshipProgram } from "@/data/mock/internship";
import { delay } from "@/lib/utils";

export interface InternshipService {
  getProgram(): Promise<InternshipProgram>;
  getEnrollment(uid: string): Promise<Enrollment | null>;
  createEnrollmentDraft(domainId: string): Promise<Result<{ draftId: string }>>;
}

export const internshipService: InternshipService = {
  async getProgram() {
    await delay(500);
    return internshipProgram;
  },
  async getEnrollment(uid) {
    await delay(600);
    // Mock: no enrollment yet for a fresh session.
    if (!uid) return null;
    return null;
  },
  async createEnrollmentDraft(domainId) {
    await delay(500);
    if (!domainId) return { ok: false, error: "Select a domain first." };
    return { ok: true, data: { draftId: "draft-" + domainId } };
  },
};
