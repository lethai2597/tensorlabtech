# Phase 04 — Detail Page: Hero 2-col + Related Section

**Priority:** High
**Status:** completed
**Blocked by:** Phase 01, Phase 02

## Overview

Rewrite hero section from centered single-col to 2-col layout with image. Add new "Related capabilities" section between features grid and CTA bottom.

## Context Links

- Current file: `app/[locale]/nang-luc/[slug]/CapabilityDetailContent.tsx` (161 lines)
- Data: `lib/capabilityData.ts` — `CAPABILITY_ITEMS` with `imagePath`
- i18n: `capabilityDetail` namespace + `landing.capabilities` namespace

## Related Code Files

- **Modify:** `app/[locale]/nang-luc/[slug]/CapabilityDetailContent.tsx`

## Architecture

```
Section 1 — Hero 2-col (REWRITE)
┌──────────────────────────────────────────┐
│ [Back link]                              │
│ ┌──────────────┐  ┌──────────────────┐   │
│ │ Icon         │  │                  │   │
│ │ Title        │  │   Capability     │   │
│ │ longDesc     │  │   Image          │   │
│ │ [CTA button] │  │   (rounded-2xl)  │   │
│ └──────────────┘  └──────────────────┘   │
└──────────────────────────────────────────┘

Section 2 — Features grid (KEEP AS-IS)
  4 SpotlightCards in grid

Section 3 — Related capabilities (NEW)
┌──────────────────────────────────────────┐
│  "Explore more capabilities"             │
│  ┌──────┐  ┌──────┐  ┌──────┐           │
│  │Icon  │  │Icon  │  │Icon  │           │
│  │Title │  │Title │  │Title │           │
│  │Desc  │  │Desc  │  │Desc  │           │
│  │Link →│  │Link →│  │Link →│           │
│  └──────┘  └──────┘  └──────┘           │
└──────────────────────────────────────────┘

Section 4 — CTA bottom (KEEP AS-IS)
```

## Implementation Steps

### 1. Hero Section Rewrite

Replace centered single-col hero with 2-col:

```tsx
<section className="relative overflow-hidden pt-6 pb-12 md:pt-8 md:pb-16">
  {/* Decorative blobs — KEEP */}

  <div className="container mx-auto px-8 relative z-10">
    {/* Back link — KEEP */}

    {/* 2-col hero */}
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
      {/* Left: content */}
      <div className="w-full md:w-1/2 space-y-6">
        <motion.div variants={fadeUp}>
          <div className="size-16 rounded-3xl bg-border flex items-center justify-center">
            <cap.icon size={32} className={cap.color} />
          </div>
        </motion.div>
        <motion.h1 variants={fadeUp}
          className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight"
        >
          {t(`items.${cap.key}.title`)}
        </motion.h1>
        <motion.p variants={fadeUp}
          className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed"
        >
          {tDetail(`items.${cap.key}.longDesc`)}
        </motion.p>
        <motion.div variants={fadeUp}>
          <Link href={{ pathname: "/contact", query: { type: "other" } }}>
            <Button type="primary" size="large" icon={<MessageCircle className="size-4" />}>
              {tDetail("ctaButton")}
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Right: image */}
      <motion.div variants={fadeUp} className="w-full md:w-1/2">
        <Image
          src={cap.imagePath}
          alt={t(`items.${cap.key}.title`)}
          width={500} height={500}
          className="rounded-2xl w-full h-auto object-cover"
          priority
        />
      </motion.div>
    </div>
  </div>
</section>
```

Key changes from current:
- Remove `max-w-3xl mx-auto text-center` centered layout
- Split into `flex flex-col md:flex-row`
- Left col: icon + title + longDesc + CTA (left-aligned)
- Right col: `next/image` with `cap.imagePath`
- Mobile: stacks vertically (content first, then image)

### 2. Features Grid — KEEP AS-IS

No changes to the SpotlightCard features grid section (lines 92-135).

### 3. Related Capabilities Section (NEW)

Add between features grid and CTA bottom:

```tsx
{/* ── Related capabilities ── */}
<section className="py-16 md:py-20 bg-background">
  <div className="container mx-auto px-8">
    <motion.h2 variants={fadeUp} {...motionProps}
      className="text-2xl font-semibold text-foreground text-center mb-10"
    >
      {tDetail("relatedTitle")}
    </motion.h2>
    <motion.div {...motionProps} variants={stagger}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {CAPABILITY_ITEMS.filter(c => c.slug !== slug).slice(0, 3).map((related) => (
        <motion.div key={related.key} variants={fadeUp}>
          <Link href={`/nang-luc/${related.slug}`} className="block h-full no-underline group">
            <SpotlightCard spotlightColor={related.spotlightColor}
              tabIndex={-1}
              className="h-full cursor-pointer border-transparent transition duration-300 hover:border-border hover:-translate-y-0.5"
            >
              <div className="size-10 rounded-xl bg-border flex items-center justify-center mb-3">
                <related.icon size={20} className={related.color} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t(`items.${related.key}.title`)}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3">
                {t(`items.${related.key}.desc`)}
              </p>
              <span className={`text-sm font-medium ${related.color}`}>
                {tDetail("learnMore")} →
              </span>
            </SpotlightCard>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>
```

### 4. i18n — ONE new key needed

Wait — the brainstorm says "zero new i18n keys", but we need a section title for "Related capabilities". Options:
- **Option A:** Use `tDetail("viewAll")` ("View all capabilities") — not quite right
- **Option B:** Add one i18n key `capabilityDetail.relatedTitle` = "Explore more capabilities"
- **Recommendation:** Option B — one key is trivial, better UX

Add to `locales/en.json` and `locales/vi.json`:
```json
"capabilityDetail": {
  ...
  "relatedTitle": "Explore more capabilities"
}
```

Vietnamese:
```json
"relatedTitle": "Khám phá thêm năng lực"
```

### 5. New Imports

Add to existing imports:
```tsx
import Image from "next/image";
import { CAPABILITY_ITEMS } from "@/lib/capabilityData";
```

`CAPABILITY_ITEMS` is needed for the related section filter. `getCapabilityBySlug` already imported.

### 6. Run compile + lint check

## Todo

- [x] Add `Image` import from `next/image`
- [x] Add `CAPABILITY_ITEMS` import
- [x] Rewrite hero section: centered → 2-col (content left, image right)
- [x] Keep features grid section unchanged
- [x] Add related capabilities section (3 cards, filter out current)
- [x] Keep CTA bottom section unchanged
- [x] Add `relatedTitle` i18n key to `en.json` and `vi.json`
- [x] Run compile + lint check

## Success Criteria

- Hero: 2-col layout with capability image on right
- Features grid: unchanged
- Related section: shows 3 other capabilities as SpotlightCards
- CTA bottom: unchanged
- Mobile: hero stacks vertically, related cards stack
- Framer Motion animations preserved throughout
- No TypeScript errors

## Security Considerations

- `next/image` handles image optimization + prevents large unoptimized images
- No user input involved — all data from static `CAPABILITY_ITEMS`
