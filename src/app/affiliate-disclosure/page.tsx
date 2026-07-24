import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = buildMetadata({
  title: "Affiliate Disclosure",
  description: "How GRW Research handles affiliate relationships and commissions.",
  path: "/affiliate-disclosure",
});

export default function Page() {
  return (
    <Container className="prose-article py-14 sm:py-16">
      <h1 className="font-semibold tracking-tight text-4xl text-ink sm:text-5xl">Affiliate Disclosure</h1>
      <div className="mt-8 space-y-4">
        <h2 className="!mt-10 font-semibold tracking-tight text-2xl text-ink">Disclosure</h2>
        <p className="text-ink-soft">Some links on this website are affiliate links. If you click and purchase, GRW Marketing may earn a commission at no additional cost to you.</p>
        <h2 className="!mt-10 font-semibold tracking-tight text-2xl text-ink">Independence goals</h2>
        <p className="text-ink-soft">Affiliate relationships must not override educational integrity. We aim for recommendations that read like careful evaluations, not advertisements.</p>
        <h2 className="!mt-10 font-semibold tracking-tight text-2xl text-ink">Swiss Chems</h2>
        <p className="text-ink-soft">Swiss Chems is an affiliate partner. Some product-information links may earn GRW Marketing a commission. This website is not a Swiss Chems branded property, and educational content is not a purchase recommendation.</p>
        <h2 className="!mt-10 font-semibold tracking-tight text-2xl text-ink">How links work</h2>
        <p className="text-ink-soft">Affiliate destinations are managed centrally, use sponsored/nofollow relationship attributes, and can be disabled globally.</p>
        <h2 className="!mt-10 font-semibold tracking-tight text-2xl text-ink">Questions</h2>
        <p className="text-ink-soft">See also our <a href="/editorial-policy" className="text-accent underline-offset-2 hover:underline">editorial policy</a> and <a href="/terms" className="text-accent underline-offset-2 hover:underline">terms</a>.</p>
      </div>
    </Container>
  );
}
