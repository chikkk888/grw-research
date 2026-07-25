# Meta Ad Copy — Swiss Chems BPC-157 Direct (v1)

**Destination model:** Paid Meta click → Swiss Chems product page (affiliate `ref=fox888`)  
**Brand in creative:** GRW Research (independent publication)  
**Files:** `ads/meta/output/`

Tone: calm, scientific, research-use only. No heal / cure / FDA-approved / guaranteed results language.

---

## Shared destination URL template

```
https://swisschems.is/product/bpc-157-0-5mg-capsule-60-capsules/?ref=fox888&utm_source=meta&utm_medium=paid&utm_campaign=swiss_bpc_direct_v1&utm_content=CREATIVE_ID
```

Replace `CREATIVE_ID` per ad (`meta_bpc_overview`, `meta_bpc_coa`, `meta_bpc_evidence`).

### Backup landing (if Meta rejects Swiss destination)

```
https://www.grwresearch.com/research/bpc-157?utm_source=meta&utm_medium=paid&utm_campaign=swiss_bpc_edu_fallback_v1&utm_content=CREATIVE_ID
```

---

## Shared settings (paste into Ads Manager)

| Field | Value |
|--------|--------|
| Objective | **Traffic** for first test (switch to Sales later if pixel + events are ready) |
| CTA button | **Learn more** (safer than Shop now for policy) |
| Daily budget | **$20–40/day** total across 3 ads to start |
| Placements | Advantage+ / automatic; confirm Reels + Feed + Stories get the vertical 9:16 |
| Optimization | Link clicks (Traffic) |
| Audience | US; 25–54; interests around biohacking, recovery, longevity, supplements research — keep narrow at first |
| Special ad categories | Review Meta prompts; do not claim medical treatment |

**Disclosure line** (append to primary text when needed):

> Affiliate disclosure: if you use this link, GRW Marketing may earn a commission. Educational / research-use context only. Not medical advice.

---

## Ad 1 — `meta_bpc_overview`

**Video**  
`ads/meta/output/meta-bpc-overview-15s.mp4` (kept stock cut from earlier)  
Alternate Swiss end-card cut: `ads/meta/output/meta-bpc-overview-direct-15s.mp4`

**Destination**
```
https://swisschems.is/product/bpc-157-0-5mg-capsule-60-capsules/?ref=fox888&utm_source=meta&utm_medium=paid&utm_campaign=swiss_bpc_direct_v1&utm_content=meta_bpc_overview
```

**Primary text A**
```
Before you trust online peptide claims, review what BPC-157 research actually covers — and what it doesn’t.

This link goes to Swiss Chems BPC-157 product information (research-use context). Independent educational framing from GRW Research. Not medical advice.

Affiliate disclosure: we may earn a commission if you use this link.
```

**Primary text B**
```
Evidence. Limits. Quality questions.

GRW Research points researchers to merchant documentation for BPC-157 — not miracle claims. Research-use context only.
```

**Primary text C**
```
Independent BPC-157 research framing from GRW Research.

Review Swiss Chems product information via this disclosed affiliate link. Educational / research-use context only. Not medical advice.
```

**Headline**  
`BPC-157 research overview`

**Description**  
`Review product information · research use`

---

## Ad 2 — `meta_bpc_coa`

**Video**  
`ads/meta/output/meta-bpc-coa-15s.mp4`

**Destination**
```
https://swisschems.is/product/bpc-157-0-5mg-capsule-60-capsules/?ref=fox888&utm_source=meta&utm_medium=paid&utm_campaign=swiss_bpc_direct_v1&utm_content=meta_bpc_coa
```

**Primary text A**
```
How researchers evaluate peptide quality: testing transparency, labeling, and research-use notices — before opening a listing.

Review Swiss Chems BPC-157 product + testing information via this affiliate link. Not medical advice.
```

**Primary text B**
```
A practical documentation checklist for research compounds.

Ask clearer quality questions first. Then review the merchant listing.
```

**Primary text C**
```
COAs, labeling, research-use notices — the basics before you source.

Affiliate link to Swiss Chems BPC-157 product information. GRW Research is independent. Not medical advice.
```

**Headline**  
`Peptide quality checklist`

**Description**  
`Testing docs · research-use context`

---

## Ad 3 — `meta_bpc_evidence`

**Video**  
`ads/meta/output/meta-bpc-evidence-15s.mp4`

**Destination**
```
https://swisschems.is/product/bpc-157-0-5mg-capsule-60-capsules/?ref=fox888&utm_source=meta&utm_medium=paid&utm_campaign=swiss_bpc_direct_v1&utm_content=meta_bpc_evidence
```

**Primary text A**
```
Most BPC-157 claims online outrun the evidence. Mechanisms discussed in literature are not the same as proven human outcomes.

Stay cautious. Review research-use product information on Swiss Chems via this disclosed affiliate link. Not medical advice.
```

**Primary text B**
```
Separate signal from noise on BPC-157.

Education first. Commerce second. Research-use context only.
```

**Primary text C**
```
What studies discuss — and what they don’t.

Review Swiss Chems BPC-157 listing via this affiliate link. Educational framing from GRW Research. Not medical advice.
```

**Headline**  
`What the evidence does — and doesn’t — show`

**Description**  
`Independent research framing`

---

## Compliance (non-negotiable)

**Do say**
- Research overview / educational framing
- Evidence is limited / preclinical context
- Testing docs / COAs / research-use notices
- Disclosed affiliate link

**Do not say**
- Heals, cures, treats, repairs tendons/gut in humans
- Regrow, reverse aging, guaranteed results
- FDA approved / clinically proven (without verified human evidence)
- “Buy before it sells out” scarcity hype

---

## Re-render videos

Regenerates COA, evidence, and the Swiss end-card overview alternate. Does **not** overwrite the kept stock `meta-bpc-overview-15s.mp4`.

```bash
.venv-ads/bin/python ads/meta/render_meta_ads.py
```

Requires local `.venv-ads` with `pillow`, `numpy`, `imageio-ffmpeg`.
