export const siteConfig = {
  /** Public brand name — change here to rename sitewide */
  brandName: "GRW Research",
  /** Operating entity */
  legalName: "GRW Marketing",
  tagline: "Evidence-Driven Research Guides for Modern Peptides",
  description:
    "Independent educational resources helping researchers understand the latest peptide science.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_US",
  defaultOgImage: "/og-default.svg",
  email: "editorial@grwresearch.example",
  social: {
    // Placeholders — add real profiles later
    pinterest: "",
    twitter: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
