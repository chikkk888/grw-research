import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "emerald";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent !text-white no-underline shadow-brand-sm hover:bg-accent-hover hover:!text-white focus-visible:ring-accent",
  secondary:
    "bg-surface !text-ink border border-border no-underline shadow-brand-sm hover:border-border-strong hover:bg-accent-soft/40 hover:!text-ink",
  ghost: "!text-accent no-underline hover:bg-accent-soft/60",
  emerald:
    "bg-emerald !text-white no-underline shadow-brand-sm hover:opacity-90 hover:!text-white focus-visible:ring-emerald",
};

const sizeClasses: Record<Size, string> = {
  sm: "rounded-lg px-3.5 py-2 text-sm",
  md: "rounded-xl px-5 py-2.5 text-sm font-medium",
  lg: "rounded-xl px-6 py-3 text-base font-medium",
};

const base =
  "inline-flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
}: ButtonLinkProps) {
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer sponsored"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
