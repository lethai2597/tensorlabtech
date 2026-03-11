# Planner Report: Năng lực Landing Page Redesign

**Date:** 2026-03-11 | **Status:** plan complete

## Deliverables

- `plans/260311-1047-nang-luc-landing-page-redesign/plan.md` — overview + dependency graph
- `phase-01-ai-image-generation.md` — 6 images via Nano Banana, prompts documented
- `phase-02-data-layer-imagepath.md` — add `imagePath` to CapabilityItem type
- `phase-03-list-page-alternating-rows.md` — list page rewrite with full code snippets
- `phase-04-detail-page-hero-and-related.md` — detail page rewrite with full code snippets

## Dependency Graph

```
Task #5: Phase 01 (images) — no blockers
  └─▶ Task #6: Phase 02 (data layer) — blocked by #5
        ├─▶ Task #7: Phase 03 (list page) — blocked by #5, #6
        └─▶ Task #8: Phase 04 (detail page) — blocked by #5, #6
```

Tasks #7 and #8 can execute in parallel after #5 + #6 complete.

## Files Modified/Created

| Phase | Action | File |
|-------|--------|------|
| 01 | Create | `public/images/capabilities/{consulting,dx,product,ai,web3,cloud}.png` |
| 02 | Modify | `lib/capabilityData.ts` |
| 03 | Modify | `app/[locale]/nang-luc/CapabilitiesListContent.tsx` |
| 04 | Modify | `app/[locale]/nang-luc/[slug]/CapabilityDetailContent.tsx` |
| 04 | Modify | `locales/en.json`, `locales/vi.json` (1 key: `relatedTitle`) |

## Key Decisions

- Zero new i18n keys for Phase 02/03; one new key (`relatedTitle`) for Phase 04
- `imagePath` stored in data layer, not hardcoded in components
- Related capabilities: simple filter + slice, no complex logic
- next/image for all capability images (optimization + lazy loading)
- Prompt template uses matching accent colors from spotlightColor

## Unresolved Questions

- None — all decisions settled in brainstorm.
