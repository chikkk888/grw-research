import type { Metadata } from "next";
import { researchGuides } from "@/config/research-guides";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResearchCard } from "@/components/ui/ResearchCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Research Library",
  description:
    "Browse evidence-driven educational guides on research peptides including BPC-157, TB-500, CJC-1295, Ipamorelin, MOTS-c, GLP-1, and NAD+.",
  path: "/research",
});

export default function ResearchLibraryPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Research Library",
          description:
            "Educational research guides for modern peptides and related compounds.",
          url: absoluteUrl("/research"),
          isPartOf: {
            "@type": "WebSite",
            name: "GRW Research",
            url: absoluteUrl("/"),
          },
        }}
      />

      <section className="border-b border-border">
        <Container className="py-14 sm:py-20">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Research Library" },
            ]}
          />
          <SectionHeading
            className="mt-8"
            eyebrow="Library"
            title="Research Library"
            description="A curated set of educational guides for researchers exploring peptide science. Each card opens a structured explainer — not a product storefront."
          />
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {researchGuides.map((guide) => (
              <ResearchCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
