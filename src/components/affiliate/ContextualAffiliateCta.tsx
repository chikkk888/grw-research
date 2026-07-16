import Link from "next/link";
import { buildAffiliateUrl } from "@/config/affiliates";
import { AffiliateLink } from "@/components/affiliate/AffiliateLink";

type Props = {
  merchantId: string;
  productId?: string;
  headline?: string;
  body?: string;
};

export function ContextualAffiliateCta({
  merchantId,
  productId,
  headline = "Evaluate documentation before purchasing",
  body = "Review the available product information, testing documentation, shipping terms, and research-use restrictions before purchasing.",
}: Props) {
  const href = buildAffiliateUrl(merchantId, productId);

  return (
    <aside className="my-10 rounded-lg border border-border bg-accent-soft/40 p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-muted">
        Research evaluation note
      </p>
      <h3 className="mt-2 font-semibold tracking-tight text-xl text-ink">{headline}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{body}</p>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <AffiliateLink
          href={href}
          merchantId={merchantId}
          productId={productId}
          className="text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          View merchant product information
        </AffiliateLink>
        <Link
          href="/affiliate-disclosure"
          className="text-sm text-muted underline-offset-4 hover:underline"
        >
          Affiliate disclosure
        </Link>
      </div>
    </aside>
  );
}
