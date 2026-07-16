import Link from "next/link";
import type { ResearchGuide } from "@/config/research-guides";

type Props = {
  guides: ResearchGuide[];
  title?: string;
};

export function RelatedArticles({
  guides,
  title = "Related research guides",
}: Props) {
  if (!guides.length) return null;

  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight text-ink">{title}</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={guide.status === "published" ? guide.href : "/research"}
            className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-strong hover:bg-accent-soft/30"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              {guide.compound}
            </p>
            <p className="mt-1 font-medium text-ink">{guide.title}</p>
            <p className="mt-1 line-clamp-2 text-sm text-ink-soft">
              {guide.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
