# Phase 03 — List Page: Alternating Rows

**Priority:** High
**Status:** completed
**Blocked by:** Phase 01, Phase 02

## Overview

Rewrite `CapabilitiesListContent.tsx` from 3-col grid to vertical alternating-row layout with images, long descriptions, and feature bullets.

## Context Links

- Current file: `app/[locale]/nang-luc/CapabilitiesListContent.tsx` (93 lines)
- Data: `lib/capabilityData.ts` — `CAPABILITY_ITEMS` with new `imagePath`
- i18n keys used:
  - `capabilityList.tag`, `.title`, `.desc`, `.learnMore` (existing)
  - `capabilityDetail.items.{key}.longDesc` (existing)
  - `capabilityDetail.items.{key}.features` (existing, array of `{title, desc}`)
  - `landing.capabilities.items.{key}.title` (existing)

## Related Code Files

- **Modify:** `app/[locale]/nang-luc/CapabilitiesListContent.tsx`

## Architecture

```
Page header (tag + title + desc) — KEEP AS-IS

Row layout (6 rows, alternating):
┌─────────────────────────────────────────────┐
│ Row 0 (even): [Image]     | [Content]       │  ← img left
│ Row 1 (odd):  [Content]   | [Image]         │  ← img right
│ Row 2 (even): [Image]     | [Content]       │
│ ...                                          │
└─────────────────────────────────────────────┘

Content per row:
  - Icon badge (existing rounded-2xl bg-border pattern)
  - Title (h2, existing i18n key)
  - longDesc paragraph (from capabilityDetail)
  - 2 feature bullets: features[0].title + features[0].desc, features[1] same
  - "Learn more →" link to /nang-luc/{slug}

Mobile: single column, image on top, content below
```

## Implementation Steps

1. Keep all existing imports + add `Image` from `next/image`
2. Keep page header section unchanged
3. Replace `<motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">` with vertical row layout
4. For each `CAPABILITY_ITEMS` item, render alternating 2-col row:

```tsx
{CAPABILITY_ITEMS.map((cap, idx) => {
  const isEven = idx % 2 === 0;

  // Read features safely
  let features: { title: string; desc: string }[] = [];
  try {
    features = tDetail.raw(`items.${cap.key}.features`) as typeof features;
  } catch { features = []; }

  return (
    <motion.div key={cap.key} variants={fadeUp}
      className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 py-12 ${
        !isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Image */}
      <div className="w-full md:w-1/2 flex-shrink-0">
        <Image
          src={cap.imagePath}
          alt={tCaps(`items.${cap.key}.title`)}
          width={400} height={400}
          className="rounded-2xl w-full h-auto object-cover"
        />
      </div>

      {/* Content */}
      <div className="w-full md:w-1/2 space-y-4">
        <div className="size-12 rounded-2xl bg-border flex items-center justify-center">
          <cap.icon size={22} className={cap.color} />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          {tCaps(`items.${cap.key}.title`)}
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {tDetail(`items.${cap.key}.longDesc`)}
        </p>
        {features.length >= 2 && (
          <ul className="space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
            {features.slice(0, 2).map((f, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className={`mt-1.5 size-1.5 rounded-full ${cap.color.replace('text-', 'bg-')} flex-shrink-0`} />
                <span><strong className="text-foreground">{f.title}</strong> — {f.desc}</span>
              </li>
            ))}
          </ul>
        )}
        <Link href={`/nang-luc/${cap.slug}`}
          className={`inline-flex items-center gap-1 text-sm font-medium ${cap.color} no-underline hover:underline`}
        >
          {t("learnMore")} →
        </Link>
      </div>
    </motion.div>
  );
})}
```

5. Add `useTranslations("capabilityDetail")` as `tDetail` (new translator)
6. Wrap row container in `<motion.div>` with stagger
7. Keep Framer Motion: `initial="hidden" whileInView="visible" viewport={landingViewport} variants={stagger}`
8. Run lint/compile check

## Key Notes

- `tDetail.raw()` returns the raw JSON value — cast to `{ title: string; desc: string }[]`
- Color class replacement for bullet dots: `text-info` → `bg-info` (Tailwind)
- No new i18n keys needed
- Divider between rows optional — `py-12` spacing should suffice

## Todo

- [x] Add `Image` import from `next/image`
- [x] Add `tDetail` translator for `capabilityDetail`
- [x] Replace 3-col grid with alternating row layout
- [x] Each row: image + icon + title + longDesc + 2 features + learn more link
- [x] Alternation: even=img left, odd=img right (md:flex-row-reverse)
- [x] Mobile: single col, img on top
- [x] Verify stagger animations work
- [x] Run compile + lint check

## Success Criteria

- 6 vertical rows with alternating image placement
- Each row shows image, icon, title, longDesc, 2 feature bullets, learn more link
- Framer Motion stagger animations preserved
- Mobile: stacks to single column
- No new i18n keys
- No TypeScript errors
