"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import { getConfiguredAnalytics } from "@/lib/analytics";
import {
  getConsentServerSnapshot,
  getConsentSnapshot,
  subscribeConsent,
} from "@/lib/consent-store";

/**
 * Consent-aware analytics loader. Scripts remain inactive until:
 * 1) real IDs are provided via env, and
 * 2) the visitor grants consent.
 */
export function AnalyticsScripts() {
  const ids = getConfiguredAnalytics();
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );

  if (consent !== "granted") return null;

  return (
    <>
      {ids.ga4 ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ids.ga4}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config','${ids.ga4}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}
      {ids.metaPixel ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${ids.metaPixel}');fbq('track','PageView');`}
        </Script>
      ) : null}
      {ids.pinterest ? (
        <Script id="pinterest-tag" strategy="afterInteractive">
          {`!function(e){if(!window.pintrk){window.pintrk=function(){window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var n=window.pintrk;n.queue=[],n.version="3.0";var t=document.createElement("script");t.async=!0,t.src=e;var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");pintrk('load','${ids.pinterest}');pintrk('page');`}
        </Script>
      ) : null}
      {ids.clarity ? (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${ids.clarity}");`}
        </Script>
      ) : null}
    </>
  );
}
