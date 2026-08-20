import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginView } from "@/components/views/LoginView";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your Kick To Tech account.",
};

export default function LoginPage() {
  return (
    <Suspense>
      <LoginView />
    </Suspense>
  );
}
