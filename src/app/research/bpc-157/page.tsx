import type { Metadata } from "next";
import Link from "next/link";
import { researchGuides } from "@/config/research-guides";
import { buildAffiliateUrl } from "@/config/affiliates";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CtaCard } from "@/components/ui/CtaCard";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { ComparisonTable } from "@/components/ui/ComparisonTable";
import { StickySidebar } from "@/components/ui/StickySidebar";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { AuthorCard } from "@/components/ui/AuthorCard";
import { RelatedArticles } from "@/components/ui/RelatedArticles";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "BPC-157 Research Guide",
  description:
    "Independent educational overview of BPC-157 research: mechanisms discussed in literature, evidence quality, safety considerations, and how researchers evaluate sourcing.",
  path: "/research/bpc-157",
  type: "article",
});

const toc = [
  { id: "what-is-bpc-157", label: "What is BPC-157?" },
  { id: "research-overview", label: "Research overview" },
  { id: "mechanism", label: "Mechanism" },
  { id: "current-evidence", label: "Current evidence" },
  { id: "faq", label: "FAQ" },
  { id: "safety", label: "Safety considerations" },
  { id: "quality", label: "Quality considerations" },
  { id: "comparison", label: "Comparison" },
  { id: "where-to-purchase", label: "Where researchers purchase" },
  { id: "disclaimer", label: "Disclaimer" },
];

const faqs = [
  {
    question: "Is BPC-157 approved for human use?",
    answer:
      "Regulatory status varies by jurisdiction and changes over time. GRW Research does not present BPC-157 as an approved therapy. Readers should verify current regulations and treat this page as educational research context only.",
  },
  {
    question: "What does the research typically investigate?",
    answer:
      "Published literature often explores tissue-related pathways, cellular signaling themes, and preclinical models. Human evidence remains limited relative to online interest, and study designs vary widely in quality.",
  },
  {
    question: "Can this guide tell me how to dose BPC-157?",
    answer:
      "No. We do not provide dosing, administration, or treatment protocols. Educational content here is intended to improve research literacy — not to guide personal use.",
  },
  {
    question: "Why include affiliate links?",
    answer:
      "Some researchers evaluate commercial documentation after reading the science. When we include a merchant link, it is disclosed as affiliate-supported and positioned after educational context — never as medical endorsement.",
  },
  {
    question: "How should researchers think about purity and testing?",
    answer:
      "Common evaluation criteria include whether a vendor provides third-party testing documentation, clear research-use labeling, batch transparency, and shipping/handling clarity. Always verify documents directly with the merchant.",
  },
];

const comparisonRows = [
  {
    criterion: "Evidence maturity",
    bpc: "Mostly preclinical / early translational interest",
    notes: "Human clinical certainty remains limited",
  },
  {
    criterion: "Typical research framing",
    bpc: "Tissue pathway / repair-related hypotheses",
    notes: "Claims often exceed published certainty",
  },
  {
    criterion: "Educational priority",
    bpc: "Mechanism + evidence limits first",
    notes: "Commerce only after context",
  },
  {
    criterion: "Quality questions",
    bpc: "Testing docs, labeling, batch transparency",
    notes: "Verify merchant materials directly",
  },
];

const related = researchGuides.filter((g) => g.slug !== "bpc-157").slice(0, 4);

