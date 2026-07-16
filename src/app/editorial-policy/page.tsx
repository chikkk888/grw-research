import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = buildMetadata({
  title: "Editorial Policy",
  description: "How GRW Research creates, reviews, updates, and corrects educational content.",
  path: "/editorial-policy",
});

export default function Page() {
  return (
    <Container className="prose-article py-14 sm:py-16">
      <h1 className="font-semibold tracking-tight text-4xl text-ink sm:text-5xl">Editorial Policy</h1>
      <div className="mt-8 space-y-4">
        <h2 className="!mt-10 font-semibold tracking-tight text-2xl text-ink">Mission</h2>
        <p className="text-ink-soft">Publish research-aware educational content that remains useful even without affiliate links.</p>
        <h2 className="!mt-10 font-semibold tracking-tight text-2xl text-ink">Standards</h2>
        <p className="text-ink-soft">• Prefer primary sources and clearly labeled uncertainty</p>
        <p className="text-ink-soft">• Separate educational information from commercial recommendations</p>
        <p className="text-ink-soft">• Never invent citations, credentials, or outcomes</p>
        <p className="text-ink-soft">• Mark drafts distinctly until editorial and scientific review are complete</p>
        <h2 className="!mt-10 font-semibold tracking-tight text-2xl text-ink">How products are evaluated</h2>
        <p className="text-ink-soft">Product and vendor pages use structured criteria: documentation quality, transparency, policies, research-use clarity, and limitations. We do not publish positive or negative conclusions without evidence.</p>
        <h2 className="!mt-10 font-semibold tracking-tight text-2xl text-ink">Research methodology</h2>
        <p className="text-ink-soft">We prioritize study design clarity, endpoint relevance, and conflicts of interest. Mechanistic findings are not treated as consumer proof.</p>
        <h2 className="!mt-10 font-semibold tracking-tight text-2xl text-ink">Corrections policy</h2>
        <p className="text-ink-soft">Factual errors are corrected as soon as practical. Substantial corrections are noted on the page with an updated date. Contact us via the <a href="/contact" className="text-accent underline-offset-2 hover:underline">contact page</a>.</p>
        <h2 className="!mt-10 font-semibold tracking-tight text-2xl text-ink">Reviewer process</h2>
        <p className="text-ink-soft">Articles can include a reviewer profile. Placeholder reviewer profiles must remain labeled until a real reviewer is assigned.</p>
      </div>
    </Container>
  );
}
