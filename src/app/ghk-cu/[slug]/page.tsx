import {
  ArticlePage,
  generateArticleMetadata,
  generateArticleStaticParams,
} from "@/lib/article-page";

export function generateStaticParams() {
  return generateArticleStaticParams("ghk-cu");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return generateArticleMetadata("ghk-cu", slug);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ArticlePage category="ghk-cu" slug={slug} />;
}
