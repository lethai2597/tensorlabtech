# Brainstorm: Năng lực Pages — Landing Page Redesign

**Date:** 2026-03-11 | **Status:** agreed → plan pending

## Problem

Current `/nang-luc` list + detail pages are too shallow — 3-col grid cards with minimal text, detail has only 3 sections. Needs to feel like landing pages with real content to read.

## Requirements

- List: vertical alternating-row layout (not grid), AI-gen square images, show longDesc + 2 feature bullets per row
- Detail: longer, more immersive — hero 2-col with image, features grid, related capabilities, CTA

## Solution

### List page `/nang-luc` — Alternating row

```
Row odd:   [Ảnh 400x400] | [Icon · Title · longDesc · 2 features · Learn more →]
Row even:  [Icon · Title · longDesc · 2 features · Learn more →] | [Ảnh 400x400]
```

- Images: AI-gen abstract/tech per capability → `/public/images/capabilities/{slug}.png`
- Content: tái dùng `capabilityDetail.items.{key}.longDesc` + `features[0..1]` — zero new i18n keys

### Detail page `/nang-luc/[slug]` — 4 sections

1. **Hero 2-col** — left: breadcrumb + icon + title + longDesc + CTA; right: capability image
2. **Features grid** — 4 SpotlightCards (existing, keep)
3. **Related capabilities** — 3 horizontal cards, `CAPABILITY_ITEMS.filter(c => c.slug !== slug).slice(0,3)`
4. **CTA bottom** — existing, keep

## Files to modify

- `lib/capabilityData.ts` — add `imagePath: string` field
- `app/[locale]/nang-luc/CapabilitiesListContent.tsx` — rewrite to alternating rows
- `app/[locale]/nang-luc/[slug]/CapabilityDetailContent.tsx` — add hero 2-col + related section
- `/public/images/capabilities/` — 6 images (consulting, dx, product, ai, web3, cloud)
- i18n: no new keys needed

## Rejected options

- Testimonials: placeholder fake social proof không nên xuất hiện trên B2B site thật
- How we work process steps: cần 60 dòng i18n, value chưa rõ — YAGNI
- Card vertical full-width + banner: ít visual impact hơn alternating

## Risks

- Mobile: 2-col stacks to vertical (standard handling, no issue)
- Image gen quality: abstract tech style phải nhất quán giữa 6 ảnh — dùng cùng prompt template
