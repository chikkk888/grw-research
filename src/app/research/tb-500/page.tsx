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
  title: "TB-500 Research Guide",
  description:
    "Independent educational overview of TB-500 and thymosin β-4 analogues: how the name is used, how the 17–23 fragment differs, evidence limits, and quality checks for researchers.",
  path: "/research/tb-500",
  type: "article",
});

const toc = [
  { id: "what-is-tb-500", label: "What is TB-500?" },
  { id: "naming", label: "Naming and identity" },
  { id: "research-overview", label: "Research overview" },
  { id: "mechanism", label: "Mechanism" },
  { id: "current-evidence", label: "Current evidence" },
  { id: "faq", label: "FAQ" },
  { id: "safety", label: "Safety considerations" },
  { id: "quality", label: "Quality considerations" },
  { id: "comparison", label: "TB-500 vs BPC-157" },
  { id: "where-to-purchase", label: "Merchant listings" },
  { id: "disclaimer", label: "Disclaimer" },
];

const faqs = [
  {
    question: "Is TB-500 the same as thymosin β-4?",
    answer:
      "Not reliably. Thymosin β-4 is a 43-amino-acid peptide. Some research-chemical listings use “TB-500” for a synthetic 43-amino-acid analogue of that peptide. Analytical literature has also identified commercial material sold as TB-500 as a much shorter acetylated 17–23 fragment. Always check sequence, molecular weight, and CAS — not the marketing name.",
  },
  {
    question: "Is TB-500 the same as BPC-157?",
    answer:
      "No. They are different peptides with different sequences and literatures. They are often discussed together, and some merchants sell blends, but a combined listing does not combine the evidence. See the BPC-157 guide for that compound.",
  },
  {
    question: "Is TB-500 approved for human use?",
    answer:
      "Regulatory status varies by jurisdiction and changes over time. GRW Research does not present TB-500 or thymosin β-4 analogues as approved therapies. Treat this page as educational research context only.",
  },
  {
    question: "Can this guide tell me how to dose TB-500?",
    answer:
      "No. We do not provide dosing, administration, stacking, or treatment protocols. Educational content here is intended to improve research literacy — not to guide personal use.",
  },
  {
    question: "Why is the 17–23 fragment cheaper?",
    answer:
      "It is a different, much smaller molecule (seven amino acids versus 43). Price is not a discount on “the same TB-500.” A cheaper fragment listing is not interchangeable with a full-length analogue listing.",
  },
  {
    question: "Why include affiliate links?",
    answer:
      "Some researchers evaluate commercial documentation after reading the science. When we include a merchant link, it is disclosed as affiliate-supported and positioned after educational context — never as medical endorsement.",
  },
  {
    question: "How should researchers think about purity and testing?",
    answer:
      "Start with identity: analogue versus fragment, then molecular weight and CAS. After that, look for batch-level third-party testing, research-use labeling, and handling information. Always verify documents directly with the merchant.",
  },
];

const namingRows = [
  {
    criterion: "Typical identity",
    analogue: "43-amino-acid thymosin β-4 analogue",
    fragment: "Acetylated 17–23 heptapeptide (Ac-LKKTETQ)",
  },
  {
    criterion: "Approximate mass",
    analogue: "~4,963 Da",
    fragment: "~889 Da",
  },
  {
    criterion: "What the name “TB-500” may mean",
    analogue: "Vendor catalogues often use TB-500 for this analogue",
    fragment: "Anti-doping / analytical papers have identified some TB-500 products as this fragment",
  },
  {
    criterion: "Research implication",
    analogue: "Closer in size to the parent peptide discussed in much of the Tβ4 literature",
    fragment: "Isolated actin-binding motif; not the full peptide",
  },
];

