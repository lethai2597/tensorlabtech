# Brainstorm: Năng Lực List + Detail Pages

**Date:** 2026-03-11 | **Status:** ✅ Agreed → Implementation Plan Requested

---

## Problem Statement
No dedicated list/detail pages for capabilities (năng lực). Homepage has a capabilities section but no drill-down. Need `/nang-luc` list + `/nang-luc/[slug]` detail pages matching site design language.

## Solution Architecture
Clone `/projects` → `/nang-luc` pattern (KISS). Reuse SpotlightCard, SectionHeader, ShinyText, Framer Motion variants. Single data file as source of truth.

## Data Layer
`lib/capabilityData.ts` — single source of truth (DRY)
```
CapabilityItem {
  slug: string           // e.g. "consulting", "ai"
  icon: ReactNode
  gradient: string       // unique per capability
  titleKey: string       // i18n key
  descShortKey: string   // for card
  descLongKey: string    // for detail hero
  features: Feature[]    // placeholder array (4-6 items each)
}
```
6 items: `consulting` `dx` `product` `ai` `web3` `cloud`

## Routing Structure
```
app/[locale]/
  nang-luc/
    page.tsx          → list (SSR)
    [slug]/
      page.tsx        → detail (SSR)
      not-found.tsx   → invalid slug guard
```

## List Page Design
- SectionHeader + ShinyText title
- Cards grid: 3col desktop / 2col tablet / 1col mobile
- SpotlightCard reused — icon + gradient + short desc + "Xem chi tiết" link
- Framer Motion: staggered fade-in (landingMotion variants)
- Same spacing/padding tokens as /projects list

## Detail Page Design
| Section | Content |
|---|---|
| Hero | Large icon, title (ShinyText), long desc, gradient accent bar |
| Features grid | 4-6 feature cards (placeholder), 2col layout |
| CTA | "Liên hệ tư vấn" button → /lien-he |
- Back link: "← Tất cả năng lực"
- Same border-radius, color tokens, animation variants as rest of landing

## Homepage Sync (3 changes needed)
1. **Capability cards** → wrap with `<Link href="/nang-luc/[slug]">` (currently static)
2. **Section footer** → add "Xem tất cả năng lực" button linking to `/nang-luc`
3. **capabilityData.ts** → extract existing hardcoded data from homepage component into shared file

## Navigation
- Header menu: add "Năng Lực" item → `/nang-luc` (desktop + mobile)
- Homepage capability cards: clickable (change 1)
- "Xem tất cả" CTA on homepage section (change 2)
- Breadcrumb on detail page: Home → Năng Lực → [Title]

## Key Decision: DRY — Single Source of Truth (`capabilityData.ts`)
Homepage, list page, and detail page all import from `lib/capabilityData.ts`. No duplicated capability metadata. Features array starts as placeholder; content team fills later.

## Effort Estimate

| Task | Effort |
|---|---|
| `lib/capabilityData.ts` (extract + structure) | 1h |
| `/nang-luc/page.tsx` list page | 1.5h |
| `/nang-luc/[slug]/page.tsx` detail page | 2h |
| Homepage sync (3 changes) | 0.5h |
| Header nav update | 0.5h |
| i18n keys (en + vi) | 0.5h |
| **Total** | **~6h** |

## Risk Assessment
| Risk | Mitigation |
|---|---|
| Homepage capability data tightly coupled to component | Extract carefully, verify homepage still renders |
| Slug mismatch (i18n URL vs data key) | Use fixed English slugs, locale only affects display text |
| Feature placeholder content looks empty | Use generic placeholder items with icons until real content |

## Content Strategy (placeholder for `features[]` arrays)
Each capability gets 4-6 placeholder features. Example shape:
```ts
features: [
  { icon: CheckCircle, titleKey: "cap.consulting.f1.title", descKey: "cap.consulting.f1.desc" },
  // ...
]
```
Titles/descs use i18n keys → easy content swap later without code changes. Placeholder i18n values: generic but contextually relevant per capability domain.
