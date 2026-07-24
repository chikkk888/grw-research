# Pinterest Launch — Swiss Chems / BPC-157 (Educational)

**Status:** Ready to launch  
**Merchant:** Swiss Chems (active affiliate `ref=fox888`)  
**Landing page:** `https://www.grwresearch.com/research/bpc-157`  
**Model:** Paid traffic → educational guide → disclosed affiliate CTA (not direct-to-store)

Before changing strategy, keep GRW as an independent publication. Ads sell the *guide*, not the vial.

---

## 1. Campaign setup (Pinterest Ads Manager)

| Setting | Value |
|--------|--------|
| Objective | **Traffic** (first 14 days) — switch to Conversions later once GA4 events are solid |
| Daily budget | **$10–15/day** to start |
| Bid | Automatic |
| Duration | 14 days minimum before major changes |
| Destination | Landing URL below (not Swiss Chems) |
| Audience | US (expand later); 25–54; interests: biohacking, fitness recovery, longevity, skincare science, supplements research, health education |
| Exclusions | Avoid “weight loss miracle”, bodybuilding steroid-adjacent if available as negative interests |

### Destination URL (copy exactly)

```
https://www.grwresearch.com/research/bpc-157?utm_source=pinterest&utm_medium=paid&utm_campaign=swiss_bpc_edu_v1&utm_content={{pin_name}}
```

Replace `{{pin_name}}` per pin, e.g. `pin_what_is_bpc`, `pin_coa_checklist`, `pin_evidence_limits`.

### Tracking checklist

- [ ] GA4 live on site
- [ ] Event `affiliate_click` fires on Swiss Chems CTA
- [ ] Event `email_signup` if form used
- [ ] Pinterest Tag installed later (optional week 2) — do not invent a fake ID
- [ ] Confirm CTA still resolves to `?ref=fox888`

---

## 2. Compliance rules (non-negotiable)

**Do say**
- Research overview / educational guide
- Evidence is limited / preclinical context
- How to evaluate testing docs / COAs
- Research-use considerations
- Independent publication; disclosed affiliate links

**Do not say**
- Heals, cures, treats, repairs tendons/gut in humans
- Regrow, reverse aging, guaranteed results
- “Clinically proven” without cited human evidence
- “Buy BPC-157 now” as the primary pin message
- Implying Swiss Chems is FDA-approved or that PCAC vote = drug approval

Pin → guide. Guide → soft merchant CTA. Never skip the middle on cold traffic.

---

## 3. Creative system (3 pins to start)

Run **3 pins × 1 ad group**. Kill losers after ~$30–40 spend each if CTR < ~0.6% or bounce is extreme.

| Pin ID | Angle | Goal |
|--------|-------|------|
| `pin_what_is_bpc` | What BPC-157 is (research framing) | Awareness + guide reads |
| `pin_evidence_limits` | What the evidence does / doesn’t show | Trust / EEAT |
| `pin_coa_checklist` | How researchers evaluate product documentation | Soft commercial intent |

**Image specs**
- Vertical **2:3** (1000×1500) preferred
- Clean, scientific, editorial — not gym-bro / neon / “before-after body”
- Brand mark: **GRW Research**
- One short headline on-image (large type)
- No fake lab badges, no medical-clinic cosplay

Full copy: `ads/pinterest/pin-copy.md`

---

## 4. Success metrics (days 1–14)

| Metric | Good early signal |
|--------|-------------------|
| CTR (outbound) | ≥ 0.8% |
| CPC | Learn baseline; don’t panic if $0.30–$1.00 |
| Landing engagement | Avg time on page ≥ 45–60s |
| Scroll / CTA view | CTA section reached |
| Affiliate click-out rate | Track; even 2–5% of sessions is useful early |
| Sales | Nice-to-have; not the kill criterion yet |

**Pause rule:** After $40 on a pin with CTR < 0.5% and no meaningful time-on-page → pause and replace creative.

---

## 5. Week 2 expansion (only if week 1 works)

1. Duplicate winners; test new headlines only  
2. Add one “PCAC news explained carefully” pin (no approval claims)  
3. Optional: install Pinterest Tag + event for CTA clicks  
4. Raise budget 20–30% on winners only  
5. Consider Meta educational ads using the same landing URL pattern

---

## 6. Why not direct-to-Swiss-Chems on Pinterest (still)

Cold pins that skip the guide usually waste budget and raise policy risk. Warm readers who finished the guide are the ones who should see the merchant CTA.

---

## 7. Launch day checklist

- [ ] Business account + billing set on Pinterest
- [ ] Domain claimed / verified for grwresearch.com if required
- [ ] 3 pin images uploaded
- [ ] Destination URLs with UTMs
- [ ] Campaign named `swiss_bpc_edu_v1`
- [ ] Soft affiliate CTA live on `/research/bpc-157`
- [ ] Hard refresh CTA → confirms `ref=fox888`
- [ ] Screenshot Ad Library / ads manager for records

---

## Related

- Pin scripts: `ads/pinterest/pin-copy.md`
- Project context: `docs/GRW_PROJECT_CONTEXT.md`
- Affiliate compliance: `docs/AFFILIATE_COMPLIANCE.md`
