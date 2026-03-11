# Năng lực Pages — Landing Page Redesign

**Date:** 2026-03-11 | **Status:** completed 100%

## Goal

Transform `/nang-luc` list + detail pages from shallow grid cards into immersive landing pages with AI-generated images, alternating-row layout (list), and 2-col hero + related capabilities section (detail).

## Phases

| # | Phase | Status | Blocked by | Files |
|---|-------|--------|------------|-------|
| 01 | AI image generation | completed | — | `public/images/capabilities/{slug}.png` x6 |
| 02 | Data layer — add imagePath | completed | 01 | `lib/capabilityData.ts` |
| 03 | List page — alternating rows | completed | 01, 02 | `app/[locale]/nang-luc/CapabilitiesListContent.tsx` |
| 04 | Detail page — hero + related | completed | 01, 02 | `app/[locale]/nang-luc/[slug]/CapabilityDetailContent.tsx` |

## Dependencies

```
Phase 01 (images)
  └─▶ Phase 02 (data layer)
        ├─▶ Phase 03 (list page)
        └─▶ Phase 04 (detail page)
```

Phase 03 and 04 can run in parallel after 01+02 complete.

## Key Decisions

- **Zero new i18n keys** — reuse `capabilityDetail.items.{key}.longDesc` + `features[0..1]`
- **imagePath** pattern: `/images/capabilities/{slug}.png`
- **Related capabilities**: `CAPABILITY_ITEMS.filter(c => c.slug !== slug).slice(0, 3)`
- **next/image** for all capability images (optimization + lazy loading)
- **Framer Motion** stagger animations preserved on both pages

## Phase Details

- [Phase 01 — AI Image Generation](./phase-01-ai-image-generation.md)
- [Phase 02 — Data Layer imagePath](./phase-02-data-layer-imagepath.md)
- [Phase 03 — List Page Alternating Rows](./phase-03-list-page-alternating-rows.md)
- [Phase 04 — Detail Page Hero & Related](./phase-04-detail-page-hero-and-related.md)
