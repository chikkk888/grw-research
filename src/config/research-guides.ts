export type ResearchGuide = {
  slug: string;
  title: string;
  compound: string;
  excerpt: string;
  href: string;
  featured?: boolean;
  status: "published" | "coming-soon";
  accent: "blue" | "emerald";
  category: string;
};

/**
 * Research Library catalog — educational guides for research compounds.
 * Only published guides link to full conversion / article pages.
 */
export const researchGuides: ResearchGuide[] = [
  {
    slug: "bpc-157",
    title: "BPC-157 Research Guide",
    compound: "BPC-157",
    excerpt:
      "An evidence-oriented overview of BPC-157 research, proposed mechanisms, study limitations, and quality considerations for researchers.",
    href: "/research/bpc-157",
    featured: true,
    status: "published",
    accent: "blue",
    category: "Tissue research",
  },
  {
    slug: "tb-500",
    title: "TB-500 Research Guide",
    compound: "TB-500",
    excerpt:
      "Educational context on thymosin β-4 analogues versus the 17–23 fragment, research interest areas, and how TB-500 is discussed in published literature.",
    href: "/research/tb-500",
    featured: true,
    status: "published",
    accent: "emerald",
    category: "Tissue research",
  },
  {
    slug: "cjc-1295",
    title: "CJC-1295 Research Guide",
    compound: "CJC-1295",
    excerpt:
      "A structured primer on CJC-1295 research framing, growth-hormone–related pathways, and evidence quality caveats.",
    href: "/research/cjc-1295",
    featured: true,
    status: "coming-soon",
    accent: "blue",
    category: "Metabolic research",
  },
  {
    slug: "ipamorelin",
    title: "Ipamorelin Research Guide",
    compound: "Ipamorelin",
    excerpt:
      "Independent educational notes on ipamorelin as studied in research settings, with emphasis on uncertainty and study design.",
    href: "/research/ipamorelin",
    featured: true,
    status: "coming-soon",
    accent: "emerald",
    category: "Metabolic research",
  },
  {
    slug: "mots-c",
    title: "MOTS-c Research Guide",
    compound: "MOTS-c",
    excerpt:
      "An introduction to mitochondrial-derived peptide MOTS-c, current research themes, and open questions in the literature.",
    href: "/research/mots-c",
    status: "coming-soon",
    accent: "blue",
    category: "Metabolic research",
  },
  {
    slug: "glp-1",
    title: "GLP-1 Research Guide",
    compound: "GLP-1",
    excerpt:
      "Educational framing of GLP-1–related research compounds for readers seeking clarity without promotional claims.",
    href: "/research/glp-1",
    status: "coming-soon",
    accent: "emerald",
    category: "Metabolic research",
  },
  {
    slug: "nad-plus",
    title: "NAD+ Research Guide",
    compound: "NAD+",
    excerpt:
      "A measured look at NAD+ research interest, cellular pathways discussed in literature, and evidence boundaries.",
    href: "/research/nad-plus",
    status: "coming-soon",
    accent: "blue",
    category: "Cellular research",
  },
];

/** Full conversion guides with dedicated App Router pages (not the placeholder). */
export const dedicatedResearchSlugs = ["bpc-157", "tb-500"] as const;

export function isDedicatedResearchSlug(slug: string): boolean {
  return (dedicatedResearchSlugs as readonly string[]).includes(slug);
}

export function getFeaturedGuides(limit = 4): ResearchGuide[] {
  return researchGuides.filter((g) => g.featured).slice(0, limit);
}

export function getPublishedGuides(): ResearchGuide[] {
  return researchGuides.filter((g) => g.status === "published");
}

export function getGuideBySlug(slug: string): ResearchGuide | undefined {
  return researchGuides.find((g) => g.slug === slug);
}

export function getRelatedGuides(slug: string, limit = 4): ResearchGuide[] {
  const others = researchGuides.filter((g) => g.slug !== slug);
  const published = others.filter((g) => g.status === "published");
  const upcoming = others.filter((g) => g.status !== "published");
  return [...published, ...upcoming].slice(0, limit);
}

export const homeFaqs = [
  {
    question: "Is GRW Research a medical advice site?",
    answer:
      "No. GRW Research publishes educational content for informational and research literacy purposes. Nothing on this site is medical advice, a diagnosis, or a recommendation to use any compound in humans.",
  },
  {
    question: "How do you evaluate research compounds?",
    answer:
      "We summarize publicly available research context, note study limitations, separate education from commerce, and highlight quality documentation researchers typically look for — such as testing transparency and research-use labeling.",
  },
  {
    question: "Do you sell peptides?",
    answer:
      "No. We are an independent educational publication. Some pages may include affiliate links to merchant product information. Those relationships are disclosed and never replace careful reading of sources.",
  },
  {
    question: "Why start with peptides?",
    answer:
      "Peptide research is rapidly expanding and often poorly explained online. Our goal is to provide calm, structured, evidence-aware guides that help researchers orient themselves before evaluating any commercial source.",
  },
  {
    question: "How are affiliate relationships handled?",
    answer:
      "When affiliate links appear, we disclose them clearly. Education comes first; commercial context is secondary and never presented as guaranteed outcomes or medical endorsement.",
  },
];
