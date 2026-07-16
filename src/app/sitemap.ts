import type { MetadataRoute } from "next";
import { hubs } from "@/config/hubs";
import { researchGuides } from "@/config/research-guides";
import { getAllArticles } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

const staticPaths = [
  "/",
  "/about",
  "/contact",
  "/research",
  "/research/bpc-157",
  "/editorial-policy",
  "/medical-disclaimer",
  "/affiliate-disclosure",
  "/privacy-policy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = staticPaths.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority:
      path === "/"
        ? 1
        : path === "/research/bpc-157"
          ? 0.95
          : path === "/research"
            ? 0.9
            : 0.7,
  }));

  const guideEntries = researchGuides
    .filter((guide) => guide.slug !== "bpc-157")
    .map((guide) => ({
      url: absoluteUrl(guide.href),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: guide.status === "published" ? 0.8 : 0.4,
    }));

  const hubEntries = hubs.map((hub) => ({
    url: absoluteUrl(hub.href),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const articleEntries = getAllArticles({ includeNoindex: false }).map(
    (article) => ({
      url: absoluteUrl(article.href),
      lastModified: new Date(article.updatedDate),
      changeFrequency: "monthly" as const,
      priority: 0.55,
    }),
  );

  return [...staticEntries, ...guideEntries, ...hubEntries, ...articleEntries];
}
