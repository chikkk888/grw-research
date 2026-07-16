import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = buildMetadata({
  title: "Medical Disclaimer",
  description: "Important limitations: GRW Research content is educational and not medical advice.",
  path: "/medical-disclaimer",
});

export default function Page() {
  return (
    <Container className="prose-article py-14 sm:py-16">
      <h1 className="font-semibold tracking-tight text-4xl text-ink sm:text-5xl">Medical Disclaimer</h1>
      <div className="mt-8 space-y-4">
        <h2 className="!mt-10 font-semibold tracking-tight text-2xl text-ink">Not medical advice</h2>
        <p className="text-ink-soft">Content on this website is for educational and informational purposes only. It is not medical advice, diagnosis, or treatment.</p>
        <h2 className="!mt-10 font-semibold tracking-tight text-2xl text-ink">No approved-treatment implications</h2>
        <p className="text-ink-soft">We do not present research chemicals as approved treatments. Nothing on this site should be interpreted as a claim that products diagnose, cure, treat, or prevent disease.</p>
        <h2 className="!mt-10 font-semibold tracking-tight text-2xl text-ink">Seek qualified care</h2>
        <p className="text-ink-soft">Speak with a licensed clinician for personal health decisions. Do not delay professional care because of something you read here.</p>
        <h2 className="!mt-10 font-semibold tracking-tight text-2xl text-ink">Evidence limitations</h2>
        <p className="text-ink-soft">Emerging research may be incomplete, conflicting, or not applicable to individuals. Draft pages may include placeholders marked “[Scientific reference required]”.</p>
      </div>
    </Container>
  );
}
