# Phase 03 — Detail Page: /nang-luc/[slug]

**Status:** ✅ completed | **Est:** 2h | **Blocked by:** Phase 01
**Priority:** High

## Context Links
- Data source: `lib/capabilityData.ts` + `getCapabilityBySlug()`
- Template reference: `app/[locale]/projects/[slug]/ProjectDetailContent.tsx`
- Template reference: `app/[locale]/projects/[slug]/page.tsx`
- i18n namespace: `capabilityDetail` (added in Phase 01)

## Overview

Create `/nang-luc/[slug]` detail page with 3 sections:
1. **Hero** — large icon + title + long description + back link
2. **Features grid** — 4-col grid (desktop) with placeholder content
3. **CTA** — contact button linking to `/contact`

Clone structure from `ProjectDetailContent.tsx`, adapt to capabilities (no thumbnail image, icon-based hero instead).

## Files to Create

- `app/[locale]/nang-luc/[slug]/page.tsx` — Server Component, `generateMetadata` + `notFound()` guard
- `app/[locale]/nang-luc/[slug]/CapabilityDetailContent.tsx` — Client Component, 3-section layout

## Implementation: page.tsx

```tsx
// app/[locale]/nang-luc/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { getCapabilityBySlug } from "@/lib/capabilityData";
import CapabilityDetailContent from "./CapabilityDetailContent";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const cap = getCapabilityBySlug(slug);
  if (!cap) return {};

  const t = await getTranslations({ locale, namespace: "landing.capabilities" });
  const title = t(`items.${cap.key}.title`);

  return {
    title: `${title} — TensorLab`,
    description: t(`items.${cap.key}.desc`),
  };
}

export default async function CapabilityPage({ params }: Props) {
  const { slug } = await params;
  const cap = getCapabilityBySlug(slug);

  if (!cap) notFound();

  return <CapabilityDetailContent slug={slug} />;
}
```

## Implementation: CapabilityDetailContent.tsx

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "antd";
import { ArrowLeft, MessageCircle, Zap, Layers, Target, Lightbulb } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { getCapabilityBySlug } from "@/lib/capabilityData";
import SpotlightCard from "@/components/SpotlightCard";
import { useSectionVariants, landingViewport } from "@/lib/landingMotion";

const FEATURE_ICONS = [Zap, Layers, Target, Lightbulb] as const;

