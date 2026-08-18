import type { Metadata } from "next";
import Link from "next/link";
import { getRelatedGuides } from "@/config/research-guides";
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
  { id: "where-to-purchase", label: "Merchant listings" },
  { id: "faq", label: "FAQ" },
  { id: "safety", label: "Safety considerations" },
  { id: "order-checklist", label: "6 questions before you order" },
  { id: "comparison", label: "BPC-157 vs TB-500" },
  { id: "disclaimer", label: "Disclaimer" },
];

const faqs = [
  {
    question: "What is BPC-157, chemically?",
    answer:
      "BPC-157 is a synthetic pentadecapeptide: a 15-amino-acid sequence related to a portion of Body Protection Compound, a gastric protein described in early literature. The 15-residue research compound is not the same as that parent material.",
  },
  {
    question: "Is BPC-157 approved for human use?",
    answer:
      "Regulatory status varies by jurisdiction and changes over time. GRW Research does not present BPC-157 as an approved therapy. Readers should verify current regulations and treat this page as educational research context only.",
  },
  {
    question: "Is BPC-157 the same as TB-500?",
    answer:
      "No. They are different peptides with different sequences and literatures. They are often discussed together, and some merchants sell blends, but a combined listing does not combine the evidence.",
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
      "Use the six-question order checklist on this page: compound identity, batch-matched testing docs, research-use labeling, handling clarity, and verifiable merchant policies. Always confirm documents directly with the merchant.",
  },
];

const orderQuestions = [
  {
    question: "Does the listing identify the correct compound?",
    answer:
      "The product should be described as BPC-157 — the 15-amino-acid synthetic pentadecapeptide — not a vague “recovery peptide” label or an undisclosed blend. If the page also sells BPC/TB stacks, check that you are evaluating the standalone SKU you intend to compare.",
  },
  {
    question: "Is there third-party testing documentation for this batch?",
    answer:
      "Look for a certificate of analysis (COA) or equivalent report from an identifiable laboratory, tied to the batch you would receive. Marketing lines like “99% purity” without a linked report are not a substitute for documentation you can open and read.",
  },
  {
    question: "Does the COA match the product on the page?",
    answer:
      "Batch number, compound name, and test date should align with the listing. A generic COA screenshot reused across products, or a document that cannot be matched to the SKU in your cart, is a common weak point.",
  },
  {
    question: "Is research-use labeling and product identification clear?",
    answer:
      "Reputable research-chemical listings typically state research-use-only context, show format (lyophilized vial, capsule, etc.), and identify the compound without implying approved therapeutic use.",
  },
  {
    question: "Are shipping, storage, and handling explained?",
    answer:
      "Lyophilized peptides and capsule formats carry different handling expectations. The listing or merchant FAQ should address storage guidance and shipping practices clearly enough that you are not guessing after checkout.",
  },
  {
    question: "Can you verify merchant policies independently?",
    answer:
      "Contact paths, refund or reship terms, and testing policies should be findable on the merchant site — not only in ad copy. If documentation, policies, and product pages contradict each other, treat that as a stop signal.",
  },
];

const orderRedFlags = [
  "Purity or identity claims with no batch-specific COA linked",
  "COA image that cannot be matched to the SKU or batch you are buying",
  "No named third-party laboratory on the testing document",
  "Compound described in outcome language (heals, cures, FDA approved)",
  "Blend or fragment sold under the BPC-157 name without sequence clarity",
  "Merchant policies missing, contradictory, or only visible in checkout fine print",
];

const comparisonRows = [
  {
    criterion: "Identity",
    bpc: "15-amino-acid synthetic peptide (pentadecapeptide)",
    tb: "43-amino-acid thymosin β-4 analogue; the TB-500 name is also used for a 7-residue fragment",
  },
  {
    criterion: "Typical research themes",
    bpc: "Tissue signaling in preclinical models",
    tb: "Actin dynamics, cell migration, cytoskeletal organization",
  },
  {
    criterion: "Evidence maturity",
    bpc: "Mostly preclinical; human certainty remains limited",
    tb: "Mostly preclinical; human Tβ4 work does not automatically apply to every TB-500 listing",
  },
  {
    criterion: "First quality check",
    bpc: "Sequence, testing documents, research-use labeling",
    tb: "Analogue vs fragment, mass/CAS, then testing documents",
  },
];

