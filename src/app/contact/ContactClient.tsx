"use client";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/ButtonLink";

export default function ContactClient() {
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
        <div className="mx-auto max-w-3xl">
          <form
            className="rounded-2xl border border-border bg-surface p-6 shadow-brand-sm sm:p-8"
          >
            <p className="mb-5 rounded-xl border border-border bg-paper px-4 py-3 text-sm text-muted">
              Contact form coming soon. Messages entered here are not being sent
              yet.
            </p>
            <div className="grid gap-4">
              <label className="block text-sm text-ink-soft">
                Name
                <input
                  name="name"
                  disabled
                  autoComplete="name"
                  className="mt-1.5 w-full rounded-xl border border-border bg-paper px-3.5 py-2.5 text-ink outline-none transition focus:border-accent"
                />
              </label>
              <label className="block text-sm text-ink-soft">
                Email
                <input
                  name="email"
                  type="email"
                  disabled
                  autoComplete="email"
                  className="mt-1.5 w-full rounded-xl border border-border bg-paper px-3.5 py-2.5 text-ink outline-none transition focus:border-accent"
                />
              </label>
              <label className="block text-sm text-ink-soft">
                Subject
                <select
                  name="subject"
                  disabled
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
                  disabled
                  rows={6}
                  className="mt-1.5 w-full rounded-xl border border-border bg-paper px-3.5 py-2.5 text-ink outline-none transition focus:border-accent"
                />
              </label>
              <Button type="button" disabled>
                Contact form coming soon
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
