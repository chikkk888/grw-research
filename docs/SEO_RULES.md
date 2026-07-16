# SEO Rules

## Core philosophy

Every page should strengthen sitewide topical authority. Prefer cluster depth over isolated posting volume.

## Required on every indexable page

- Unique title and meta description
- Canonical URL
- Open Graph + Twitter metadata
- Semantic heading hierarchy (one H1)
- Descriptive internal anchors
- Breadcrumbs on articles

## Structured data

Allowed:

- Organization, WebSite
- Article, Person, BreadcrumbList
- FAQPage only when FAQs are visible

Forbidden unless genuine methodology exists:

- Review
- AggregateRating

## Internal linking

GHK-Cu articles should link to:

1. GHK-Cu hub
2. At least two supporting GHK-Cu articles
3. At least one copper-peptide article
4. A comparison/review when commercially relevant

Commercial pages must link back to educational explainers.

## Technical endpoints

- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/app/feed.xml/route.ts`

## Draft content

Keep scientific review status visible. Use `noindex` when a commercial draft should not enter the index yet.
