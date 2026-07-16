"use client";

import type { ReactNode } from "react";
import { trackAffiliateClick } from "@/lib/analytics";

type Props = {
  href: string | null;
  merchantId: string;
  productId?: string;
  children: ReactNode;
  className?: string;
  fallbackHref?: string;
  label?: string;
};

export function AffiliateLink({
  href,
  merchantId,
  productId,
  children,
  className = "",
  fallbackHref = "/affiliate-disclosure",
  label,
}: Props) {
  const destination = href ?? fallbackHref;
  const isAffiliate = Boolean(href);

  return (
    <a
      href={destination}
      className={className}
      {...(isAffiliate
        ? {
            rel: "sponsored nofollow noopener noreferrer",
            target: "_blank",
            onClick: () =>
              trackAffiliateClick({
                merchantId,
                productId,
                href: destination,
              }),
          }
        : {})}
      aria-label={
        label ||
        (isAffiliate
          ? "Affiliate link (opens in a new tab)"
          : undefined)
      }
    >
      {children}
    </a>
  );
}
