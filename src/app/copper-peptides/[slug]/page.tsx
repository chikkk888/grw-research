import {
  ArticlePage,
  generateArticleMetadata,
  generateArticleStaticParams,
} from "@/lib/article-page";

export function generateStaticParams() {
  return generateArticleStaticParams("copper-peptides");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return generateArticleMetadata("copper-peptides", slug);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ArticlePage category="copper-peptides" slug={slug} />;
}
