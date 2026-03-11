# Phase 04 — Homepage Sync + Navigation

**Status:** ✅ completed | **Est:** 1h | **Blocked by:** Phase 01
**Priority:** High

## Context Links
- Homepage section: `components/landing/TensorLabLandingPage/sections/CapabilitiesSection.tsx`
- Header nav: `components/layout/Header.tsx`
- Data source: `lib/capabilityData.ts` (Phase 01)
- i18n: `locales/en.json` + `locales/vi.json` → `capabilityDetail.viewAll`, `capabilityDetail.learnMore`

## Overview

3 changes to `CapabilitiesSection.tsx` + 1 change to `Header.tsx`:

1. Cards → clickable `<Link>` wrapping `SpotlightCard` → `/nang-luc/[slug]`
2. Add **"Xem tất cả năng lực"** button at bottom of section → `/nang-luc`
3. Header nav → change `capabilities` item from `hash: "capabilities"` to `href: "/nang-luc"`

## Files to Modify

- `components/landing/TensorLabLandingPage/sections/CapabilitiesSection.tsx`
- `components/layout/Header.tsx`

## Change 1 & 2 — CapabilitiesSection.tsx

**Current state (lines 86–109):**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {capabilityItems.map((c) => (
    <motion.div key={c.key} variants={fadeUp}>
      <SpotlightCard ...>
        {/* ArrowUpRight icon, icon, title, desc */}
      </SpotlightCard>
    </motion.div>
  ))}
</div>
```

**After change:**
```tsx
import { Link } from "@/i18n/navigation";
import { Button } from "antd";
import { CAPABILITY_ITEMS } from "@/lib/capabilityData";
// remove local capabilityItems const

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {CAPABILITY_ITEMS.map((c) => (
    <motion.div key={c.key} variants={fadeUp}>
      {/* Wrap with Link — makes entire card clickable */}
      <Link href={`/nang-luc/${c.slug}`} className="block h-full no-underline group">
        <SpotlightCard
          spotlightColor={c.spotlightColor}
          tabIndex={-1}
          className="h-full cursor-pointer border-transparent transition duration-300 hover:border-border hover:-translate-y-0.5"
        >
          <div className="absolute top-6 right-6 ...">
            <ArrowUpRight className="size-4" />
          </div>
          <div className="size-12 rounded-2xl bg-border flex items-center justify-center mb-4">
            <c.icon size={22} className={c.color} />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            {t(`items.${c.key}.title`)}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {t(`items.${c.key}.desc`)}
          </p>
        </SpotlightCard>
      </Link>
    </motion.div>
  ))}
</div>

{/* "View all" CTA — new addition below grid */}
<motion.div variants={fadeUp} className="flex justify-center mt-12">
  <Link href="/nang-luc">
    <Button size="large">
      {tDetail("viewAll")} →
    </Button>
  </Link>
</motion.div>
```

**Key notes:**
- Add `import { Link } from "@/i18n/navigation"` and `import { Button } from "antd"`
- Add `import { useTranslations } from "next-intl"` for `tDetail` (second `useTranslations` call for `capabilityDetail`)
- Remove the `capabilityItems` local const (now imported from `lib/capabilityData`)
- `tabIndex={-1}` on `SpotlightCard` so `Link` handles keyboard navigation

## Change 3 — Header.tsx

**Current (line 26):**
```ts
{ key: "capabilities", label: t("capabilities"), hash: "capabilities" },
```

**After:**
```ts
{ key: "capabilities", label: t("capabilities"), href: "/nang-luc" },
```

This converts the capabilities nav item from a homepage scroll-anchor to a proper page link — consistent with how `projects`, `team`, `contact` work. The homepage `id="capabilities"` anchor on the section can remain for direct deep-links but the nav will now route to the dedicated page.

## Todo

- [ ] Update `CapabilitiesSection.tsx`:
  - [ ] Replace local `capabilityItems` with `CAPABILITY_ITEMS` import
  - [ ] Wrap each `SpotlightCard` with `<Link href="/nang-luc/{slug}">`
  - [ ] Add `tabIndex={-1}` to `SpotlightCard`
  - [ ] Add `useTranslations("capabilityDetail")` for `viewAll` key
  - [ ] Add "View all" `Button` + `Link` below the grid
- [ ] Update `Header.tsx`:
  - [ ] Change `capabilities` item from `hash: "capabilities"` to `href: "/nang-luc"`
- [ ] Test homepage: hover cards show arrow, cards navigate to detail
- [ ] Test header nav: "Capabilities"/"Năng lực" routes to `/nang-luc`
- [ ] Run `pnpm lint` — no errors

## Success Criteria

- Homepage capability cards are clickable → navigate to `/nang-luc/[slug]`
- "View all" button at bottom of section → navigates to `/nang-luc`
- Header nav `Capabilities` / `Năng lực` → `/nang-luc` (not scroll-anchor)
- No visual regression on homepage section (same look, now interactive)
- Mobile menu also routes correctly

## Risk

- `CapabilitiesSection` is `"use client"` already — no RSC constraint issues
- `Link` from `@/i18n/navigation` handles locale prefix automatically — no manual `/vi/` prefix needed
