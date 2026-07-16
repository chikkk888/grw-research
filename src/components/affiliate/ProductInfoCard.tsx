import {
  getMerchant,
  getProduct,
  buildAffiliateUrl,
} from "@/config/affiliates";
import { AffiliateLink } from "@/components/affiliate/AffiliateLink";
import Link from "next/link";

type Props = {
  productId: string;
  ctaLabel?: string;
};

export function ProductInfoCard({
  productId,
  ctaLabel = "Review product information",
}: Props) {
  const product = getProduct(productId);
  if (!product) return null;

  const merchant = getMerchant(product.merchantId);
  const destination = buildAffiliateUrl(product.merchantId, product.id);

  return (
    <aside className="rounded-lg border border-border bg-surface p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-muted">
        Product information
      </p>
      <h3 className="mt-2 font-semibold tracking-tight text-xl text-ink">{product.name}</h3>
      <dl className="mt-4 space-y-2 text-sm text-ink-soft">
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Merchant</dt>
          <dd>{merchant?.name ?? "—"}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Format</dt>
          <dd className="text-right">{product.format}</dd>
        </div>
      </dl>
      <p className="mt-4 rounded-md bg-accent-soft/60 px-3 py-2 text-sm text-ink-soft">
        {product.researchUseNotice}
      </p>
      <ul className="mt-4 space-y-1 text-sm">
        <li>
          {product.testingDocsUrl ? (
            <a
              href={product.testingDocsUrl}
              className="text-accent underline-offset-2 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Testing documentation
            </a>
          ) : (
            <span className="text-muted">
              Testing documentation link — placeholder
            </span>
          )}
        </li>
        <li>
          {product.shippingInfoUrl ? (
            <a
              href={product.shippingInfoUrl}
              className="text-accent underline-offset-2 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Shipping information
            </a>
          ) : (
            <span className="text-muted">
              Shipping information link — placeholder
            </span>
          )}
        </li>
      </ul>
      <p className="mt-3 text-xs text-muted">
        {merchant?.disclosureLabel ?? "Affiliate"}. We may earn a commission if
        you purchase through an affiliate link. See our{" "}
        <Link href="/affiliate-disclosure" className="underline underline-offset-2">
          affiliate disclosure
        </Link>
        .
      </p>
      <div className="mt-4">
        <AffiliateLink
          href={destination}
          merchantId={product.merchantId}
          productId={product.id}
          className="inline-flex rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          {destination ? ctaLabel : "Affiliate destinations disabled"}
        </AffiliateLink>
      </div>
    </aside>
  );
}
