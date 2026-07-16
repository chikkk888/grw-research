import Link from "next/link";
import {
  getFeaturedGuides,
  homeFaqs,
  researchGuides,
} from "@/config/research-guides";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResearchCard } from "@/components/ui/ResearchCard";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { TestimonialsPlaceholder } from "@/components/ui/TestimonialsPlaceholder";
import { EmailSignup } from "@/components/email/EmailSignup";
import { Wordmark } from "@/components/brand/Logo";
import {
  OrganizationJsonLd,
  WebSiteJsonLd,
} from "@/components/seo/OrganizationJsonLd";

const trustPoints = [
  {
    title: "Independent by design",
    body: "Editorial priorities come first. Affiliate relationships are disclosed and never rewrite the science.",
  },
  {
    title: "Evidence over hype",
    body: "We summarize research context, note limitations, and avoid miracle claims or fabricated citations.",
  },
  {
    title: "Built for researchers",
    body: "Clear structure, careful language, and practical quality considerations — not supplement-store copy.",
  },
];

const approachSteps = [
  {
    step: "01",
    title: "Map the literature",
    body: "Identify primary study themes, mechanisms discussed, and where evidence remains preliminary.",
  },
  {
    step: "02",
    title: "Separate signal from noise",
    body: "Highlight study design limits, translational gaps, and claims that exceed available data.",
  },
  {
    step: "03",
    title: "Support informed evaluation",
    body: "When commercial context appears, it follows education — as a logical research next step, not a pitch.",
  },
];

export function HomePage() {
  const featured = getFeaturedGuides(4);
  const latest = researchGuides.slice(0, 5);

  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute inset-0 animate-soft-in"
          aria-hidden="true"
          style={{ background: "var(--gradient-hero)" }}
        />
        <Container className="relative py-20 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="animate-fade-up flex justify-center">
              <Wordmark variant="compact" size="hero" />
            </div>
            <div
              className="mx-auto mt-8 h-px w-12 bg-border-strong"
              aria-hidden="true"
            />
            <h1 className="animate-fade-up-delay mt-8 text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.35rem] lg:leading-[1.1]">
              Evidence-Driven Research Guides for Modern Peptides
            </h1>
            <p className="animate-fade-up-delay-2 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Independent educational resources helping researchers understand
              the latest peptide science.
            </p>
            <div className="animate-fade-up-delay-2 mt-10 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href="/research" size="lg">
                Explore Research
              </ButtonLink>
              <ButtonLink href="/research#latest" variant="secondary" size="lg">
                Latest Articles
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured guides */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Featured"
            title="Featured research guides"
            description="Start with structured explainers designed for clarity, scientific caution, and long-term usefulness."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((guide) => (
              <ResearchCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </Container>
      </section>

      {/* Why trust */}
      <section className="border-y border-border bg-surface py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Trust"
            title="Why trust GRW Research"
            description="Every page is written to feel like a serious publication — scientific, objective, educational, and professional."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {trustPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-2xl border border-border bg-paper/60 p-6 shadow-brand-sm"
              >
                <div className="mb-4 h-1.5 w-10 rounded-full bg-gradient-to-r from-accent to-emerald" />
                <h3 className="text-lg font-semibold text-ink">{point.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Scientific approach */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Method"
            title="Scientific approach"
            description="We treat peptide education like a modern scientific journal briefing — structured, calm, and explicit about uncertainty."
          />
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {approachSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-border bg-surface p-6 shadow-brand-sm"
              >
                <p className="text-sm font-semibold text-accent">{item.step}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Latest articles */}
      <section
        id="latest"
        className="scroll-mt-24 border-y border-border bg-surface py-20 sm:py-24"
      >
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Library"
              title="Latest articles"
              description="Educational entries across the research library."
            />
            <ButtonLink href="/research" variant="secondary">
              View full library
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-3">
            {latest.map((guide) => (
              <Link
                key={guide.slug}
                href={guide.status === "published" ? guide.href : "/research"}
                className="flex flex-col justify-between gap-3 rounded-2xl border border-border bg-paper/50 px-5 py-4 transition-all hover:border-border-strong hover:bg-accent-soft/20 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="font-medium text-ink">{guide.title}</p>
                  <p className="mt-1 text-sm text-muted line-clamp-1">
                    {guide.excerpt}
                  </p>
                </div>
                <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-muted">
                  {guide.status === "published" ? "Published" : "Coming soon"}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <TestimonialsPlaceholder />

      {/* FAQ */}
      <section className="py-20 sm:py-24">
        <Container className="max-w-3xl">
          <FaqAccordion items={homeFaqs} />
        </Container>
      </section>

      {/* Newsletter */}
      <section className="border-t border-border bg-accent-soft/30 py-20 sm:py-24">
        <Container>
          <EmailSignup />
          <p className="mt-8 text-sm text-muted">
            Affiliate disclosure summary: some pages include affiliate links to
            merchant product information. If you use those links, we may earn a
            commission. This never changes our responsibility to separate
            education from commercial context.{" "}
            <Link
              href="/affiliate-disclosure"
              className="text-accent underline-offset-2 hover:underline"
            >
              Full affiliate disclosure
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
