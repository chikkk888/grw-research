# Atlas — Almost-Real Production Brief

**Look locked:** near-photoreal editorial human (not cartoon, not plastic influencer)  
**References:** `ads/meta/character/reference/`  
**Funnel:** Meta → GRW `/research/bpc-157` → Swiss on-page later

---

## Reference files

**Primary look (locked):** reading the book/notebook — use this as the identity lock for all AI video.

| File | Use |
|------|-----|
| `atlas-primary.png` | **Master lock** (same as notebook reading shot) |
| `atlas-almost-real-notebook.png` | Same primary reading pose |
| `atlas-primary-reading-alt.png` | Reading continuity variant |
| `atlas-primary-look-up.png` | Looks up from the book (CTA / insight beat) |
| `atlas-almost-real-hero.png` | Optional standing pocket pose (secondary only) |
| `atlas-almost-real-checklist.png` | Optional checklist prop (secondary only) |

**Continuity rules for every new frame/clip**
- Same man as **reading primary**: early 30s, short dark hair, thin metal glasses, light stubble
- Navy research coat + light shirt (not white medical coat)
- Default action: **reading a book/notebook**
- Calm neutral face — no grin, no “hype”
- Dark navy studio background
- Never: vials, syringes, pills, Swiss Chems logo, before/after bodies

---

## How to make almost-real 15s videos

Use an AI video tool that accepts **image references** (Kling, Runway, Luma, etc.):

1. Upload `atlas-primary.png` (reading pose) as character/reference image  
2. Generate 3–5s clips per storyboard beat (see `CHARACTER_SYSTEM.md`)  
3. Prefer reading → look-up motion; keep prompts boring and specific — continuity > creativity  
4. Stitch in CapCut / Premiere / Descript to 15s @ 1080×1920  
5. Burn in captions from `ads/meta/character/ad-copy.md`  
6. In Meta Ads Manager: mark **AI modified** if asked  
7. Destination = GRW guide URL (not Swiss)

### Prompt template (copy/adapt)

```
Same man as reference photo: early 30s, short dark hair, thin metal glasses,
light stubble, navy research coat, light shirt. He is reading an open book
or research notebook. Dark navy studio. Slow subtle motion only. Editorial
almost-photoreal style. No products, no vials, no text overlays, no logo.
Cinematic soft light.
Action: [CONTINUES READING / SLOWLY LOOKS UP FROM BOOK TOWARD CAMERA]
```

### Beat prompts (15s)

**Ad A — overview** (lead creative)
- 0–3s: reading book (primary lock)
- 3–8s: turns a page / continues reading
- 8–12s: looks up from book thoughtfully
- 12–15s: still + caption “Free research guide”

**Ad B — checklist**
- Start from reading primary; optional cut to checklist only if identity matches

**Ad C — evidence limits**
- Reading → look-up; captions carry “Mechanisms ≠ proven outcomes”

---

## Captions / destination

Use paste kit: `ads/meta/character/ad-copy.md`  
All links go to:

```
https://www.grwresearch.com/research/bpc-157?utm_source=meta&utm_medium=paid&utm_campaign=swiss_bpc_atlas_v1&utm_content=CREATIVE_ID
```

---

## Why not generate final MP4s in this repo yet

Near-real motion needs an external AI video model with image-lock. This folder locks **identity + prompts + funnel** so those renders stay on-brand and compliant.
