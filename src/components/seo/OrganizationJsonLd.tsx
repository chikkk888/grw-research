import { siteConfig } from "@/config/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/seo";

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteConfig.brandName,
        legalName: siteConfig.legalName,
        url: absoluteUrl("/"),
        description: siteConfig.description,
        email: siteConfig.email,
      }}
    />
  );
}

export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.brandName,
        url: absoluteUrl("/"),
        description: siteConfig.description,
        publisher: {
          "@type": "Organization",
          name: siteConfig.brandName,
        },
      }}
    />
  );
}
