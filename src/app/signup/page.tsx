import type { Metadata } from "next";
import { SignupView } from "@/components/views/SignupView";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your Kick To Tech account.",
};

export default function SignupPage() {
  return <SignupView />;
}
