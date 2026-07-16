import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getArticleBySlug,
  listArticleSlugs,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { getAuthor } from "@/config/authors";
import { ArticleTemplate } from "@/components/article/ArticleTemplate";

export function generateArticleStaticParams(category: string) {
  return listArticleSlugs(category).map((slug) => ({ slug }));
}

export function generateArticleMetadata(
  category: string,
  slug: string,
): Metadata {
  const article = getArticleBySlug(category, slug);
  if (!article) return {};
  const author = getAuthor(article.author);
  return buildMetadata({
    title: article.title,
    description: article.description,
    path: article.href,
    image: article.featuredImage,
    noindex: article.noindex,
    type: "article",
    publishedTime: article.publishedDate,
    modifiedTime: article.updatedDate,
    authors: [author.name],
  });
}

export function ArticlePage({
  category,
  slug,
}: {
  category: string;
  slug: string;
}) {
  const article = getArticleBySlug(category, slug);
  if (!article) notFound();
  return <ArticleTemplate article={article} />;
}
