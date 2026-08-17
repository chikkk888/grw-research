# Affiliate Playbook

## Affiliate Strategy Overview
Primary model: educational publication → disclosed affiliate CTA.  
Cold paid traffic lands on GRW guides first. Merchant links are secondary evaluation steps.

Active merchant: **Swiss Chems** (`ref=fox888`) on BPC-157.  
Pending: **Peptime** affiliate application (evaluate when approved; do not replace Swiss Chems blindly).

## Partner Selection Criteria
- Research-use labeling clarity
- Testing / COA transparency
- Checkout and shipping clarity
- Affiliate tracking reliability
- Fit with GRW’s independent publication tone
- Regulatory / enforcement baggage (document honestly; do not hide)

## Disclosure & Compliance
- Sitewide + in-page affiliate disclosure
- No unsupported medical claims
- Separate education from commerce visually
- `rel="sponsored nofollow"` on affiliate anchors
- See `docs/AFFILIATE_COMPLIANCE.md`

## Placement Guidelines
- Soft CTAs after educational sections
- Prefer “review product information / documentation” language
- Never lead homepage with hard sell
- Paid ads: promote guides, not raw product URLs (especially cold traffic)

## Offer Mapping to Content
| Content | Merchant offer | Status |
|---------|----------------|--------|
| `/research/bpc-157` | Swiss Chems BPC-157 capsules | Live |
| `/research/tb-500` | Swiss Chems TB-500 analogue capsules (0.5 mg, 60 count) | Live |
| Future GHK-Cu / other peptides | TBD | Waiting on product URLs / partners |

## Tracking & Attribution
### Paid → site
Use UTMs on all paid destinations:
`utm_source` · `utm_medium=paid` · `utm_campaign` · `utm_content` (creative id)

Pinterest v1 campaign: `swiss_bpc_edu_v1`  
Launch doc: `docs/PINTEREST_SWISS_CHEMS_LAUNCH.md`

### Site → merchant
Swiss Chems click-outs append `ref=fox888` via `src/config/affiliates.ts`.  
Track `affiliate_click` in analytics when possible.

## Performance Optimization
1. Optimize for landing engagement before sales
2. Kill weak creatives early on CTR / bounce
3. Scale only winners
4. Add remarketing to guide readers before testing direct merchant traffic

## Partner Relationship Notes
- Swiss Chems: approved; public Meta affiliates often use quality/COA angles + bridge pages
- Peptime: applied; higher published commission / US positioning — reassess after approval
- Keep dual-merchant option open for editorial comparisons once both are live
