import Link from "next/link";
import { getAuthor, getReviewer } from "@/config/authors";
import { getHub } from "@/config/hubs";
import { generateBreadcrumbs } from "@/lib/breadcrumbs";
import { getRelatedArticles } from "@/lib/content";
import type { Article } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { DraftBanner } from "@/components/ui/DraftBanner";
import { Breadcrumbs } from "@/components/article/Breadcrumbs";
import {
  extractToc,
  TableOfContents,
} from "@/components/article/TableOfContents";
import { KeyTakeaways } from "@/components/article/KeyTakeaways";
import { EvidenceNotice } from "@/components/article/EvidenceNotice";
import { RelatedResearch } from "@/components/article/RelatedResearch";
import { AuthorBox, ReviewerBox } from "@/components/article/AuthorBox";
import { ArticleFaqs } from "@/components/article/ArticleFaqs";
import { MdxContent } from "@/components/article/MdxContent";
import { EmailSignup } from "@/components/email/EmailSignup";
import { ContextualAffiliateCta } from "@/components/affiliate/ContextualAffiliateCta";
import { ProductInfoCard } from "@/components/affiliate/ProductInfoCard";
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  FaqJsonLd,
  PersonJsonLd,
} from "@/components/seo/ArticleJsonLd";

export function ArticleTemplate({ article }: { article: Article }) {
  const author = getAuthor(article.author);
  const reviewer = getReviewer(article.reviewer);
  const crumbs = generateBreadcrumbs(
    article.category,
    article.title,
    article.href,
  );
  const toc = extractToc(article.content);
  const related = getRelatedArticles(article);
  const hub = getHub(article.category);
  const showDraft =
    article.scientificReviewStatus === "draft" ||
    article.scientificReviewStatus === "awaiting-review";

  return (
    <>
      <ArticleJsonLd article={article} />
      <BreadcrumbJsonLd items={crumbs} />
      <PersonJsonLd name={author.name} description={author.bio} />
      <PersonJsonLd name={reviewer.name} description={reviewer.bio} />
      {article.faqs?.length ? <FaqJsonLd faqs={article.faqs} /> : null}

      {showDraft ? <DraftBanner /> : null}

      <Container className="py-10 sm:py-14">
        <Breadcrumbs items={crumbs} />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-wide text-accent">
            {hub?.title ?? article.category}
          </p>
          <h1 className="mt-3 font-semibold tracking-tight text-4xl leading-tight text-ink sm:text-5xl">
            {article.title}
          </h1>
          {article.dek ? (
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              {article.dek}
            </p>
          ) : (
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              {article.description}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
            <span>By {author.name}</span>
            <span>Published {formatDate(article.publishedDate)}</span>
            <span>Updated {formatDate(article.updatedDate)}</span>
            <span>{article.readingTimeMinutes} min read</span>
            <span className="capitalize">
              Review status: {article.scientificReviewStatus.replace(/-/g, " ")}
            </span>
          </div>

          {article.affiliateDisclosure ? (
            <p className="mt-4 rounded-md border border-border bg-surface px-3 py-2 text-sm text-muted">
              This article may include affiliate links. We may earn a commission
              at no extra cost to you. Recommendations and education are kept
              separate — see our{" "}
              <Link
                href="/affiliate-disclosure"
                className="text-accent underline-offset-2 hover:underline"
              >
                affiliate disclosure
              </Link>
              .
            </p>
          ) : null}
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <article>
            <div className="mb-8 lg:hidden">
              <TableOfContents items={toc} />
            </div>

            {article.keyTakeaways?.length ? (
              <div className="mb-8">
                <KeyTakeaways items={article.keyTakeaways} />
              </div>
            ) : null}

            <MdxContent source={article.content} />

            {article.affiliateCta ? (
              <ContextualAffiliateCta
                merchantId={article.affiliateCta.merchantId}
                productId={article.affiliateCta.productId}
                headline={article.affiliateCta.headline}
                body={article.affiliateCta.body}
              />
            ) : null}

            <div className="mt-10 space-y-8">
              <EvidenceNotice />

              <section>
                <h2 className="font-semibold tracking-tight text-2xl text-ink">References</h2>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-ink-soft">
                  {article.references.map((ref) => (
                    <li key={ref.label}>
                      <span className="font-medium text-ink">{ref.label}: </span>
                      {ref.url ? (
                        <a
                          href={ref.url}
                          className="text-accent underline-offset-2 hover:underline"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {ref.citation}
                        </a>
                      ) : (
                        ref.citation
                      )}
                    </li>
                  ))}
                </ol>
              </section>

              <ArticleFaqs faqs={article.faqs ?? []} />
              <RelatedResearch articles={related} />

              <div className="grid gap-4 sm:grid-cols-2">
                <AuthorBox person={author} />
                <ReviewerBox person={reviewer} />
              </div>

              <EmailSignup variant="inline" />
            </div>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="hidden lg:block">
              <TableOfContents items={toc} />
            </div>
            {article.affiliateCta?.productId ? (
              <ProductInfoCard productId={article.affiliateCta.productId} />
            ) : null}
            {hub ? (
              <div className="rounded-lg border border-border bg-surface p-4">
                <p className="text-sm font-semibold text-ink">Topic hub</p>
                <Link
                  href={hub.href}
                  className="mt-2 inline-block text-sm text-accent underline-offset-2 hover:underline"
                >
                  Explore all {hub.title} guides
                </Link>
              </div>
            ) : null}
          </aside>
        </div>
      </Container>
    </>
  );
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}
