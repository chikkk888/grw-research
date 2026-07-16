import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description:
    "Terms of Use placeholder for GRW Research. Final legal language pending counsel review.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Container className="py-14 sm:py-20">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Terms" }]}
      />
      <h1 className="mt-8 text-4xl font-semibold tracking-tight text-ink">
        Terms of Use
      </h1>
      <div className="mt-8 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
        <p>
          This is a placeholder Terms of Use page for the GRW Research MVP.
          Replace with counsel-reviewed terms before public launch.
        </p>
        <p>
          Expected topics include acceptable use, educational-content
          disclaimers, intellectual property, limitation of liability, affiliate
          relationship notices, and governing law.
        </p>
        <p>
          Nothing on GRW Research is medical advice. Research compound
          discussions are educational and may reference materials with legal
          restrictions.
        </p>
      </div>
    </Container>
  );
}
