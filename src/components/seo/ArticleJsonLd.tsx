import { siteConfig } from "@/config/site";
import { getAuthor, getReviewer } from "@/config/authors";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/seo";
import type { Article, BreadcrumbItem } from "@/types/content";

export function ArticleJsonLd({ article }: { article: Article }) {
  const author = getAuthor(article.author);
  const reviewer = getReviewer(article.reviewer);

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.description,
        datePublished: article.publishedDate,
        dateModified: article.updatedDate,
        mainEntityOfPage: absoluteUrl(article.href),
        author: {
          "@type": "Person",
          name: author.name,
          description: author.bio,
        },
        contributor: {
          "@type": "Person",
          name: reviewer.name,
          description: reviewer.bio,
        },
        publisher: {
          "@type": "Organization",
          name: siteConfig.brandName,
          url: absoluteUrl("/"),
        },
        image: absoluteUrl(article.featuredImage || siteConfig.defaultOgImage),
      }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.href),
        })),
      }}
    />
  );
}

export function PersonJsonLd({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        name,
        description,
      }}
    />
  );
}

export function FaqJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  if (!faqs.length) return null;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }}
    />
  );
}