const related = getRelatedGuides("bpc-157");

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
          dateModified: "2026-08-17",
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
                Review product information
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
                BPC-157 is a synthetic pentadecapeptide: a 15-amino-acid
                sequence related to a portion of Body Protection Compound, a
                gastric protein described in early literature. In
                educational contexts, it is best understood as a research
                compound with a growing preclinical literature — not as a proven
                clinical therapy.
              </p>
              <p>
                Online coverage often compresses that distinction, and often
                overstates how far animal and cell findings can be translated.
                This guide prioritizes calm framing: what is commonly studied,
                what mechanisms are hypothesized, and where confidence should
                remain limited.
              </p>
              <p>
                BPC-157 is often discussed alongside{" "}
                <Link href="/research/tb-500">TB-500</Link>, a thymosin β-4
                analogue. They are different peptides with different sequences.
                A blend listing does not merge the evidence bases.
              </p>
            </section>

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
                  Research themes often involve tissue signaling in preclinical
                  settings.
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
                BPC-157 is the 15-residue synthetic sequence, not the larger
                parent material from which that sequence was drawn. Proposed
                mechanisms in research discussions often involve cellular
                signaling associated with tissue homeostasis in experimental
                models. Those hypotheses are useful for orientation. Mechanism
                talk is not proof of outcome.
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
              primaryHref="#current-evidence"
              primaryLabel="Continue to the evidence"
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
                Two starting points in the published record, not a complete
                bibliography:
              </p>
              <ul>
                <li>
                  Sikiric P, Seiwerth S, Rucman R, et al. Stable gastric
                  pentadecapeptide BPC 157: novel therapy in gastrointestinal
                  tract.{" "}
                  <em>Current Pharmaceutical Design</em>. 2011;17(16):1612-1632.{" "}
                  <a
                    href="https://pubmed.ncbi.nlm.nih.gov/21548867/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PubMed 21548867
                  </a>
                  . A review from the originating research group; the title’s
                  “therapy” language is theirs, not a GRW conclusion.
                </li>
                <li>
                  Chang CH, Tsai WC, Lin MS, Hsu YH, Pang JHS. The promoting
                  effect of pentadecapeptide BPC 157 on tendon healing involves
                  tendon outgrowth, cell survival, and cell migration.{" "}
                  <em>Journal of Applied Physiology</em>. 2011;110(3):774-780.{" "}
                  <a
                    href="https://pubmed.ncbi.nlm.nih.gov/21030672/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PubMed 21030672
                  </a>
                  . Ex vivo / in vitro fibroblast work — not human clinical
                  proof. The title’s “healing” language is the authors’, not a
                  GRW conclusion.
                </li>
              </ul>
              <p>
                Citing papers is not an efficacy claim. Much of the BPC-157
                literature is preclinical and concentrated in a small set of
                labs; independent replication and high-quality human data remain
                limited.
              </p>
            </section>

            <section id="where-to-purchase" className="scroll-mt-28">
              <h2>Evaluating merchant listings</h2>
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

            <div className="not-prose" id="merchant-documentation">
              <CtaCard
                eyebrow="Affiliate-supported documentation link"
                title="Open the Swiss Chems BPC-157 listing"
                body="Review testing materials, research-use terms, shipping details, and product format before making any independent decision. Use the six-question checklist below if you want a verification walkthrough first."
                primaryHref={affiliateHref ?? "/affiliate-disclosure"}
                primaryLabel={
                  affiliateHref
                    ? "View Swiss Chems product information"
                    : "Affiliate links currently disabled"
                }
                secondaryHref="#order-checklist"
                secondaryLabel="6 questions before you order"
                externalPrimary={Boolean(affiliateHref)}
                tone="emerald"
              >
                <p className="mt-3 text-xs text-muted">
                  Affiliate partner: Swiss Chems. Disclosed affiliate link. GRW
                  Research is independent and not a Swiss Chems storefront.{" "}
                  <Link
                    href="/affiliate-disclosure"
                    className="underline underline-offset-2"
                  >
                    Affiliate disclosure
                  </Link>
                  .
                </p>
              </CtaCard>
            </div>

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

            {/* Order checklist */}
            <section id="order-checklist" className="scroll-mt-28">
              <h2>6 questions before you order</h2>
              <p>
                Before you evaluate any BPC-157 listing — including affiliate
                links from this site — run through these six questions. They are
                the same checkpoints researchers use when comparing COAs,
                batches, and merchant documentation.
              </p>
              <ol>
                {orderQuestions.map((item) => (
                  <li key={item.question}>
                    <strong>{item.question}</strong>
                    <p>{item.answer}</p>
                  </li>
                ))}
              </ol>
              <h3>Red flags to skip fast</h3>
              <p>
                If you see several of the patterns below, compare another
                listing before checkout:
              </p>
              <ul>
                {orderRedFlags.map((flag) => (
                  <li key={flag}>{flag}</li>
                ))}
              </ul>
              <p>
                This checklist is educational. It does not certify any merchant
                and is not a guarantee of product quality. Verify every document
                on the merchant site before an independent purchase decision.
                The disclosed Swiss Chems listing is in{" "}
                <a href="#where-to-purchase">Evaluating merchant listings</a>{" "}
                above.
              </p>
            </section>

            {/* Comparison */}
            <section id="comparison" className="not-prose scroll-mt-28 mt-12">
              <h2 className="text-3xl font-semibold tracking-tight text-ink">
                BPC-157 and TB-500
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">
                Educational comparison only — not a ranking, stack, or protocol.
                See the{" "}
                <Link href="/research/tb-500" className="text-accent hover:underline">
                  TB-500 guide
                </Link>{" "}
                for analogue versus fragment identity.
              </p>
              <div className="mt-6">
                <ComparisonTable
                  caption="BPC-157 vs TB-500 (educational framing)"
                  columns={[
                    { key: "criterion", label: "Criterion" },
                    { key: "bpc", label: "BPC-157" },
                    { key: "tb", label: "TB-500" },
                  ]}
                  rows={comparisonRows}
                />
              </div>
            </section>

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
                      href="/research/tb-500"
                      className="text-accent hover:underline"
                    >
                      TB-500 guide
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