export default function CapabilityDetailContent({ slug }: { slug: string }) {
  const t = useTranslations("landing.capabilities");
  const tDetail = useTranslations("capabilityDetail");
  const shouldReduceMotion = useReducedMotion();
  const reduced = Boolean(shouldReduceMotion);
  const { fadeUp, stagger } = useSectionVariants(reduced);

  const cap = getCapabilityBySlug(slug);
  if (!cap) return null;

  const motionProps = reduced ? {} : { initial: "hidden" as const, animate: "visible" as const };

  // Features: array from i18n (same pattern as projectDetail)
  let features: { title: string; desc: string }[] = [];
  try {
    features = tDetail.raw(`items.${cap.key}.features`) as { title: string; desc: string }[];
  } catch {
    features = [];
  }

  return (
    <motion.div {...motionProps} variants={stagger} className="bg-background">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-6 pb-12 md:pt-8 md:pb-16">
        {/* Decorative blobs — same as project detail */}
        <div className="absolute -top-40 -right-40 size-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 size-[400px] rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-8 relative z-10">
          {/* Back link */}
          <motion.div variants={fadeUp}>
            <Link
              href="/nang-luc"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-primary transition-colors mb-8 no-underline"
            >
              <ArrowLeft className="size-4" />
              {tDetail("backToCapabilities")}
            </Link>
          </motion.div>

          {/* Hero content — centered, icon above title */}
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Large icon */}
            <motion.div variants={fadeUp} className="flex justify-center">
              <div className="size-20 rounded-3xl bg-border flex items-center justify-center">
                <cap.icon size={36} className={cap.color} />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeUp}
              className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight"
            >
              {t(`items.${cap.key}.title`)}
            </motion.h1>

            {/* Long description */}
            <motion.p
              variants={fadeUp}
              className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed"
            >
              {tDetail(`items.${cap.key}.longDesc`)}
            </motion.p>

            {/* CTA in hero */}
            <motion.div variants={fadeUp} className="flex justify-center pt-2">
              <Link href={{ pathname: "/contact", query: { type: "other" } }}>
                <Button
                  type="primary"
                  size="large"
                  icon={<MessageCircle className="size-4" />}
                >
                  {tDetail("ctaButton")}
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features grid ── */}
      {features.length > 0 && (
        <section className="py-20 md:py-24 bg-background">
          <div className="container mx-auto px-8">
            <motion.h2
              variants={fadeUp}
              {...motionProps}
              className="text-3xl font-semibold text-foreground text-center mb-4"
            >
              {tDetail("featuresTitle")}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              {...motionProps}
              className="text-zinc-500 dark:text-zinc-400 text-center mb-12 max-w-2xl mx-auto"
            >
              {tDetail("featuresDesc")}
            </motion.p>

            <motion.div
              {...motionProps}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {features.map((feature, idx) => {
                const Icon = FEATURE_ICONS[idx % FEATURE_ICONS.length];
                return (
                  <motion.div key={idx} variants={fadeUp}>
                    <SpotlightCard spotlightColor={cap.spotlightColor} className="h-full">
                      <div className="flex flex-col items-start gap-4">
                        <div className="inline-flex items-center justify-center size-10 rounded-xl bg-border">
                          <Icon className={`size-5 ${cap.color}`} />
                        </div>
                        <h3 className="text-base font-semibold text-foreground">{feature.title}</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{feature.desc}</p>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── CTA bottom ── */}
      <section className="py-16 md:py-20 bg-gradient-to-t from-primary/5 to-background">
        <div className="container mx-auto px-8 text-center">
          <motion.h2 variants={fadeUp} {...motionProps} className="text-3xl font-semibold text-foreground mb-4">
            {tDetail("ctaTitle")}
          </motion.h2>
          <motion.p variants={fadeUp} {...motionProps} className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-lg mx-auto">
            {tDetail("ctaDesc")}
          </motion.p>
          <motion.div variants={fadeUp} {...motionProps} className="flex justify-center gap-4">
            <Link href={{ pathname: "/contact", query: { type: "other" } }}>
              <Button type="primary" size="large" icon={<MessageCircle className="size-4" />}>
                {tDetail("ctaButton")}
              </Button>
            </Link>
            <Link href="/nang-luc">
              <Button size="large">{tDetail("viewAll")}</Button>
            </Link>
          </motion.div>
        </div>
      </section>

    </motion.div>
  );
}
```

## Notes

- Feature icons cycle through `[Zap, Layers, Target, Lightbulb]` — identical pattern to `ProjectDetailContent`
- `tDetail.raw()` with try/catch — same safe pattern as project detail
- Hero is **centered** (not 2-col split) because no thumbnail image — cleaner for icon-based content
- `longDesc` falls back gracefully since it's in i18n (not hardcoded)

## Todo

- [ ] Create `app/[locale]/nang-luc/[slug]/page.tsx`
- [ ] Create `app/[locale]/nang-luc/[slug]/CapabilityDetailContent.tsx`
- [ ] Verify `notFound()` fires for unknown slugs (e.g. `/nang-luc/invalid`)
- [ ] Check features grid renders for all 6 slugs
- [ ] Check both locales: `/nang-luc/ai` and `/vi/nang-luc/ai`
- [ ] Run `pnpm lint` — no errors

## Success Criteria

- All 6 slugs resolve with correct title, longDesc, features
- Invalid slug → 404 page
- CTA buttons link to `/contact?type=other`
- "← Năng lực" back link goes to `/nang-luc`
- Metadata title: `"AI enablement: from POC to production — TensorLab"`
