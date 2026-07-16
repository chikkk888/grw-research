import Link from "next/link";
import type { Article } from "@/types/content";

export function RelatedResearch({
  articles,
  title = "Related research",
}: {
  articles: Article[];
  title?: string;
}) {
  if (!articles.length) return null;

  return (
    <section className="border-t border-border pt-8">
      <h2 className="font-semibold tracking-tight text-2xl text-ink">{title}</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {articles.map((article) => (
          <li key={article.href}>
            <Link
              href={article.href}
              className="block rounded-lg border border-border bg-surface px-4 py-3 transition-colors hover:border-accent/40 hover:bg-accent-soft/30"
            >
              <p className="text-xs uppercase tracking-wide text-muted">
                {article.category.replace(/-/g, " ")}
              </p>
              <p className="mt-1 font-medium text-ink">{article.title}</p>
              <p className="mt-1 text-sm text-muted line-clamp-2">
                {article.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
