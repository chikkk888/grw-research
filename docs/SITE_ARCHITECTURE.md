# Site Architecture

## Overview

GRW Research is a Next.js App Router publication focused on evidence-driven peptide research education. The Research Library is the primary content hub; BPC-157 and TB-500 are the live conversion guides.

## Route map

### Core MVP

- `/` homepage
- `/research` Research Library
- `/research/bpc-157` primary conversion guide
- `/research/[slug]` coming-soon placeholders for additional compounds
- `/about`, `/contact`
- `/privacy-policy`, `/terms`

### Trust and utility

- `/editorial-policy`, `/medical-disclaimer`, `/affiliate-disclosure`

### Legacy topic hubs (retained)

- `/ghk-cu`, `/copper-peptides`, `/skin`, `/hair`, `/healthy-aging`
- `/reviews`, `/comparisons`

### Machine-readable

- `/sitemap.xml`, `/robots.txt`, `/feed.xml`

## Design system

- Inter typography
- Brand ink `#0F172A`, deep blue + emerald accents
- Dark / light mode via `ThemeProvider`
- Reusable UI in `src/components/ui`

## Key directories

```
content/articles/     MDX source (legacy + expandable)
src/app/              routes
src/components/       UI + article + affiliate + SEO
src/config/           site, nav, research guides, hubs, affiliates
src/lib/              content/seo/env helpers
docs/                 project documentation
```
