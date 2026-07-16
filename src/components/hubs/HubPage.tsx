import Link from "next/link";
import type { Metadata } from "next";
import { getHub } from "@/config/hubs";
import { getArticlesByCategory, getAllArticles } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { EmailSignup } from "@/components/email/EmailSignup";

export function hubMetadata(slug: string): Metadata {
  const hub = getHub(slug);
  return buildMetadata({
    title: hub?.title ?? slug,
    description: hub?.description ?? "",
    path: `/${slug}`,
  });
}

export function HubPage({ slug }: { slug: string }) {
  const hub = getHub(slug);
  const direct = getArticlesByCategory(slug);
  const related = getAllArticles()
    .filter(
      (article) =>
        article.category !== slug &&
        hub?.relatedCategories.some(
          (category) =>
            article.category === category || article.tags.includes(category),
        ),
    )
    .slice(0, 6);

  if (!hub) {
    return (
      <Container className="py-16">
        <h1 className="font-semibold tracking-tight text-4xl">Hub not found</h1>
      </Container>
    );
  }

  return (
    <Container className="py-14 sm:py-16">
      <p className="text-xs font-medium uppercase tracking-wide text-accent">
        Topic hub
      </p>
      <h1 className="mt-3 font-semibold tracking-tight text-4xl text-ink sm:text-5xl">
        {hub.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
        {hub.description}
      </p>

      <section className="mt-12">
        <h2 className="font-semibold tracking-tight text-2xl text-ink">
          {direct.length ? "Guides in this hub" : "Guides coming soon"}
        </h2>
        {direct.length ? (
          <ul className="mt-5 grid gap-3">
            {direct.map((article) => (
              <li key={article.href}>
                <Link
                  href={article.href}
                  className="block rounded-lg border border-border bg-surface px-4 py-4 transition-colors hover:border-accent/40"
                >
                  <p className="font-medium text-ink">{article.title}</p>
                  <p className="mt-1 text-sm text-muted">{article.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-muted">
            Dedicated articles for this hub are not published yet. Explore
            related research below while the cluster expands.
          </p>
        )}
      </section>

      {related.length ? (
        <section className="mt-12">
          <h2 className="font-semibold tracking-tight text-2xl text-ink">Related research</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {related.map((article) => (
              <li key={article.href}>
                <Link
                  href={article.href}
                  className="block rounded-lg border border-border bg-surface px-4 py-3 text-sm text-ink hover:border-accent/40"
                >
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="mt-14">
        <EmailSignup variant="inline" />
      </div>
    </Container>
  );
}
