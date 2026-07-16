# Design System

## Brand Identity

GRW Research is a premium educational publication for peptide research literacy. Visual references: Apple clarity, Stripe polish, Levels Health calm, Examine seriousness, modern scientific journal restraint.

## Logo

Primary lockup is a **stacked wordmark** (Concept 1):

- **GRW** — bold, tight tracking
- **Research** — light weight, wide letter-spacing beneath

Implementation: `src/components/brand/Logo.tsx`  
Static asset: `public/logo.svg`  
Favicon: `public/favicon.svg` (GRW initials on ink)

## Color Palette

| Token | Light | Role |
| --- | --- | --- |
| `--ink` | `#0F172A` | Primary text / brand ink |
| `--paper` | `#F8FAFC` | Page background |
| `--surface` | `#FFFFFF` | Cards / elevated panels |
| `--accent` | `#1D4ED8` | Deep blue accent |
| `--emerald` | `#059669` | Secondary accent / trust CTAs |
| `--muted` | `#64748B` | Supporting text |
| `--border` | `#E2E8F0` | Borders |

Dark mode mirrors the same hierarchy with inverted surfaces.

## Typography

- Primary: Inter (Next font)
- Large spacing, minimalist hierarchy
- Headings: semibold + tight tracking

## Layout & Spacing

- Max width ~72rem (`max-w-6xl`)
- Generous vertical section padding (`py-20`+)
- Rounded-2xl cards, subtle shadows, soft gradients

## Components

Navbar, Footer, Research cards, CTA cards, FAQ accordion, Comparison table, Sticky sidebar, Reading progress, Author card, Breadcrumbs, Newsletter form, Theme toggle.

## Do / Don't

Do: scientific tone, whitespace, disclosed affiliate CTAs after education.
Don't: spammy buttons, fake urgency, supplement-store aesthetics, miracle claims.
