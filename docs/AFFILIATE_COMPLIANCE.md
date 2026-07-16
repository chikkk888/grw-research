# Affiliate Compliance

## Principles

- Trust first, revenue second
- Affiliate links should feel like recommendations, not ads
- Never optimize short-term CTR at the expense of credibility

## Technical controls

- Central config: `src/config/affiliates.ts`
- `AffiliateLink` component applies `rel="sponsored nofollow"`
- Global disable via `AFFILIATE_LINKS_ENABLED=false`
- Click tracking hook prepared in `src/lib/analytics.ts`

## Copy rules

Allowed tone:

> Review the available product information, testing documentation, shipping terms, and research-use restrictions before purchasing.

Do not use:

- Buy now before it sells out
- Heal faster / reverse aging / regrow your hair
- Guaranteed results
- Clinically proven (unless directly supported by verified evidence)

## Prohibited fabrications

No fake prices, stock scarcity, testimonials, certifications, or laboratory results.

## Disclosure

Article-level notices + sitewide `/affiliate-disclosure`. Homepage includes a summary.
