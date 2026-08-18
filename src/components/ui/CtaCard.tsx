import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";

type Props = {
  eyebrow?: string;
  title: string;
  body: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  externalPrimary?: boolean;
  tone?: "default" | "emerald" | "soft";
  children?: ReactNode;
};

export function CtaCard({
  eyebrow = "Next step for researchers",
  title,
  body,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  externalPrimary = false,
  tone = "default",
  children,
}: Props) {
  const toneClass =
    tone === "emerald"
      ? "border-emerald/25 bg-emerald-soft/50"
      : tone === "soft"
        ? "border-border bg-accent-soft/40"
        : "border-border bg-surface";

  return (
    <aside
      className={`my-10 max-w-full rounded-2xl border p-4 shadow-brand-sm sm:p-8 ${toneClass}`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
        {eyebrow}
      </p>
      <h3 className="mt-2 break-words text-xl font-semibold tracking-tight text-ink sm:text-2xl">
        {title}
      </h3>
      <p className="mt-3 max-w-2xl break-words text-sm leading-relaxed text-ink-soft sm:text-base">
        {body}
      </p>
      {children}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <ButtonLink
          href={primaryHref}
          external={externalPrimary}
          variant={tone === "emerald" ? "emerald" : "primary"}
          className="w-full sm:w-auto"
        >
          {primaryLabel}
        </ButtonLink>
        {secondaryHref && secondaryLabel ? (
          <ButtonLink
            href={secondaryHref}
            variant="secondary"
            className="w-full sm:w-auto"
          >
            {secondaryLabel}
          </ButtonLink>
        ) : null}
      </div>
    </aside>
  );
}
