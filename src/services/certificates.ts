import type { Certificate } from "@/types";
import { delay } from "@/lib/utils";

/**
 * CertificateService — preserves the public verification contract:
 *   /verify_cert?cert=<certificateId>   (id format: KTT-YYYY-NNNN)
 *
 * Mock holds a couple of sample verifiable certificates so the UI's
 * verified / invalid states can both be exercised.
 */
export interface CertificateService {
  verifyCertificate(certificateId: string): Promise<Certificate | null>;
}

const SAMPLE: Record<string, Certificate> = {
  "KTT-2026-0001": {
    certificateId: "KTT-2026-0001",
    internName: "Sample Intern",
    domainTitle: "Python (AI + Projects)",
    issuedOn: "2026-06-21",
    durationLabel: "5 Weeks (18 May 2026 - 21 June 2026)",
    mentorName: "Omkar Pawar",
    valid: true,
  },
  "KTT-2026-0002": {
    certificateId: "KTT-2026-0002",
    internName: "Sample Intern",
    domainTitle: "Cybersecurity",
    issuedOn: "2026-06-21",
    durationLabel: "5 Weeks (18 May 2026 - 21 June 2026)",
    mentorName: "Samruddhi",
    valid: true,
  },
};

export const certificateService: CertificateService = {
  async verifyCertificate(certificateId) {
    await delay(900);
    const id = certificateId.trim().toUpperCase();
    return SAMPLE[id] ?? null;
  },
};
