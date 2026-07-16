export type ScientificReviewStatus =
  | "draft"
  | "awaiting-review"
  | "reviewed"
  | "needs-update";

export type ArticleReference = {
  label: string;
  /** Use placeholder text when a citation is still required. */
  citation: string;
  url?: string;
};

export type ArticleFaq = {
  question: string;
  answer: string;
};

export type ArticleFrontmatter = {
  title: string;
  description: string;
  slug: string;
  category: string;
  tags: string[];
  author: string;
  reviewer: string;
  publishedDate: string;
  updatedDate: string;
  featuredImage?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  affiliateDisclosure: boolean;
  scientificReviewStatus: ScientificReviewStatus;
  dek?: string;
  keyTakeaways?: string[];
  references: ArticleReference[];
  relatedArticles: string[];
  faqs?: ArticleFaq[];
  /** Optional commercial CTA config */
  affiliateCta?: {
    merchantId: string;
    productId?: string;
    headline?: string;
    body?: string;
  };
};

export type Article = ArticleFrontmatter & {
  content: string;
  readingTimeMinutes: number;
  href: string;
};

export type BreadcrumbItem = {
  name: string;
  href: string;
};