const comparisonRows = [
  {
    criterion: "Identity",
    tb: "43-amino-acid thymosin β-4 analogue; the TB-500 name is also used for a 7-residue fragment",
    bpc: "15-amino-acid synthetic peptide (pentadecapeptide)",
  },
  {
    criterion: "Typical research themes",
    tb: "Actin dynamics, cell migration, cytoskeletal organization",
    bpc: "Tissue signaling in preclinical models",
  },
  {
    criterion: "Evidence maturity",
    tb: "Mostly preclinical; human Tβ4 work does not automatically apply to every TB-500 listing",
    bpc: "Mostly preclinical; human certainty remains limited",
  },
  {
    criterion: "First quality check",
    tb: "Analogue vs fragment, mass/CAS, then testing documents",
    bpc: "Sequence, testing documents, research-use labeling",
  },
];

const related = getRelatedGuides("tb-500");

export default function Tb500Page() {
  const affiliateHref = buildAffiliateUrl("swiss-chems", "swiss-chems-tb-500");

  return (
    <>
      <ReadingProgress />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "TB-500 Research Guide",
          description:
            "Independent educational overview of TB-500, thymosin β-4 analogues, and the 17–23 fragment naming problem.",
          author: {
            "@type": "Organization",
            name: "GRW Research",
          },
          publisher: {
            "@type": "Organization",
            name: "GRW Research",
            url: absoluteUrl("/"),
          },
          mainEntityOfPage: absoluteUrl("/research/tb-500"),
          datePublished: "2026-08-17",
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
              name: "TB-500",
              item: absoluteUrl("/research/tb-500"),
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
              { label: "TB-500" },
            ]}
          />
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Research compound guide
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              TB-500: Evidence-Oriented Research Overview
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              An independent educational guide covering what “TB-500” usually
              refers to, how that name diverges from the 17–23 fragment, how
              thymosin β-4 is discussed in literature, and what identity checks
              researchers typically run before evaluating a listing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#naming">Naming and identity</ButtonLink>
              <ButtonLink href="#merchant-documentation" variant="secondary">
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
        <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_16.5rem]">
          <article className="prose-article min-w-0 max-w-full">
            <section id="what-is-tb-500" className="scroll-mt-28">
              <h2>What is TB-500?</h2>
              <p>
                In research-chemical catalogues, TB-500 most often labels a
                synthetic 43-amino-acid analogue of thymosin β-4 (Tβ4), a
                naturally occurring actin-binding peptide. That is the compound
                discussed on this page when we refer to a full-length analogue.
              </p>
              <p>
                The name is not a chemical identifier. Some products sold as
                TB-500 have been characterized as a seven-residue fragment of
                Tβ4 (residues 17–23), not the 43-residue parent peptide. Those
                are different molecules. Online summaries that treat every
                “TB-500” listing as interchangeable with native thymosin β-4
                are compressing that distinction away.
              </p>
              <p>
                TB-500 is frequently mentioned alongside{" "}
                <Link href="/research/bpc-157">BPC-157</Link>. They are
                different peptides with different literatures. A combined
                product listing does not merge the evidence bases.
              </p>
            </section>

            <section id="naming" className="not-prose scroll-mt-28 mt-12">
              <h2 className="text-3xl font-semibold tracking-tight text-ink">
                Naming and identity: analogue vs fragment
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">
                This is the main literacy problem in TB-500 coverage. Confirm
                identity from sequence, mass, and CAS — then read claims
                against that identity.
              </p>
              <div className="mt-6">
                <ComparisonTable
                  caption="Two things sold under overlapping TB-500 labels"
                  columns={[
                    { key: "criterion", label: "Check" },
                    { key: "analogue", label: "Full-length analogue" },
                    { key: "fragment", label: "Fragment (17–23)" },
                  ]}
                  rows={namingRows}
                />
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
                Analytical work on a commercial TB-500 product (Esposito et al.,{" "}
                <em>Drug Testing and Analysis</em>, 2012) identified
                N-acetylated Tβ4(17–23), not the full 43-residue peptide. That
                paper is about product identity in the marketplace — not a
                reason to assume every current listing is the fragment, and not
                a reason to assume every listing is the analogue.
              </p>
            </section>

            <div className="not-prose" id="merchant-documentation">
              <CtaCard
                eyebrow="Affiliate-supported documentation link"
                title="Review TB-500 (thymosin β-4 analogue) product information"
                body="The linked Swiss Chems listing is the 0.5 mg capsule, 60-count thymosin β-4 analogue listing. After the identity overview above, you can review testing documentation, research-use notices, and product details. Education remains primary."
                primaryHref={affiliateHref ?? "/affiliate-disclosure"}
                primaryLabel={
                  affiliateHref
                    ? "View Swiss Chems product information"
                    : "Affiliate links currently disabled"
                }
                secondaryHref="#current-evidence"
                secondaryLabel="Continue reading the evidence"
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

            <section id="research-overview" className="scroll-mt-28">
              <h2>Research overview</h2>
              <p>
                Thymosin β-4 has a substantial preclinical literature around
                actin sequestration and cell-migration models. Human and
                translational work, where it exists, generally involves the
                parent peptide or closely specified analogues — not commercial
                products identified only by the TB-500 trade name.
              </p>
              <ul>
                <li>
                  Research themes often involve G-actin binding, cytoskeletal
                  organization, and related signaling in experimental systems.
                </li>
                <li>
                  Popular outcome and performance narratives usually outrun
                  what commercial research-chemical listings can honestly
                  support.
                </li>
                <li>
                  Study quality, endpoints, and whether the test article matches
                  a given vendor product all vary widely.
                </li>
              </ul>
              <p>
                A responsible reading posture: map claims to a defined molecule,
                then ask whether the cited studies used that molecule.
              </p>
            </section>

            <section id="mechanism" className="scroll-mt-28">
              <h2>Mechanism</h2>
              <p>
                Tβ4’s best-characterized biochemical role is binding monomeric
                G-actin via a conserved motif (LKKTET, residues 17–23), which
                influences actin polymerization dynamics. That motif is why the
                short fragment exists as a research tool: to test whether a
                given effect needs the whole peptide or can be reproduced by
                the isolated binding region.
              </p>
              <p>
                Mechanism language is orientation, not proof of outcome. When a
                source jumps from “actin-binding motif” to guaranteed tissue or
                performance results, treat that as a credibility warning —
                especially on commercial pages.
              </p>
            </section>

            <CtaCard
              eyebrow="Research checkpoint"
              title="The fragment is a motif, not a shortcut to the parent literature"
              body="If a listing is 17–23, do not borrow full-length Tβ4 study claims. If a listing is a 43-residue analogue, still confirm that cited papers used a matching test article."
              primaryHref="#quality"
              primaryLabel="See quality considerations"
              tone="default"
            />

            <section id="current-evidence" className="scroll-mt-28">
              <h2>Current evidence</h2>
              <p>
                Grade evidence by design quality, the identity of the test
                article, endpoints, and reproducibility — not by how often
                TB-500 appears next to BPC-157 in forums.
              </p>
              <ol>
                <li>
                  Preclinical Tβ4 work with varying rigor and translational
                  relevance
                </li>
                <li>
                  Limited, uneven human certainty — and it is easy to mis-cite
                  Tβ4 papers against a fragment listing
                </li>
                <li>
                  Marketplace identity papers showing that the label “TB-500”
                  has not always matched the 43-residue peptide
                </li>
              </ol>
              <p>
                Two starting points in the published record, not a complete
                bibliography:
              </p>
              <ul>
                <li>
                  Safer D, Elzinga M, Nachmias VT. Thymosin β4 and Fx, an
                  actin-sequestering peptide, are indistinguishable.{" "}
                  <em>Journal of Biological Chemistry</em>. 1991;266(7):4029-4032.{" "}
                  <a
                    href="https://pubmed.ncbi.nlm.nih.gov/1999398/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PubMed 1999398
                  </a>
                  . Foundational biochemistry of native Tβ4 — not a commercial
                  TB-500 listing.
                </li>
                <li>
                  Esposito S, Deventer K, Goeman J, Van der Eycken J, Van Eenoo
                  P. Synthesis and characterization of the N-terminal
                  acetylated 17–23 fragment of thymosin beta 4 identified in
                  TB-500.{" "}
                  <em>Drug Testing and Analysis</em>. 2012;4(9):733-738.{" "}
                  <a
                    href="https://pubmed.ncbi.nlm.nih.gov/22962027/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PubMed 22962027
                  </a>
                  . Marketplace identity: one analyzed TB-500 product was the
                  short fragment, not the 43-residue peptide.
                </li>
              </ul>
              <p>
                Citing papers is not an efficacy claim. Tβ4 biochemistry and a
                given vendor’s TB-500 SKU are easy to conflate; match the test
                article before importing results.
              </p>
            </section>

            <div className="not-prose mt-12">
              <FaqAccordion items={faqs} />
            </div>

            <section id="safety" className="scroll-mt-28">
              <h2>Safety considerations</h2>
              <p>
                Safety discussions online are frequently incomplete and often
                assume a molecule the bottle may not contain. From an
                educational standpoint, separate:
              </p>
              <ul>
                <li>What has been reported for specified Tβ4 preparations</li>
                <li>
                  What remains unknown for a given commercial analogue or
                  fragment listing
                </li>
                <li>
                  Legal, institutional, and sport-anti-doping constraints that
                  may apply to research-use materials
                </li>
              </ul>
              <p>
                This page does not provide safety clearance for personal use.
                Institutional review, applicable regulations, and primary
                literature remain essential.
              </p>
            </section>

            <section id="quality" className="scroll-mt-28">
              <h2>Quality considerations</h2>
              <p>
                For TB-500, identity is the first quality check. Marketing
                names collide; certificates should not.
              </p>
              <ul>
                <li>
                  Sequence / identity: 43-residue analogue versus 7-residue
                  17–23 fragment
                </li>
                <li>
                  Molecular weight and CAS consistent with that identity (not
                  copied from a different listing)
                </li>
                <li>
                  Third-party testing documentation for the batch you are
                  evaluating
                </li>
                <li>Clear research-use labeling and product identification</li>
                <li>Shipping, storage, and handling information clarity</li>
              </ul>
            </section>

            <section id="comparison" className="not-prose scroll-mt-28 mt-12">
              <h2 className="text-3xl font-semibold tracking-tight text-ink">
                TB-500 vs BPC-157
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">
                Educational comparison only — not a ranking, stack, or protocol.
                See the{" "}
                <Link href="/research/bpc-157" className="text-accent hover:underline">
                  BPC-157 guide
                </Link>{" "}
                for the companion peptide.
              </p>
              <div className="mt-6">
                <ComparisonTable
                  caption="TB-500 vs BPC-157 (educational framing)"
                  columns={[
                    { key: "criterion", label: "Criterion" },
                    { key: "tb", label: "TB-500" },
                    { key: "bpc", label: "BPC-157" },
                  ]}
                  rows={comparisonRows}
                />
              </div>
            </section>

            <section id="where-to-purchase" className="scroll-mt-28">
              <h2>Evaluating merchant listings</h2>
              <p>
                After the identity checks above, some readers evaluate
                merchant documentation for research-use materials. GRW Research
                may earn a commission through disclosed affiliate relationships
                when you use certain links.
              </p>
              <p>
                The listing we point to is Swiss Chems’ TB-500 0.5 mg capsule,
                60-count thymosin β-4 analogue listing. Review testing
                materials, confirm research-use terms, and treat any purchase
                decision as independent of this educational content.
              </p>
            </section>

            <div className="not-prose">
              <CtaCard
                eyebrow="Still evaluating documentation?"
                title="Open the Swiss Chems TB-500 analogue listing"
                body="Return to the merchant page to review identity details, testing materials, research-use terms, shipping, and capsule format before making any independent decision."
                primaryHref={affiliateHref ?? "/affiliate-disclosure"}
                primaryLabel={
                  affiliateHref
                    ? "View Swiss Chems product information"
                    : "Affiliate links currently disabled"
                }
                secondaryHref="/affiliate-disclosure"
                secondaryLabel="Read disclosure"
                externalPrimary={Boolean(affiliateHref)}
                tone="emerald"
              >
                <p className="mt-3 text-xs text-muted">
                  Disclosed affiliate link. We may earn a commission at no extra
                  cost to you.
                </p>
              </CtaCard>
            </div>

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
                      href="/research/bpc-157"
                      className="text-accent hover:underline"
                    >
                      BPC-157 guide
                    </Link>
                  </li>
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
