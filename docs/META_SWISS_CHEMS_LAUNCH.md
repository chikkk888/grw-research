# Meta Launch — Swiss Chems / BPC-157 (Direct)

**Status:** Creatives ready — do not spend until you intentionally turn ads on  
**Merchant:** Swiss Chems (affiliate `ref=fox888`)  
**Model:** Paid Meta traffic → Swiss Chems product page (direct)  
**Creative kit:** `ads/meta/`  
**Copy kit:** `ads/meta/ad-copy.md`

GRW Research remains the brand in the video. The **Ads Manager destination** is Swiss Chems.

Pinterest stays on **still pins → GRW guide** for cheaper learning.

**Two Meta lanes (don’t mix in one campaign):**
1. **Direct Swiss** — text/stock videos in `ads/meta/` + `ads/meta/ad-copy.md` (higher reject/bounce risk)
2. **Atlas character → GRW guide** — animated lane in `ads/meta/character/` (preferred for creative/trust)

---

## 1. Files to upload

| Creative ID | File | Length | Notes |
|-------------|------|--------|------|
| `meta_bpc_overview` | `ads/meta/output/meta-bpc-overview-15s.mp4` | ~16s | Kept stock cut (1080×1920) |
| `meta_bpc_coa` | `ads/meta/output/meta-bpc-coa-15s.mp4` | 15s | New text-slide cut |
| `meta_bpc_evidence` | `ads/meta/output/meta-bpc-evidence-15s.mp4` | 15s | New text-slide cut |
| (optional) | `ads/meta/output/meta-bpc-overview-direct-15s.mp4` | 15s | Swiss end-card alternate |

Re-render COA / evidence / direct alternate (does not overwrite stock overview):

```bash
.venv-ads/bin/python ads/meta/render_meta_ads.py
```

---

## 2. Campaign setup (Meta Ads Manager)

| Setting | Value |
|--------|--------|
| Objective | **Traffic** (first test) |
| Daily budget | **$20–40/day** total |
| Bid | Highest volume / automatic |
| CTA | **Learn more** |
| Destination | Swiss URLs in `ads/meta/ad-copy.md` (not the GRW guide) |
| Format | One ad set, 3 video ads |
| Duration | 5–7 days before major cuts |

### Destination URLs (copy exactly)

Overview:
```
https://swisschems.is/product/bpc-157-0-5mg-capsule-60-capsules/?ref=fox888&utm_source=meta&utm_medium=paid&utm_campaign=swiss_bpc_direct_v1&utm_content=meta_bpc_overview
```

COA:
```
https://swisschems.is/product/bpc-157-0-5mg-capsule-60-capsules/?ref=fox888&utm_source=meta&utm_medium=paid&utm_campaign=swiss_bpc_direct_v1&utm_content=meta_bpc_coa
```

Evidence:
```
https://swisschems.is/product/bpc-157-0-5mg-capsule-60-capsules/?ref=fox888&utm_source=meta&utm_medium=paid&utm_campaign=swiss_bpc_direct_v1&utm_content=meta_bpc_evidence
```

### If Meta rejects the Swiss URL

1. Switch destination to GRW backup URL in `ads/meta/ad-copy.md`  
2. Keep the same videos  
3. Rely on on-page Swiss CTA with `ref=fox888`  
4. Re-attempt direct later with softer primary text

---

## 3. Compliance rules

Same rules as Pinterest edu, plus destination risk:

**Do**
- Research / educational framing in primary text
- Disclose affiliate relationship
- Research-use / not medical advice

**Do not**
- Heal, cure, treat, guarantee
- Imply FDA approval or that PCAC vote = drug approval
- Fake scarcity, fake lab badges, fabricated testimonials

Direct peptide/research-chem destinations get rejected more often than educational landers. Budget for creative + copy retries.

---

## 4. Pre-flight checklist

- [ ] Confirm Swiss URL loads with `?ref=fox888`
- [ ] Upload 3 videos to Meta Ads Manager
- [ ] Paste primary text + headline from `ads/meta/ad-copy.md`
- [ ] Set CTA to Learn more
- [ ] Mark AI-modified / AI-generated if Meta asks
- [ ] Meta Pixel optional for Traffic tests; required later for Sales optimization
- [ ] Start at $20–40/day; do not scale on day 1
- [ ] Screenshot any rejection reason immediately

---

## 5. Success metrics (days 1–7)

| Metric | Early signal |
|--------|----------------|
| CTR (link) | Learn baseline; pause if near-zero after ~$25/ad |
| CPC | Expect higher than Pinterest stills |
| Landing bounce on Swiss | High is common on cold direct traffic |
| Purchases | Track via Swiss affiliate dashboard + UTMs |
| Policy | 0 account warnings preferred — pause if restricted |

**Pause rule:** After ~$40 on one ad with CTR < ~0.4% and no affiliate events → pause and swap primary text or creative.

---

## 6. Relationship to Pinterest

| Channel | Creative | Destination | Job |
|---------|----------|-------------|-----|
| Pinterest | Still pins | GRW `/research/bpc-157` | Cheap education + trust |
| Meta | These videos | Swiss Chems product | Direct affiliate when ready to spend |

Do not migrate Pinterest to video until still pins are stable. Video CPM is usually higher there.
