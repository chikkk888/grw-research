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
  /** When false, buildAffiliateUrl returns null for this product. */
  enabled?: boolean;
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

const SWISS_CHEMS_DEFAULT_BASE = "https://swisschems.is";
/** Public affiliate tracking id — override with AFFILIATE_SWISS_CHEMS_REF if needed. */
const SWISS_CHEMS_DEFAULT_REF = "MAURICIOPINEDA";

function resolveSwissChemsBaseUrl(): string {
  const fromEnv = process.env.AFFILIATE_SWISS_CHEMS_BASE_URL?.trim();
  // Ignore stale placeholder values that may still be set in hosting env.
  if (!fromEnv || fromEnv.includes("example.com")) {
    return SWISS_CHEMS_DEFAULT_BASE;
  }
  return fromEnv.replace(/\/$/, "");
}

export const merchants: Record<string, AffiliateMerchant> = {
  "swiss-chems": {
    id: "swiss-chems",
    name: "Swiss Chems",
    baseUrl: resolveSwissChemsBaseUrl(),
    disclosureLabel: "Affiliate partner",
    enabled: true,
  },
};

export const products: Record<string, AffiliateProduct> = {
  "swiss-chems-ghk-cu": {
    id: "swiss-chems-ghk-cu",
    merchantId: "swiss-chems",
    name: "GHK-Cu (placeholder — product URL pending)",
    format: "Research compound listing — format TBD",
    // No real product path yet; keep disabled so we do not invent a destination.
    path: "/ghk-cu",
    enabled: false,
    testingDocsUrl: undefined,
    shippingInfoUrl: undefined,
    researchUseNotice:
      "Research-use restrictions may apply. Review merchant documentation and applicable laws before considering any purchase.",
  },
  "swiss-chems-bpc-157": {
    id: "swiss-chems-bpc-157",
    merchantId: "swiss-chems",
    name: "BPC-157",
    format: "0.5mg capsule, 60 capsules",
    path: "/product/bpc-157-0-5mg-capsule-60-capsules/",
    enabled: true,
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
  if (productId) {
    if (!product || product.enabled === false) return null;
  }

  const url = new URL(
    product ? `${merchant.baseUrl.replace(/\/$/, "")}${product.path}` : merchant.baseUrl,
  );

  // Merchant affiliate tracking id (e.g. Swiss Chems ?ref=)
  if (merchantId === "swiss-chems") {
    const ref =
      process.env.AFFILIATE_SWISS_CHEMS_REF?.trim() || SWISS_CHEMS_DEFAULT_REF;
    if (ref && ref !== "YOUR_AFFILIATE_REF") {
      url.searchParams.set("ref", ref);
    }
  }

  Object.entries(campaign).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });

  if (process.env.AFFILIATE_DEFAULT_CAMPAIGN) {
    url.searchParams.set("utm_campaign", process.env.AFFILIATE_DEFAULT_CAMPAIGN);
  }

  return url.toString();
}
