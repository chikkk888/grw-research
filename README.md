# GRW Research

Evidence-driven educational publication for research peptides and related compounds. Built as a long-term digital publication (not a storefront).

> Before making strategic, structural, SEO, content, design, or monetization changes, read [`docs/GRW_PROJECT_CONTEXT.md`](./docs/GRW_PROJECT_CONTEXT.md) and preserve its current decisions unless instructed otherwise.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Inter typography
- Dark / light mode
- MDX via `next-mdx-remote` + `gray-matter`
- Vercel-compatible static generation

## Quick start

```bash
cd /Users/chik/grw-research
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## MVP routes

- `/` — Home
- `/research` — Research Library
- `/research/bpc-157` — Primary conversion guide
- `/about`, `/contact`
- `/privacy-policy`, `/terms`
- Trust pages: editorial policy, medical disclaimer, affiliate disclosure

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint

## Notes

- Article copy includes educational placeholders pending editorial/scientific review
- Analytics IDs are environment-driven and consent-gated
- Affiliate destinations are centralized and disable-able
