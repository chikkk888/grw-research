"use client";

import { useSyncExternalStore } from "react";
import { hasAnyAnalyticsConfigured } from "@/lib/analytics";
import {
  getConsentServerSnapshot,
  getConsentSnapshot,
  setConsent,
  subscribeConsent,
} from "@/lib/consent-store";

export function ConsentBanner() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );

  if (!hasAnyAnalyticsConfigured()) return null;
  if (consent !== "unknown") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/95 p-4 shadow-lg backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-soft">
          We use privacy-conscious analytics only after consent, and only when
          tracking IDs are configured.{" "}
          <a href="/privacy-policy" className="underline underline-offset-2">
            Privacy policy
          </a>
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setConsent("denied")}
            className="rounded-md border border-border px-3 py-2 text-sm text-ink"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => setConsent("granted")}
            className="rounded-md bg-accent px-3 py-2 text-sm font-medium text-white"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
