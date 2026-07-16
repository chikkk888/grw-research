import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Privacy Policy placeholder for GRW Research. Final legal language pending counsel review.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <Container className="py-14 sm:py-20">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
      />
      <h1 className="mt-8 text-4xl font-semibold tracking-tight text-ink">
        Privacy Policy
      </h1>
      <div className="mt-8 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft">
        <p>
          This is a placeholder Privacy Policy for the GRW Research MVP. Replace
          this page with counsel-reviewed language before public launch.
        </p>
        <p>
          Topics to cover in the final version typically include: what data is
          collected, cookie/consent practices, analytics vendors, newsletter
          processing, affiliate click tracking, retention, and contact channels
          for privacy requests.
        </p>
        <p>
          Until finalized, treat analytics and email capture as development
          placeholders and keep consent tooling enabled.
        </p>
      </div>
    </Container>
  );
}
