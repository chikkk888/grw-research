import Link from "next/link";
import { siteConfig } from "@/config/site";

type LogoVariant = "stacked" | "compact";
type LogoSize = "sm" | "md" | "hero";

type WordmarkProps = {
  variant?: LogoVariant;
  size?: LogoSize;
  align?: "start" | "center";
  className?: string;
};

const stackedSizes: Record<
  LogoSize,
  { grw: string; research: string; gap: string }
> = {
  sm: {
    grw: "text-[1.15rem] font-bold tracking-tight",
    research: "text-[0.55rem] font-light tracking-[0.38em] text-ink-soft",
    gap: "mt-1",
  },
  md: {
    grw: "text-[1.35rem] font-bold tracking-tight sm:text-[1.5rem]",
    research:
      "text-[0.62rem] font-light tracking-[0.38em] text-ink-soft sm:text-[0.68rem]",
    gap: "mt-1",
  },
  hero: {
    grw: "text-4xl font-bold tracking-tight sm:text-5xl",
    research:
      "text-sm font-light tracking-[0.42em] text-ink-soft sm:text-base",
    gap: "mt-2.5",
  },
};

const compactSizes: Record<LogoSize, { grw: string; research: string; gap: string }> = {
  sm: {
    grw: "text-base font-bold tracking-tight",
    research: "text-[0.6rem] font-light tracking-[0.28em] text-ink-soft",
    gap: "gap-1.5",
  },
  md: {
    grw: "text-lg font-bold tracking-tight sm:text-xl",
    research:
      "text-[0.7rem] font-light tracking-[0.28em] text-ink-soft sm:text-xs",
    gap: "gap-2",
  },
  hero: {
    grw: "text-4xl font-bold tracking-tight sm:text-5xl",
    research:
      "text-sm font-light tracking-[0.35em] text-ink-soft sm:text-base",
    gap: "gap-3 sm:gap-4",
  },
};

/**
 * GRW Research wordmark — Concept 1.
 * Bold "GRW" with lightly tracked "Research". Uses currentColor for dark mode.
 */
export function Wordmark({
  variant = "stacked",
  size = "md",
  align = "start",
  className = "",
}: WordmarkProps) {
  if (variant === "compact") {
    const s = compactSizes[size];
    return (
      <span
        className={`inline-flex items-baseline leading-none text-ink ${s.gap} ${className}`}
      >
        <span className={s.grw}>GRW</span>
        <span className={s.research}>Research</span>
      </span>
    );
  }

  const s = stackedSizes[size];
  const alignment = align === "center" ? "items-center text-center" : "items-start";

  return (
    <span
      className={`inline-flex flex-col leading-none text-ink ${alignment} ${className}`}
    >
      <span className={s.grw}>GRW</span>
      <span className={`${s.gap} ${s.research}`}>Research</span>
    </span>
  );
}

type LogoProps = WordmarkProps & {
  href?: string;
};

export function Logo({
  variant = "stacked",
  size = "md",
  align = "start",
  href = "/",
  className = "",
}: LogoProps) {
  return (
    <Link
      href={href}
      className={`transition-opacity hover:opacity-80 ${className}`}
      aria-label={siteConfig.brandName}
    >
      <Wordmark variant={variant} size={size} align={align} />
    </Link>
  );
}
