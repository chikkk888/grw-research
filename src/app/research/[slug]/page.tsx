import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getGuideBySlug,
  isDedicatedResearchSlug,
  researchGuides,
} from "@/config/research-guides";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return researchGuides
    .filter((guide) => !isDedicatedResearchSlug(guide.slug))
    .map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide || isDedicatedResearchSlug(guide.slug)) {
    return buildMetadata({
      title: "Research guide",
      description: "Educational peptide research guide.",
      path: `/research/${slug}`,
      noindex: true,
    });
  }

  return buildMetadata({
    title: guide.title,
    description: guide.excerpt,
    path: guide.href,
    noindex: guide.status !== "published",
  });
}

export default async function ResearchGuidePlaceholderPage({ params }: Props) {
  const { slug } = await params;
  if (isDedicatedResearchSlug(slug)) notFound();

  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  return (
    <Container className="py-14 sm:py-20">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Research Library", href: "/research" },
          { label: guide.compound },
        ]}
      />
      <div className="mx-auto mt-10 max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          Coming soon
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">
          {guide.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">
          {guide.excerpt}
        </p>
        <p className="mt-6 text-sm leading-relaxed text-muted">
          This educational guide is in progress. While we prepare the full
          research overview, explore our published BPC-157 guide or return to
          the research library.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/research/bpc-157">Read BPC-157 guide</ButtonLink>
          <ButtonLink href="/research" variant="secondary">
            Back to library
          </ButtonLink>
        </div>
        <p className="mt-10 text-sm text-muted">
          Questions?{" "}
          <Link href="/contact" className="text-accent hover:underline">
            Contact editorial
          </Link>
          .
        </p>
      </div>
    </Container>
  );
}
