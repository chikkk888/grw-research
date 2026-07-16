"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/ButtonLink";

type Props = {
  variant?: "inline" | "card";
  heading?: string;
  description?: string;
};

export function EmailSignup({
  variant = "card",
  heading = "Stay current on peptide research guides",
  description = "Optional updates when we publish carefully reviewed educational explainers. Placeholder integration — no active mailing list is claimed yet.",
}: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const payload = {
      email: String(form.get("email") || ""),
      firstName: String(form.get("firstName") || ""),
      consent: form.get("consent") === "on",
    };

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(data.message || "Signup failed");
      setStatus("done");
      setMessage(data.message || "Thanks — request recorded (placeholder).");
      event.currentTarget.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Unable to submit right now.",
      );
    }
  }

  const shell =
    variant === "inline"
      ? "rounded-2xl border border-border bg-surface p-5 shadow-brand-sm"
      : "rounded-2xl border border-border bg-surface p-6 shadow-brand-sm sm:p-8";

  return (
    <section className={shell} aria-labelledby="email-signup-heading">
      <h2
        id="email-signup-heading"
        className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
      >
        {heading}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        {description}
      </p>
      <form onSubmit={onSubmit} className="mt-6 grid gap-3 sm:grid-cols-2">
        <label className="block text-sm text-ink-soft">
          First name <span className="text-muted">(optional)</span>
          <input
            name="firstName"
            type="text"
            autoComplete="given-name"
            className="mt-1.5 w-full rounded-xl border border-border bg-paper px-3.5 py-2.5 text-ink outline-none transition focus:border-accent"
          />
        </label>
        <label className="block text-sm text-ink-soft">
          Email address
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1.5 w-full rounded-xl border border-border bg-paper px-3.5 py-2.5 text-ink outline-none transition focus:border-accent"
          />
        </label>
        <label className="sm:col-span-2 flex items-start gap-2.5 text-sm text-muted">
          <input name="consent" type="checkbox" required className="mt-1" />
          <span>
            I agree to be contacted about educational updates from{" "}
            {siteConfig.brandName}. I can unsubscribe at any time. This form is
            a development placeholder and does not confirm an active mailing
            list.
          </span>
        </label>
        <div className="sm:col-span-2">
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Submitting…" : "Subscribe"}
          </Button>
        </div>
      </form>
      {message ? (
        <p
          className={`mt-3 text-sm ${status === "error" ? "text-red-600 dark:text-red-400" : "text-emerald"}`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </section>
  );
}
