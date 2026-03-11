# Phase 02 — List Page: /nang-luc

**Status:** ✅ completed | **Est:** 1.5h | **Blocked by:** Phase 01
**Priority:** High

## Context Links
- Data source: `lib/capabilityData.ts` (created in Phase 01)
- Template reference: `app/[locale]/projects/ProjectsListContent.tsx`
- Template reference: `app/[locale]/projects/page.tsx`
- i18n namespace: `capabilityList` (added in Phase 01)

## Overview

Create `/nang-luc` list page — grid of 6 capability cards using `SpotlightCard`, staggered Framer Motion animations, same layout pattern as `/projects`.

## Files to Create

- `app/[locale]/nang-luc/page.tsx` — Server Component, metadata + renders list content
- `app/[locale]/nang-luc/CapabilitiesListContent.tsx` — Client Component, grid UI

## Files to Modify

- `locales/en.json` — add `capabilityList` namespace (can be done in Phase 01 together)
- `locales/vi.json` — add `capabilityList` namespace

## i18n Keys Needed

```json
// Add to en.json
"capabilityList": {
  "tag": "Capabilities",
  "title": "What we're great at",
  "desc": "From strategy and architecture to production delivery — six core capabilities that shape how we work.",
  "learnMore": "Learn more"
}
```

```json
// Add to vi.json
"capabilityList": {
  "tag": "Năng lực",
  "title": "Những gì chúng tôi làm tốt",
  "desc": "Từ chiến lược và kiến trúc đến triển khai production — 6 năng lực cốt lõi định hình cách chúng tôi làm việc.",
  "learnMore": "Tìm hiểu thêm"
}
```

## Implementation: page.tsx

```tsx
// app/[locale]/nang-luc/page.tsx
import { getTranslations } from "next-intl/server";
import CapabilitiesListContent from "./CapabilitiesListContent";

export async function generateMetadata() {
  const t = await getTranslations("capabilityList");
  return {
    title: t("title") + " — TensorLab",
    description: t("desc"),
  };
}

export default function CapabilitiesPage() {
  return <CapabilitiesListContent />;
}
```

## Implementation: CapabilitiesListContent.tsx

Key differences from `ProjectsListContent.tsx`:
- No thumbnail image — icon-based cards (same as homepage `CapabilitiesSection`)
- 3-col grid (desktop) vs 2-col for projects
- `Link href="/nang-luc/{slug}"` instead of `/projects/{slug}`
- Uses `capabilityList` i18n namespace + `landing.capabilities` for card title/desc

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Tag } from "antd";

import { Link } from "@/i18n/navigation";
import SpotlightCard from "@/components/SpotlightCard";
import ShinyText from "@/components/ShinyText";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";
import { CAPABILITY_ITEMS } from "@/lib/capabilityData";

export default function CapabilitiesListContent() {
  const t = useTranslations("capabilityList");
  const tCaps = useTranslations("landing.capabilities");
  const shouldReduceMotion = useReducedMotion();
  const reduced = Boolean(shouldReduceMotion);
  const { fadeUp, stagger } = useSectionVariants(reduced);

  return (
    <div className="container mx-auto px-8 py-8 pb-24">
      {/* Page header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={landingViewport}
        variants={stagger}
        className="py-12 mb-8 flex flex-col items-center gap-4 text-center"
      >
        <motion.div variants={fadeUp}>
          <Tag bordered={false} color="geekblue" className="rounded-full! px-3! py-0.5!">
            <ShinyText
              text={t("tag")}
              disabled={reduced}
              speed={2}
              color="var(--color-primary)"
              shineColor="rgba(255, 255, 255, 0.7)"
            />
          </Tag>
        </motion.div>
        <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-foreground">
          {t("title")}
        </motion.h1>
        <motion.p variants={fadeUp} className="text-zinc-500 dark:text-zinc-400 max-w-xl">
          {t("desc")}
        </motion.p>
      </motion.div>

      {/* Capabilities grid — 3 cols desktop, 2 tablet, 1 mobile */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={landingViewport}
        variants={stagger}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {CAPABILITY_ITEMS.map((cap) => (
          <motion.div key={cap.key} variants={fadeUp}>
            <Link href={`/nang-luc/${cap.slug}`} className="block h-full no-underline group">
              <SpotlightCard
                spotlightColor={cap.spotlightColor}
                tabIndex={-1}
                className="h-full cursor-pointer border-transparent transition duration-300 hover:border-border hover:-translate-y-0.5"
              >
                {/* Arrow icon */}
                <div className="absolute top-6 right-6 flex items-center justify-center size-10 rounded-2xl bg-border/60 text-foreground/60 opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </div>
                {/* Icon */}
                <div className="size-12 rounded-2xl bg-border flex items-center justify-center mb-4">
                  <cap.icon size={22} className={cap.color} />
                </div>
                {/* Title */}
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {tCaps(`items.${cap.key}.title`)}
                </h2>
                {/* Short desc */}
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {tCaps(`items.${cap.key}.desc`)}
                </p>
                {/* Learn more label */}
                <p className={`mt-4 text-sm font-medium ${cap.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  {t("learnMore")} →
                </p>
              </SpotlightCard>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
```

## Todo

- [ ] Create `app/[locale]/nang-luc/page.tsx`
- [ ] Create `app/[locale]/nang-luc/CapabilitiesListContent.tsx`
- [ ] Add `capabilityList` i18n to `locales/en.json` and `locales/vi.json`
- [ ] Verify route resolves at `localhost:3000/nang-luc` and `localhost:3000/vi/nang-luc`
- [ ] Run `pnpm lint` — no errors

## Success Criteria

- Grid renders 6 capability cards
- Each card links to `/nang-luc/[slug]`
- Stagger animation works
- Both locales resolve (en + vi)
- Metadata title correct: `"What we're great at — TensorLab"`
