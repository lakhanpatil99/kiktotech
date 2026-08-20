"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send } from "lucide-react";
import { contactService } from "@/services";
import { FormField, Input, Textarea } from "@/components/forms/fields";
import { SuccessState } from "@/components/feedback/states";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Enter a valid email."),
  message: z.string().min(10, "Message should be at least 10 characters."),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setServerError(null);
    const res = await contactService.submitContact(values);
    if (!res.ok) {
      setServerError(res.error ?? "Could not send your message. Please try again.");
      throw new Error(res.error);
    }
    reset(values, { keepValues: true });
  }

  if (isSubmitSuccessful && !serverError) {
    return (
      <div className="glass rounded-3xl p-8">
        <SuccessState title="Message sent!" description="Thanks for reaching out — we'll get back to you soon." />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="glass space-y-5 rounded-3xl p-6 sm:p-8"
    >
      <FormField label="Name" htmlFor="name" error={errors.name?.message}>
        <Input id="name" invalid={!!errors.name} placeholder="Your name" {...register("name")} />
      </FormField>
      <FormField label="Email" htmlFor="email" error={errors.email?.message}>
        <Input id="email" type="email" invalid={!!errors.email} placeholder="you@example.com" {...register("email")} />
      </FormField>
      <FormField label="Message" htmlFor="message" error={errors.message?.message}>
        <Textarea id="message" invalid={!!errors.message} placeholder="How can we help?" {...register("message")} />
      </FormField>

      {serverError && <p role="alert" className="text-sm text-red-400">{serverError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent font-semibold text-accent-foreground transition-all hover:shadow-glow disabled:opacity-60"
      >
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {isSubmitting ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
