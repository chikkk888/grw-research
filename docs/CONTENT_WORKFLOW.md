# Content Workflow

## Adding an article

1. Create `content/articles/{category}/{slug}.mdx`
2. Complete required frontmatter fields
3. Write educational body copy with internal links
4. Insert `[Scientific reference required]` where citations are still needed
5. Keep `scientificReviewStatus: draft` until review is finished
6. Run `npm run build` to validate frontmatter parsing and static generation

## Frontmatter checklist

- title, description, slug, category, tags
- author, reviewer
- publishedDate, updatedDate
- affiliateDisclosure, scientificReviewStatus
- references, relatedArticles
- optional: dek, keyTakeaways, faqs, affiliateCta, noindex

## Review gates

- Editorial review for clarity, compliance, and internal links
- Scientific review before removing draft banners
- No fabricated credentials on author/reviewer profiles

## Commercial pages

Use the Swiss Chems evaluation sections. Do not publish a final positive/negative verdict without documented evidence.
