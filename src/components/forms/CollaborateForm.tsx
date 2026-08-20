"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send } from "lucide-react";
import { collaborationService } from "@/services";
import { FormField, Input, Textarea, Select } from "@/components/forms/fields";
import { SuccessState } from "@/components/feedback/states";

const schema = z.object({
  organization: z.string().min(2, "Organization name is required."),
  contactName: z.string().min(2, "Contact name is required."),
  email: z.string().email("Enter a valid email."),
  type: z.enum(["company", "college", "community", "organization"]),
  message: z.string().min(10, "Tell us a little more (10+ characters)."),
});

type FormValues = z.infer<typeof schema>;

export function CollaborateForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { type: "company" } });

  async function onSubmit(values: FormValues) {
    setServerError(null);
    const res = await collaborationService.submitCollaboration(values);
    if (!res.ok) {
      setServerError(res.error ?? "Could not submit. Please try again.");
      throw new Error(res.error);
    }
    reset(values, { keepValues: true });
  }

  if (isSubmitSuccessful && !serverError) {
    return (
      <div className="glass rounded-3xl p-8">
        <SuccessState title="Thanks for reaching out!" description="Our team will review your details and get back to you." />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="glass space-y-5 rounded-3xl p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Organization" htmlFor="organization" error={errors.organization?.message}>
          <Input id="organization" invalid={!!errors.organization} placeholder="Acme Inc / XYZ College" {...register("organization")} />
        </FormField>
        <FormField label="Your name" htmlFor="contactName" error={errors.contactName?.message}>
          <Input id="contactName" invalid={!!errors.contactName} placeholder="Contact person" {...register("contactName")} />
        </FormField>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Email" htmlFor="email" error={errors.email?.message}>
          <Input id="email" type="email" invalid={!!errors.email} placeholder="you@org.com" {...register("email")} />
        </FormField>
        <FormField label="You are a" htmlFor="type">
          <Select id="type" {...register("type")}>
            <option value="company">Company</option>
            <option value="college">College</option>
            <option value="community">Community</option>
            <option value="organization">Organization</option>
          </Select>
        </FormField>
      </div>
      <FormField label="How would you like to collaborate?" htmlFor="message" error={errors.message?.message}>
        <Textarea id="message" invalid={!!errors.message} placeholder="Workshops, hiring, sponsorship, MoU..." {...register("message")} />
      </FormField>

      {serverError && <p role="alert" className="text-sm text-red-400">{serverError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent font-semibold text-accent-foreground transition-all hover:shadow-glow disabled:opacity-60"
      >
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {isSubmitting ? "Submitting..." : "Submit collaboration request"}
      </button>
    </form>
  );
}
