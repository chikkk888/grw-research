import {
  ArticlePage,
  generateArticleMetadata,
  generateArticleStaticParams,
} from "@/lib/article-page";

export function generateStaticParams() {
  return generateArticleStaticParams("comparisons");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return generateArticleMetadata("comparisons", slug);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ArticlePage category="comparisons" slug={slug} />;
}
