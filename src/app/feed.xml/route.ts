import { siteConfig } from "@/config/site";
import { getAllArticles } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const articles = getAllArticles({ includeNoindex: false }).slice(0, 50);

  const items = articles
    .map(
      (article) => `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${escapeXml(absoluteUrl(article.href))}</link>
      <guid>${escapeXml(absoluteUrl(article.href))}</guid>
      <pubDate>${new Date(article.publishedDate).toUTCString()}</pubDate>
      <description>${escapeXml(article.description)}</description>
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.brandName)}</title>
    <link>${escapeXml(absoluteUrl("/"))}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-us</language>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
