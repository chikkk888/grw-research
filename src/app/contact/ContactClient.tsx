"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/ButtonLink";

export default function ContactClient() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Placeholder — wire to email/API later
    setStatus("submitted");
    event.currentTarget.reset();
  }

  return (
    <>
      <section className="border-b border-border">
        <Container className="py-14 sm:py-20">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
          />
          <SectionHeading
            className="mt-8"
            eyebrow="Contact"
            title="Contact GRW Research"
            description="Corrections, editorial questions, and partnership inquiries. This form is a development placeholder and does not yet transmit messages to a live inbox."
          />
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-[1fr_0.85fr]">
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-border bg-surface p-6 shadow-brand-sm sm:p-8"
          >
            <div className="grid gap-4">
              <label className="block text-sm text-ink-soft">
                Name
                <input
                  name="name"
                  required
                  autoComplete="name"
                  className="mt-1.5 w-full rounded-xl border border-border bg-paper px-3.5 py-2.5 text-ink outline-none transition focus:border-accent"
                />
              </label>
              <label className="block text-sm text-ink-soft">
                Email
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="mt-1.5 w-full rounded-xl border border-border bg-paper px-3.5 py-2.5 text-ink outline-none transition focus:border-accent"
                />
              </label>
              <label className="block text-sm text-ink-soft">
                Subject
                <select
                  name="subject"
                  className="mt-1.5 w-full rounded-xl border border-border bg-paper px-3.5 py-2.5 text-ink outline-none transition focus:border-accent"
                  defaultValue="editorial"
                >
                  <option value="editorial">Editorial / corrections</option>
                  <option value="partnership">Partnership</option>
                  <option value="general">General question</option>
                </select>
              </label>
              <label className="block text-sm text-ink-soft">
                Message
                <textarea
                  name="message"
                  required
                  rows={6}
                  className="mt-1.5 w-full rounded-xl border border-border bg-paper px-3.5 py-2.5 text-ink outline-none transition focus:border-accent"
                />
              </label>
              <Button type="submit">Send message</Button>
            </div>
            {status === "submitted" ? (
              <p className="mt-4 text-sm text-emerald" role="status">
                Thanks — message captured locally as a placeholder. Wire this
                form to your inbox or CRM before launch.
              </p>
            ) : null}
          </form>

          <aside className="rounded-2xl border border-border bg-paper/70 p-6">
            <h2 className="text-lg font-semibold text-ink">Direct email</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {siteConfig.email}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              For corrections, include the page URL, the issue, and any
              supporting source material.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Partnership inquiries: use subject line “Partnership”.
            </p>
          </aside>
        </div>
      </Container>
    </>
  );
}
