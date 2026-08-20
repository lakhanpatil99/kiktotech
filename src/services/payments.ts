import type { PaymentStatus, Result } from "@/types";
import { delay } from "@/lib/utils";

/**
 * PaymentService — UX orchestration ONLY.
 *
 * CRITICAL: The frontend never treats a client-side result as proof of
 * payment. In the real backend phase the flow is:
 *   frontend -> backend creates order -> Razorpay -> backend verifies
 *   signature/webhook -> DB -> frontend reads verified status.
 *
 * This mock only drives the UI state machine (idle/loading/success/...).
 */
export interface CreatePaymentInput {
  domainId: string;
  amountRupees: number;
}

export interface PaymentIntent {
  intentId: string;
  status: PaymentStatus;
}

export interface PaymentService {
  createPaymentIntent(input: CreatePaymentInput): Promise<Result<PaymentIntent>>;
  /** Backend-verified status only. Mock returns a simulated outcome. */
  getVerifiedStatus(intentId: string): Promise<PaymentStatus>;
}

export const paymentService: PaymentService = {
  async createPaymentIntent(input) {
    await delay(700);
    if (!input.domainId) return { ok: false, error: "No domain selected." };
    return { ok: true, data: { intentId: "intent-" + Date.now(), status: "loading" } };
  },
  async getVerifiedStatus(intentId) {
    await delay(1200);
    // Simulated backend verification result for UX testing.
    return intentId ? "success" : "failure";
  },
};
