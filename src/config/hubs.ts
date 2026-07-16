export type HubDefinition = {
  slug: string;
  title: string;
  description: string;
  href: string;
  relatedCategories: string[];
};

export const hubs: HubDefinition[] = [
  {
    slug: "ghk-cu",
    title: "GHK-Cu",
    description:
      "Educational guides on the copper peptide GHK-Cu, including research context, skin and hair discussions, and safety considerations.",
    href: "/ghk-cu",
    relatedCategories: ["ghk-cu", "copper-peptides", "skin", "hair"],
  },
  {
    slug: "copper-peptides",
    title: "Copper Peptides",
    description:
      "Evidence-oriented explainers on copper peptides, ingredient comparisons, and how they fit into skin and hair routines.",
    href: "/copper-peptides",
    relatedCategories: ["copper-peptides", "ghk-cu", "skin", "hair"],
  },
  {
    slug: "skin",
    title: "Skin",
    description:
      "Guides on skincare ingredients and appearance-focused research, with careful separation of education and product recommendations.",
    href: "/skin",
    relatedCategories: ["skin", "copper-peptides", "ghk-cu"],
  },
  {
    slug: "hair",
    title: "Hair",
    description:
      "Hair-care ingredient education connecting copper peptides and related research topics without exaggerated claims.",
    href: "/hair",
    relatedCategories: ["hair", "copper-peptides", "ghk-cu"],
  },
  {
    slug: "healthy-aging",
    title: "Healthy Aging",
    description:
      "Balanced coverage of healthy-aging and skin-appearance topics grounded in research limitations and uncertainty.",
    href: "/healthy-aging",
    relatedCategories: ["healthy-aging", "skin", "ghk-cu"],
  },
  {
    slug: "research",
    title: "Research Library",
    description:
      "Evidence-driven educational guides for modern peptides and research compounds.",
    href: "/research",
    relatedCategories: ["research", "ghk-cu", "copper-peptides"],
  },
  {
    slug: "reviews",
    title: "Reviews",
    description:
      "Structured vendor and product evaluations focused on transparency, documentation, and research-use context.",
    href: "/reviews",
    relatedCategories: ["reviews"],
  },
  {
    slug: "comparisons",
    title: "Comparisons",
    description:
      "Side-by-side educational comparisons to help readers evaluate options with clearer criteria.",
    href: "/comparisons",
    relatedCategories: ["comparisons", "copper-peptides"],
  },
];

export function getHub(slug: string): HubDefinition | undefined {
  return hubs.find((hub) => hub.slug === slug);
}
