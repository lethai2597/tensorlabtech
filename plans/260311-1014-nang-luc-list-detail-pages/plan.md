# Plan: Năng lực — List + Detail Pages

**Date:** 2026-03-11 | **Status:** completed (100%)
**Brainstorm:** `plans/reports/brainstorm-260311-1014-nang-luc-list-detail-pages.md`

## Overview

Expand the static "Năng lực" homepage section into full list + detail pages with DRY data layer.

## Phases

| # | Phase | Status | Est |
|---|-------|--------|-----|
| 01 | [Data layer — capabilityData.ts](./phase-01-data-layer.md) | ✅ completed | 1h |
| 02 | [List page — /nang-luc](./phase-02-list-page.md) | ✅ completed | 1.5h |
| 03 | [Detail page — /nang-luc/[slug]](./phase-03-detail-page.md) | ✅ completed | 2h |
| 04 | [Homepage sync + Navigation](./phase-04-homepage-sync-and-nav.md) | ✅ completed | 1h |

**Total:** ~5.5h ✅ All phases complete

## Key Decisions

- Clone `/projects` → `/projects/[slug]` pattern (KISS)
- `lib/capabilityData.ts` = single source of truth (DRY) — all 3 surfaces import from it
- Slugs: fixed English (`consulting`, `dx`, `product`, `ai`, `web3`, `cloud`)
- Features content: i18n-keyed placeholders (real content filled later)
- Design tokens: same as landing (no new tokens), layout differs

## Dependencies

- Phase 01 must complete before 02, 03, 04
- Phase 02 & 03 can run in parallel after 01
- Phase 04 after 01 (depends on data extraction)