export default function Bpc157Page() {
  const affiliateHref = buildAffiliateUrl(
    "swiss-chems",
    "swiss-chems-bpc-157",
  );

  return (
    <>
      <ReadingProgress />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "BPC-157 Research Guide",
          description:
            "Independent educational overview of BPC-157 research for modern peptide science.",
          author: {
            "@type": "Organization",
            name: "GRW Research",
          },
          publisher: {
            "@type": "Organization",
            name: "GRW Research",
            url: absoluteUrl("/"),
          },
          mainEntityOfPage: absoluteUrl("/research/bpc-157"),
          datePublished: "2026-07-16",
          dateModified: "2026-07-16",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: absoluteUrl("/"),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Research Library",
              item: absoluteUrl("/research"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "BPC-157",
              item: absoluteUrl("/research/bpc-157"),
            },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{ background: "var(--gradient-hero)" }}
        />
        <Container className="relative py-14 sm:py-20">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Research Library", href: "/research" },
              { label: "BPC-157" },
            ]}
          />
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Research compound guide
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              BPC-157: Evidence-Oriented Research Overview
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              An independent educational guide covering what BPC-157 is, how it
              is discussed in research literature, where evidence remains
              uncertain, and what quality factors researchers typically evaluate.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#research-overview">Read the overview</ButtonLink>
              <ButtonLink href="#where-to-purchase" variant="secondary">
                Sourcing considerations
              </ButtonLink>
            </div>
            <p className="mt-6 rounded-xl border border-border bg-surface/80 px-4 py-3 text-sm text-muted backdrop-blur">
              Educational content only. Not medical advice. Not a treatment
              recommendation.{" "}
              <Link
                href="/medical-disclaimer"
                className="text-accent underline-offset-2 hover:underline"
              >
                Medical disclaimer
              </Link>
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16.5rem]">
          <article className="prose-article max-w-none">
            {/* What is */}
            <section id="what-is-bpc-157" className="scroll-mt-28">
              <h2>What is BPC-157?</h2>
              <p>
                BPC-157 is a synthetic peptide sequence frequently discussed in
                research communities interested in tissue-related pathways. In
                educational contexts, it is best understood as a research
                compound with a growing body of preclinical literature — not as
                a proven clinical therapy.
              </p>
              <p>
                Online coverage often compresses nuance. This guide prioritizes
                calm framing: what is commonly studied, what mechanisms are
                hypothesized, and where confidence should remain limited.
              </p>
            </section>

            <CtaCard
              title="Prefer structured education before commercial pages"
              body="Use this guide to understand research context first. Affiliate destinations, if used, should feel like documentation review — not impulse shopping."
              primaryHref="#current-evidence"
              primaryLabel="Review current evidence"
              secondaryHref="/affiliate-disclosure"
              secondaryLabel="Affiliate disclosure"
              tone="soft"
            />

            {/* Research overview */}
            <section id="research-overview" className="scroll-mt-28">
              <h2>Research overview</h2>
              <p>
                Interest in BPC-157 has grown faster than high-quality human
                evidence. Much of the publicly discussed literature involves
                animal models, cellular experiments, or mechanistic hypotheses
                that do not automatically translate to clinical certainty.
              </p>
              <ul>
                <li>
                  Research themes often involve tissue signaling and recovery
                  pathways discussed in preclinical settings.
                </li>
                <li>
                  Study quality, replication, and translational relevance vary
                  substantially.
                </li>
                <li>
                  Popular summaries frequently overstate confidence relative to
                  available data.
                </li>
              </ul>
              <p>
                A responsible reading posture treats BPC-157 research as an
                evolving evidence base with meaningful open questions.
              </p>
            </section>

            {/* Mechanism */}
            <section id="mechanism" className="scroll-mt-28">
              <h2>Mechanism</h2>
              <p>
                Proposed mechanisms in research discussions often relate to
                cellular signaling networks associated with tissue homeostasis
                and repair-related pathways. These hypotheses are useful for
                orientation, but mechanism talk is not proof of outcome.
              </p>
              <p>
                When evaluating any claim, ask: Was the pathway observed in a
                controlled model? Has it been replicated? Does the experimental
                context match the claim being made?
              </p>
            </section>

            <CtaCard
              eyebrow="Research checkpoint"
              title="Mechanism literacy reduces hype susceptibility"
              body="If a source jumps from pathway language to guaranteed outcomes, treat that as a credibility warning — especially on commercial pages."
              primaryHref="#quality"
              primaryLabel="See quality considerations"
              tone="default"
            />

            {/* Current evidence */}
            <section id="current-evidence" className="scroll-mt-28">
              <h2>Current evidence</h2>
              <p>
                Evidence should be graded by design quality, sample context,
                endpoints, and reproducibility — not by social media consensus.
                For BPC-157, researchers typically encounter:
              </p>
              <ol>
                <li>Preclinical studies with varying methodological rigor</li>
                <li>Limited and uneven human clinical certainty</li>
                <li>
                  Secondary summaries that may omit limitations or negative
                  findings
                </li>
              </ol>
              <p>
                GRW Research does not invent citations or present placeholder
                studies as verified outcomes. Where specific papers are later
                curated by editorial review, they will be listed with clear
                attribution and access links.
              </p>
            </section>

            {/* FAQ */}
            <div className="not-prose mt-12">
              <FaqAccordion items={faqs} />
            </div>

            {/* Safety */}
            <section id="safety" className="scroll-mt-28">
              <h2>Safety considerations</h2>
              <p>
                Safety discussions online are frequently incomplete. From an
                educational standpoint, researchers should separate three
                questions:
              </p>
              <ul>
                <li>What adverse findings have been reported in literature?</li>
                <li>
                  What remains unknown due to limited long-term human data?
                </li>
                <li>
                  What legal and institutional constraints apply to research-use
                  materials?
                </li>
              </ul>
              <p>
                This page does not provide safety clearance for personal use.
                Institutional review, applicable regulations, and primary
                literature remain essential.
              </p>
            </section>

            {/* Quality */}
            <section id="quality" className="scroll-mt-28">
              <h2>Quality considerations</h2>
              <p>
                When researchers evaluate commercial listings, documentation
                quality often matters more than marketing language. Common
                checkpoints include:
              </p>
              <ul>
                <li>Third-party testing documentation availability</li>
                <li>Clear research-use labeling and product identification</li>
                <li>Batch or certificate transparency where provided</li>
                <li>Shipping, storage, and handling information clarity</li>
                <li>Merchant policies that can be independently verified</li>
              </ul>
            </section>

            {/* Comparison */}
            <section id="comparison" className="not-prose scroll-mt-28 mt-12">
              <h2 className="text-3xl font-semibold tracking-tight text-ink">
                Comparison table placeholder
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">
                A structured comparison scaffold for editorial expansion. Values
                below are educational framing placeholders, not product rankings.
              </p>
              <div className="mt-6">
                <ComparisonTable
                  caption="BPC-157 research evaluation scaffold"
                  columns={[
                    { key: "criterion", label: "Criterion" },
                    { key: "bpc", label: "BPC-157 framing" },
                    { key: "notes", label: "Research note" },
                  ]}
                  rows={comparisonRows}
                />
              </div>
            </section>

            {/* Where to purchase */}
            <section id="where-to-purchase" className="scroll-mt-28">
              <h2>Where researchers purchase BPC-157</h2>
              <p>
                After understanding the research context, some readers evaluate
                merchant documentation for research-use materials. GRW Research
                may earn a commission through disclosed affiliate relationships
                when you use certain links.
              </p>
              <p>
                The recommendation posture is intentionally restrained: review
                testing materials, confirm research-use terms, and treat any
                purchase decision as independent of this educational content.
              </p>
            </section>

            <div className="not-prose">
              <CtaCard
                eyebrow="Affiliate-supported documentation link"
                title="Review BPC-157 product information"
                body="Open the merchant listing to evaluate available documentation, research-use notices, and product details. Education remains primary; this is a secondary evaluation step."
                primaryHref={affiliateHref ?? "/affiliate-disclosure"}
                primaryLabel={
                  affiliateHref
                    ? "View merchant product information"
                    : "Affiliate links currently disabled"
                }
                secondaryHref="/affiliate-disclosure"
                secondaryLabel="Read disclosure"
                externalPrimary={Boolean(affiliateHref)}
                tone="emerald"
              >
                <p className="mt-3 text-xs text-muted">
                  Partner placeholder: Swiss Chems. Destinations are configurable
                  and can be disabled via environment settings.
                </p>
              </CtaCard>
            </div>

            {/* Disclaimer */}
            <section id="disclaimer" className="scroll-mt-28">
              <h2>Disclaimer</h2>
              <p>
                This page is for educational and informational purposes only. It
                is not medical advice, a diagnosis, a treatment plan, or an
                encouragement to use any compound in humans. Research chemicals
                may be restricted. Always verify laws, institutional
                requirements, and primary sources.
              </p>
              <p>
                See also our{" "}
                <Link href="/medical-disclaimer">medical disclaimer</Link>,{" "}
                <Link href="/editorial-policy">editorial policy</Link>, and{" "}
                <Link href="/affiliate-disclosure">affiliate disclosure</Link>.
              </p>
            </section>

            <div className="not-prose mt-12 space-y-8">
              <AuthorCard
                name="GRW Editorial"
                role="Educational research desk"
                bio="GRW Research publishes evidence-aware explainers with explicit uncertainty, public disclosures, and a clear separation between education and commerce."
              />
              <RelatedArticles guides={related} />
            </div>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">
              <StickySidebar items={toc} />
              <div className="rounded-2xl border border-border bg-surface p-5 shadow-brand-sm">
                <p className="text-sm font-semibold text-ink">Quick links</p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link
                      href="/research"
                      className="text-accent hover:underline"
                    >
                      Research Library
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/affiliate-disclosure"
                      className="text-muted hover:text-ink"
                    >
                      Affiliate disclosure
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/medical-disclaimer"
                      className="text-muted hover:text-ink"
                    >
                      Medical disclaimer
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
