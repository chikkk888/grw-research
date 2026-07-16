export type AffiliateMerchant = {
  id: string;
  name: string;
  baseUrl: string;
  disclosureLabel: string;
  enabled: boolean;
};

export type AffiliateProduct = {
  id: string;
  merchantId: string;
  name: string;
  format: string;
  path: string;
  testingDocsUrl?: string;
  shippingInfoUrl?: string;
  researchUseNotice: string;
};

export type AffiliateCampaignParams = Record<string, string>;

/**
 * Global kill switch — set AFFILIATE_LINKS_ENABLED=false to disable destinations.
 */
export const affiliateLinksEnabled =
  process.env.AFFILIATE_LINKS_ENABLED !== "false";

export const merchants: Record<string, AffiliateMerchant> = {
  "swiss-chems": {
    id: "swiss-chems",
    name: "Swiss Chems",
    // Placeholder destination — replace with real affiliate base URL via env
    baseUrl:
      process.env.AFFILIATE_SWISS_CHEMS_BASE_URL ??
      "https://example.com/affiliate/swiss-chems",
    disclosureLabel: "Affiliate partner",
    enabled: true,
  },
};

export const products: Record<string, AffiliateProduct> = {
  "swiss-chems-ghk-cu": {
    id: "swiss-chems-ghk-cu",
    merchantId: "swiss-chems",
    name: "GHK-Cu (placeholder product listing)",
    format: "Research compound listing — format TBD",
    path: "/ghk-cu",
    testingDocsUrl: undefined,
    shippingInfoUrl: undefined,
    researchUseNotice:
      "Research-use restrictions may apply. Review merchant documentation and applicable laws before considering any purchase.",
  },
  "swiss-chems-bpc-157": {
    id: "swiss-chems-bpc-157",
    merchantId: "swiss-chems",
    name: "BPC-157 (placeholder product listing)",
    format: "Research compound listing — format TBD",
    path: "/bpc-157",
    testingDocsUrl: undefined,
    shippingInfoUrl: undefined,
    researchUseNotice:
      "For research use only where applicable. Review merchant documentation, testing information, and local regulations before considering any purchase.",
  },
};

export function getMerchant(id: string): AffiliateMerchant | undefined {
  return merchants[id];
}

export function getProduct(id: string): AffiliateProduct | undefined {
  return products[id];
}

export function buildAffiliateUrl(
  merchantId: string,
  productId?: string,
  campaign: AffiliateCampaignParams = {},
): string | null {
  if (!affiliateLinksEnabled) return null;

  const merchant = getMerchant(merchantId);
  if (!merchant || !merchant.enabled) return null;

  const product = productId ? getProduct(productId) : undefined;
  const url = new URL(
    product ? `${merchant.baseUrl.replace(/\/$/, "")}${product.path}` : merchant.baseUrl,
  );

  Object.entries(campaign).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });

  if (process.env.AFFILIATE_DEFAULT_CAMPAIGN) {
    url.searchParams.set("utm_campaign", process.env.AFFILIATE_DEFAULT_CAMPAIGN);
  }

  return url.toString();
}
