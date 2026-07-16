import { getAnalyticsIds } from "@/lib/env";

export const CONSENT_STORAGE_KEY = "grw-analytics-consent";

export type ConsentState = "granted" | "denied" | "unknown";

export function getConfiguredAnalytics() {
  return getAnalyticsIds();
}

export function hasAnyAnalyticsConfigured(): boolean {
  const ids = getAnalyticsIds();
  return Boolean(ids.ga4 || ids.metaPixel || ids.pinterest || ids.clarity);
}

/**
 * Client-side click tracking hook for affiliate links.
 * Safe no-op until analytics IDs and consent are present.
 */
export function trackAffiliateClick(payload: {
  merchantId: string;
  productId?: string;
  href: string;
}): void {
  if (typeof window === "undefined") return;

  const consent = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  if (consent !== "granted") return;

  window.dispatchEvent(
    new CustomEvent("grw:affiliate-click", {
      detail: payload,
    }),
  );

  // Future: push to dataLayer / pixel APIs once IDs are configured.
  const w = window as Window & { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: "affiliate_click",
    ...payload,
  });
}
