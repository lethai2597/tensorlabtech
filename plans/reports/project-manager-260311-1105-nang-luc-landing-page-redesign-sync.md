# Plan Sync: Năng lực Landing Page Redesign — COMPLETED

**Plan:** 260311-1047-nang-luc-landing-page-redesign
**Date:** 2026-03-11
**Status:** ✅ All 4 phases completed 100%

---

## Implementation Summary

### Phase 01 — AI Image Generation ✅
- Generated 6 square PNG images (400x400+) with dark tech aesthetic
- Output: `public/images/capabilities/{consulting,dx,product,ai,web3,cloud}.png`
- Each image matches capability's `spotlightColor` accent (cyan, green, blue, amber, red, sky-blue)
- Consistent style: dark background, professional, geometric, minimal

### Phase 02 — Data Layer ✅
- Added `imagePath: string` field to `CapabilityItem` type
- Updated all 6 `CAPABILITY_ITEMS` with correct image paths
- Type-safe integration ready for UI consumption

### Phase 03 — List Page Redesign ✅
- Rewrote `CapabilitiesListContent.tsx`: 3-col grid → alternating-row layout
- Each row: image (left/right alternating) + icon + title + longDesc + 2 feature bullets + learn more link
- Mobile: single column, image on top
- Framer Motion stagger animations preserved
- No new i18n keys needed (reuses `capabilityDetail.items.{key}.longDesc` + `features`)

### Phase 04 — Detail Page Redesign ✅
- Rewrote hero section: centered single-col → 2-col layout (text left, image right)
- Features grid: unchanged
- **New:** Related capabilities section (3 SpotlightCards, filtered to exclude current capability)
- Added 1 i18n key: `capabilityDetail.relatedTitle` (en: "Explore more capabilities", vi: "Khám phá thêm năng lực")
- Framer Motion animations preserved throughout

---

## Files Modified

| File | Changes |
|------|---------|
| `public/images/capabilities/*.png` | 6 new images generated |
| `lib/capabilityData.ts` | Added `imagePath` to type + all 6 items |
| `app/[locale]/nang-luc/CapabilitiesListContent.tsx` | Grid → alternating rows w/ images |
| `app/[locale]/nang-luc/[slug]/CapabilityDetailContent.tsx` | Hero 2-col + related section |
| `locales/en.json` | Added `capabilityDetail.relatedTitle` |
| `locales/vi.json` | Added `capabilityDetail.relatedTitle` |

---

## Docs Impact

**Status:** `none`

- No changes to API contracts, Zustand patterns, or theme system
- Changes are purely UI component rewrites + data layer addition
- Existing docs (api.md, zustand.md, custom-theme.md) remain current and unaffected
- No breaking changes to architectural patterns

---

## Plan Files Updated

- ✅ `/plans/260311-1047-nang-luc-landing-page-redesign/plan.md` → status: **completed 100%**
- ✅ Phase 01 status → **completed**
- ✅ Phase 02 status → **completed**
- ✅ Phase 03 status → **completed**
- ✅ Phase 04 status → **completed**
- ✅ All phase todo lists → all items checked

---

## Key Metrics

- **Phases:** 4/4 complete
- **Images:** 6/6 generated + verified
- **Components rewritten:** 2 (list + detail)
- **i18n keys added:** 1
- **New data fields:** 1 (`imagePath`)
- **Breaking changes:** 0
- **Docs updates needed:** 0

---

**Ready for:** Production deployment / staging review
