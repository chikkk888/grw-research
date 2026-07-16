import Link from "next/link";
import type { ResearchGuide } from "@/config/research-guides";
import { ButtonLink } from "@/components/ui/ButtonLink";

type Props = {
  guide: ResearchGuide;
};

const accentStyles = {
  blue: "from-accent/15 via-accent/5 to-transparent",
  emerald: "from-emerald/15 via-emerald/5 to-transparent",
};

export function ResearchCard({ guide }: Props) {
  const isPublished = guide.status === "published";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-brand-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-brand-md">
      <div
        className={`relative aspect-[16/10] bg-gradient-to-br ${accentStyles[guide.accent]}`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-full border border-border/60 bg-surface/80 px-4 py-2 text-sm font-semibold tracking-tight text-ink backdrop-blur-sm">
            {guide.compound}
          </span>
        </div>
        {!isPublished ? (
          <span className="absolute right-3 top-3 rounded-full bg-surface/90 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-muted backdrop-blur">
            Coming soon
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          {guide.category}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink">
          {guide.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
          {guide.excerpt}
        </p>
        <div className="mt-5">
          {isPublished ? (
            <ButtonLink href={guide.href} variant="secondary" size="sm">
              Read more
            </ButtonLink>
          ) : (
            <span className="inline-flex items-center text-sm font-medium text-muted">
              Guide in progress
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export function ResearchCardCompact({ guide }: Props) {
  return (
    <Link
      href={guide.status === "published" ? guide.href : "/research"}
      className="rounded-2xl border border-border bg-surface p-5 shadow-brand-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-brand-md"
    >
      <p className="text-xs font-medium uppercase tracking-wide text-muted">
        {guide.compound}
      </p>
      <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink">
        {guide.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
        {guide.excerpt}
      </p>
    </Link>
  );
}
