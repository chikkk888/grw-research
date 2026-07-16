import {
  ArticlePage,
  generateArticleMetadata,
  generateArticleStaticParams,
} from "@/lib/article-page";

export function generateStaticParams() {
  return generateArticleStaticParams("reviews");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return generateArticleMetadata("reviews", slug);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ArticlePage category="reviews" slug={slug} />;
}
