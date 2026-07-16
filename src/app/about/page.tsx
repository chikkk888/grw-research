import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = buildMetadata({
  title: "About GRW Research",
  description:
    "Mission, editorial standards, scientific review process, transparency commitments, and affiliate disclosure for GRW Research.",
  path: "/about",
});

const sections = [
  {
    id: "mission",
    title: "Mission",
    body: [
      "GRW Research is the educational publication brand of GRW Marketing. Our mission is to publish evidence-driven research guides that help readers understand modern peptide science with clarity and restraint.",
      "We are building a trusted digital publication — closer to Examine or a modern scientific briefing than to a supplement storefront or affiliate funnel.",
    ],
  },
  {
    id: "editorial-standards",
    title: "Editorial standards",
    body: [
      "We prioritize careful language, explicit uncertainty, and source honesty. We do not fabricate studies, credentials, testimonials, prices, or laboratory results.",
      "Commercial context never rewrites educational conclusions. If evidence is weak, limited, or preliminary, we say so directly.",
    ],
  },
  {
    id: "scientific-review",
    title: "Scientific review process",
    body: [
      "Articles move through drafting, editorial review, and scientific review status labels. Content marked as draft or awaiting review remains provisional.",
      "When citations are included, they must be real, attributable, and presented without overstating what the evidence supports.",
    ],
  },
  {
    id: "transparency",
    title: "Transparency",
    body: [
      "Readers should always be able to identify who we are, what we cover, how we earn revenue, and where medical or legal boundaries apply.",
      "Trust pages — editorial policy, medical disclaimer, and affiliate disclosure — remain publicly accessible from every major surface of the site.",
    ],
  },
  {
    id: "affiliate-disclosure",
    title: "Affiliate disclosure",
    body: [
      "Some pages include affiliate links to merchant product information. If you use those links, GRW Marketing may earn a commission at no additional cost to you.",
      "Affiliate relationships support the publication; they do not convert educational guides into sales scripts. Recommendations, when present, should feel like a logical research next step after evidence context.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border">
        <Container className="py-14 sm:py-20">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "About" }]}
          />
          <SectionHeading
            className="mt-8"
            eyebrow="About"
            title="About GRW Research"
            description="Scientific. Objective. Educational. Professional. We establish trust before introducing any commercial context."
          />
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <div className="mx-auto max-w-3xl space-y-14">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <h2 className="text-2xl font-semibold tracking-tight text-ink">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="text-base leading-relaxed text-ink-soft"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <p className="text-sm text-muted">
            Related pages:{" "}
            <Link href="/editorial-policy" className="text-accent hover:underline">
              Editorial policy
            </Link>
            ,{" "}
            <Link
              href="/affiliate-disclosure"
              className="text-accent hover:underline"
            >
              Affiliate disclosure
            </Link>
            ,{" "}
            <Link href="/contact" className="text-accent hover:underline">
              Contact
            </Link>
            .
          </p>
        </div>
      </Container>
    </>
  );
}
