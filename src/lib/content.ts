import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { siteConfig } from "@/config/site";
import { calculateReadingTime } from "@/lib/reading-time";
import type { Article, ArticleFrontmatter } from "@/types/content";

const CONTENT_ROOT = path.join(process.cwd(), "content", "articles");

function isArticleFrontmatter(data: unknown): data is ArticleFrontmatter {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.title === "string" &&
    typeof d.description === "string" &&
    typeof d.slug === "string" &&
    typeof d.category === "string" &&
    Array.isArray(d.tags) &&
    typeof d.author === "string" &&
    typeof d.reviewer === "string" &&
    typeof d.publishedDate === "string" &&
    typeof d.updatedDate === "string" &&
    typeof d.affiliateDisclosure === "boolean" &&
    typeof d.scientificReviewStatus === "string" &&
    Array.isArray(d.references) &&
    Array.isArray(d.relatedArticles)
  );
}

function articleHref(category: string, slug: string): string {
  return `/${category}/${slug}`;
}

function walkMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkMdxFiles(full));
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      files.push(full);
    }
  }

  return files;
}

function parseArticleFile(filePath: string): Article {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  if (!isArticleFrontmatter(data)) {
    throw new Error(`Invalid frontmatter in ${filePath}`);
  }

  return {
    ...data,
    content,
    readingTimeMinutes: calculateReadingTime(content),
    href: articleHref(data.category, data.slug),
    canonicalUrl:
      data.canonicalUrl ??
      `${siteConfig.url}${articleHref(data.category, data.slug)}`,
  };
}

let cache: Article[] | null = null;

export function getAllArticles({
  includeNoindex = true,
}: { includeNoindex?: boolean } = {}): Article[] {
  if (!cache) {
    cache = walkMdxFiles(CONTENT_ROOT)
      .map(parseArticleFile)
      .sort(
        (a, b) =>
          new Date(b.publishedDate).getTime() -
          new Date(a.publishedDate).getTime(),
      );
  }

  if (includeNoindex) return cache;
  return cache.filter((article) => !article.noindex);
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((article) => article.category === category);
}

export function getArticleBySlug(
  category: string,
  slug: string,
): Article | undefined {
  return getAllArticles().find(
    (article) => article.category === category && article.slug === slug,
  );
}

export function getRelatedArticles(
  article: Article,
  limit = 4,
): Article[] {
  const bySlug = new Map(
    getAllArticles().map((item) => [`${item.category}/${item.slug}`, item]),
  );

  const related: Article[] = [];

  for (const ref of article.relatedArticles) {
    const [category, slug] = ref.includes("/")
      ? ref.split("/")
      : [article.category, ref];
    const match = bySlug.get(`${category}/${slug}`);
    if (match && match.href !== article.href) {
      related.push(match);
    }
  }

  if (related.length < limit) {
    const fillers = getAllArticles().filter(
      (item) =>
        item.href !== article.href &&
        !related.some((r) => r.href === item.href) &&
        (item.category === article.category ||
          item.tags.some((tag) => article.tags.includes(tag))),
    );
    related.push(...fillers.slice(0, limit - related.length));
  }

  return related.slice(0, limit);
}

export function getLatestArticles(limit = 6): Article[] {
  return getAllArticles().slice(0, limit);
}

export function getFeaturedGuides(limit = 4): Article[] {
  const preferred = [
    "ghk-cu/what-is-ghk-cu",
    "copper-peptides/copper-peptides-for-skin",
    "ghk-cu/ghk-cu-benefits-research",
    "copper-peptides/copper-peptides-vs-retinol",
  ];

  const all = getAllArticles();
  const selected = preferred
    .map((key) => {
      const [category, slug] = key.split("/");
      return all.find((a) => a.category === category && a.slug === slug);
    })
    .filter((a): a is Article => Boolean(a));

  if (selected.length >= limit) return selected.slice(0, limit);
  return [...selected, ...all.filter((a) => !selected.includes(a))].slice(
    0,
    limit,
  );
}

export function listArticleSlugs(category: string): string[] {
  return getArticlesByCategory(category).map((article) => article.slug);
}
