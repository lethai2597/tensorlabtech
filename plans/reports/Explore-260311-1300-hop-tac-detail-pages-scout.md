# Scout Report: Hợp tác (Partnership) Detail Pages Structure

**Date:** 2026-03-11 | **Scout:** Explore  
**Status:** Complete | **Scope:** Codebase routing, components, i18n, data layer, reference patterns

---

## Executive Summary

**TensorLab has capability infrastructure complete (list + detail), but partnership/engagement pages are landing-section-only.** 

Current state:
- ✅ **Năng lực (Capabilities):** List page implemented at `/capabilities`; detail pages pattern available from `/projects` structure
- ✅ **Landing sections:** Both CapabilitiesSection & EngagementModelsSection exist and fully integrated
- ✅ **Data layer:** Centralized `capabilityData.ts` for capabilities; engagement models hard-coded in `EngagementModelsSection.tsx`
- ❌ **Hợp tác dedicated pages:** `/hop-tac`, `/hop-tac/[slug]` do not exist
- ❌ **Hợp tác data layer:** No `engagementData.ts` equivalent

**Key finding:** Perfect opportunity to follow established `/projects/[slug]` pattern to create partnership detail pages.

---

## 1. Routing Structure

### Current Routes

```
app/[locale]/
├── (root)
│   ├── page.tsx                          # Home (displays both sections)
│   └── layout.tsx
├── capabilities/
│   ├── page.tsx                          # ✅ LIST PAGE
│   └── CapabilitiesListContent.tsx
├── projects/
│   ├── page.tsx                          # ✅ LIST PAGE
│   ├── ProjectsListContent.tsx
│   └── [slug]/
│       ├── page.tsx                      # ✅ DETAIL PAGE (pattern reference)
│       └── ProjectDetailContent.tsx
├── blog/
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
├── contact/
│   └── page.tsx
├── team/
├── events/
└── resources/
```

### Missing Routes (To Be Created)

```
app/[locale]/hop-tac/                    # NEW
├── page.tsx                              # List partnership models
├── HopTacListContent.tsx
└── [slug]/                               # NEW (product, outsource)
    ├── page.tsx
    └── HopTacDetailContent.tsx
```

---

## 2. Component Architecture Reference

### Pattern: Projects Detail Implementation

**File:** `app/[locale]/projects/[slug]/ProjectDetailContent.tsx`  
**Size:** 306 lines  
**Structure:**
1. Client component ("use client")
2. Framer Motion animations + reduce-motion support
3. i18n translations (project list + detail namespaces)
4. Data lookup via `getProjectBySlug()` utility
5. Fallback handling (notFound if not found)
6. Hero section with back button
7. Features grid (4 columns, icons + titles + descriptions)
8. CTA section with contact link pre-fills
9. Related projects grid

**Server wrapper:** `app/[locale]/projects/[slug]/page.tsx`  
**Size:** 41 lines  
**Structure:**
```typescript
// 1. Metadata generation (SEO)
export async function generateMetadata({ params }): Promise<Metadata>
// 2. Static generation hints (optional)
// 3. Page component (async RSC)
export default async function Page({ params })
// - Await params (Next.js 15 requirement)
// - Get translation namespace
// - Return client component
```

### Existing Components (Reusable for Hợp tác)

| Component | File | Purpose | Reusable |
|-----------|------|---------|----------|
| SpotlightCard | `components/SpotlightCard.tsx` | Glowing card with spotlight effect | ✅ Yes |
| SectionHeader | `components/landing/SectionHeader.tsx` | "Tag" + "Title" + "Description" | ✅ Yes |
| CheckList | `components/landing/CheckList.tsx` | Bullet list with checkmarks | ✅ Yes |
| CTABox | `components/landing/CTABox.tsx` | Call-to-action container | ✅ Yes |
| useSectionVariants | `lib/landingMotion.ts` | Framer Motion animation presets | ✅ Yes |

---

## 3. Data Layer

### Capabilities Data (`lib/capabilityData.ts`)

**Type definition:**
```typescript
export type CapabilityItem = {
  key: string;                    // i18n key
  slug: string;                   // URL segment
  icon: LucideIcon;              // Lucide icon component
  color: string;                 // Tailwind text color (literal)
  dotColor: string;              // Tailwind bg color (literal)
  spotlightColor: string;        // rgba for SpotlightCard glow
  contactType: "product" | "outsource" | "other";
  contactMessage: string;        // Vietnamese pre-fill for ?message=
};
```

**Data structure:** Array of 6 items (consulting, dx, product, ai, web3, cloud)

### Engagement Models (Currently Hard-Coded)

**File:** `components/landing/TensorLabLandingPage/sections/EngagementModelsSection.tsx`  
**Lines 25-54:**
```typescript
const models = useMemo(() => {
  return [
    {
      key: "product" as const,
      icon: Handshake,
      title: t("product.title"),
      subtitle: t("product.subtitle"),
      cta: t("product.cta"),
      items: [t("product.items.0"), t("product.items.1"), t("product.items.2")],
      spotlightColor: "rgba(37, 99, 235, 0.35)",
    },
    {
      key: "outsource" as const,
      icon: Users,
      title: t("outsource.title"),
      subtitle: t("outsource.subtitle"),
      cta: t("outsource.cta"),
      items: [t("outsource.items.0"), t("outsource.items.1"), t("outsource.items.2")],
      spotlightColor: "rgba(37, 99, 235, 0.28)",
    },
  ];
}, [t]);
```

**Issue:** Hard-coded in component, not reusable across pages.

---

## 4. i18n Structure

### Translation Keys (Engagement Models)

**Namespace:** `landing.engagement`  
**Location:** `locales/en.json` (lines ~1700+), `locales/vi.json`

**Keys present:**
```json
{
  "engagement": {
    "tag": "Engagement" | "Hợp tác",
    "title": "Two ways to partner with TensorLab" | "2 hướng hợp tác cùng TensorLab",
    "desc": "Choose the model that fits: product co-build or outsource delivery." | "Chọn mô hình phù hợp...",
    "activeLabel": "Selected" | "Đã chọn",
    "product": {
      "title": "Product partnership",
      "subtitle": "Co-build with outcome ownership and fast iteration.",
      "cta": "Product partnership",
      "items": [
        "Outcome ownership from ideation to go-live",
        "Co-build team integrated into your org",
        "Product advisory and full transparency"
      ]
    },
    "outsource": {
      "title": "Outsource delivery",
      "subtitle": "Hire our team to execute and own the delivery.",
      "cta": "Outsource delivery",
      "items": [
        "Fixed scope or time-and-materials",
        "Dedicated team allocation",
        "Weekly syncs and transparent progress"
      ]
    }
  }
}
```

**Missing detail translations:** `hopTacDetail` namespace doesn't exist (will need to create).

---

## 5. Capability Detail Page Pattern (Reference for Hợp tác)

### Server Wrapper (`app/[locale]/capabilities/page.tsx`)
```typescript
import { getTranslations } from "next-intl/server";
import { CapabilitiesListContent } from "./CapabilitiesListContent";

export const metadata: Metadata = {
  title: "Capabilities | TensorLab",
  // ...
};

export default async function CapabilitiesPage({ params }: Props) {
  const { locale } = await params;
  return <CapabilitiesListContent />;
}
```

### Client Content (`app/[locale]/capabilities/CapabilitiesListContent.tsx`)
**Size:** 147 lines  
**Pattern:**
1. Client component with Framer Motion
2. Maps over `CAPABILITY_ITEMS` array
3. SpotlightCard for each capability (clickable link to detail)
4. Hero section with SectionHeader
5. Contact CTA section

### Missing Detail Page Pattern
**Would follow `/projects/[slug]/` structure:**
- Server wrapper: `app/[locale]/capabilities/[slug]/page.tsx`
- Client content: `app/[locale]/capabilities/[slug]/CapabilityDetailContent.tsx`
- Data lookup: `getCapabilityBySlug(slug)` (already implemented)
- i18n: `capabilityDetail.{slug}.*` keys (mostly complete)

---

## 6. Key Patterns to Reuse for Hợp tác Detail Pages

### Pattern 1: Server Component Wrapper

**File:** `app/[locale]/hop-tac/[slug]/page.tsx`  
**Template:**
```typescript
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { HopTacDetailContent } from "./HopTacDetailContent";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const model = getEngagementModelBySlug(slug);
  if (!model) return {};
  
  const t = await getTranslations("hopTacDetail");
  return {
    title: `${t(`${model.key}.title`)} | TensorLab`,
  };
}

export default async function HopTacDetailPage({ params }: Props) {
  const { slug } = await params;
  const model = getEngagementModelBySlug(slug);
  if (!model) notFound();
  
  return <HopTacDetailContent slug={slug} />;
}
```

### Pattern 2: Client Content Component

**File:** `app/[locale]/hop-tac/[slug]/HopTacDetailContent.tsx`  
**Template:**
```typescript
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ENGAGEMENT_ITEMS } from "@/lib/engagementData";
import { useSectionVariants } from "@/lib/landingMotion";
import SpotlightCard from "@/components/SpotlightCard";
import { CheckList } from "@/components/landing/CheckList";
import { SectionHeader } from "@/components/landing/SectionHeader";

export default function HopTacDetailContent({ slug }: { slug: string }) {
  const t = useTranslations("hopTacDetail");
  const shouldReduceMotion = useReducedMotion();
  const reduced = Boolean(shouldReduceMotion);
  const { fadeUp, stagger } = useSectionVariants(reduced);

  const model = ENGAGEMENT_ITEMS.find((m) => m.slug === slug);
  if (!model) return null;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="min-h-screen bg-background"
    >
      {/* Hero section with back button */}
      {/* Features checklist */}
      {/* Process timeline or comparison */}
      {/* CTA section with contact form link */}
      {/* FAQ section */}
    </motion.div>
  );
}
```

### Pattern 3: Data Registry

**File:** `lib/engagementData.ts` (NEW)  
**Template:**
```typescript
import { Handshake, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type EngagementItem = {
  key: "product" | "outsource";
  slug: string;
  icon: LucideIcon;
  color: string;
  dotColor: string;
  spotlightColor: string;
  contactType: "product" | "outsource";
  contactMessage: string;
};

export const ENGAGEMENT_ITEMS: EngagementItem[] = [
  {
    key: "product",
    slug: "product",
    icon: Handshake,
    color: "text-primary",
    dotColor: "bg-blue-600",
    spotlightColor: "rgba(37, 99, 235, 0.35)",
    contactType: "product",
    contactMessage: "Tôi muốn tìm hiểu về Hợp tác Product",
  },
  {
    key: "outsource",
    slug: "outsource",
    icon: Users,
    color: "text-info",
    dotColor: "bg-sky-500",
    spotlightColor: "rgba(14, 165, 233, 0.38)",
    contactType: "outsource",
    contactMessage: "Tôi muốn tìm hiểu về dịch vụ Outsource",
  },
];

export function getEngagementModelBySlug(slug: string): EngagementItem | undefined {
  return ENGAGEMENT_ITEMS.find((e) => e.slug === slug);
}
```

---

## 7. Translation Keys Required

### New Namespace: `hopTacDetail`

**Keys to add to locales:**

```json
{
  "hopTacDetail": {
    "backToHopTac": "Back to partnership models",
    "product": {
      "title": "Product Partnership",
      "longDesc": "Long description of product partnership model...",
      "features": [
        { "title": "Outcome Ownership", "desc": "..." },
        { "title": "Co-build Team", "desc": "..." },
        { "title": "Product Advisory", "desc": "..." },
        { "title": "Full Transparency", "desc": "..." }
      ]
    },
    "outsource": {
      "title": "Outsource Delivery",
      "longDesc": "Long description of outsource model...",
      "features": [
        { "title": "Fixed Scope", "desc": "..." },
        { "title": "Dedicated Team", "desc": "..." },
        { "title": "Weekly Syncs", "desc": "..." },
        { "title": "Transparent Progress", "desc": "..." }
      ]
    },
    "ctaTitle": "Ready to partner with us?",
    "ctaDesc": "Let's discuss which model fits your project best.",
    "ctaButton": "Contact us",
    "relatedTitle": "Explore other partnership models"
  }
}
```

---

## 8. File Structure Summary

### Files to Create

```
app/[locale]/hop-tac/                           # NEW
├── page.tsx                                    # List page (optional)
├── HopTacListContent.tsx                       # List content (optional)
└── [slug]/                                     # NEW
    ├── page.tsx                                # Detail wrapper
    └── HopTacDetailContent.tsx                 # Detail client component

lib/
└── engagementData.ts                           # NEW data registry
```

### Files to Modify

```
locales/
├── en.json                                     # Add hopTacDetail namespace
└── vi.json                                     # Add hopTacDetail namespace

components/landing/TensorLabLandingPage/sections/
└── EngagementModelsSection.tsx                 # Import from engagementData instead of hardcoding
```

### Files NOT to Modify

```
app/[locale]/capabilities/                      # Keep as-is (already complete)
app/[locale]/projects/                          # Keep as-is (reference pattern only)
components/SpotlightCard.tsx                    # Reuse as-is
lib/landingMotion.ts                            # Reuse as-is
```

---

## 9. Header Navigation Update (Optional)

**Current:** `components/layout/Header.tsx` line 24-33
```typescript
const items = [
  { key: "home", label: t("home"), href: "/" },
  { key: "capabilities", label: t("capabilities"), href: "/capabilities" },
  { key: "engagement", label: t("engagement"), hash: "engagement" },  // Scroll anchor
  { key: "projects", label: t("projects"), href: "/projects" },
  { key: "blog", label: "Blog", href: "/blog" },
  { key: "team", label: t("team"), href: "/team" },
  { key: "contact", label: t("contact"), href: "/contact" },
];
```

**Option to change navigation:**
- Keep current scroll anchor (don't change header)
- OR change to `/hop-tac` link (new page-based navigation)

---

## 10. Comparison: Detail Page Patterns

| Aspect | Projects | Capabilities | Hợp tác (Planned) |
|--------|----------|--------------|-------------------|
| **List Page** | ✅ `/projects` | ✅ `/capabilities` | ⏳ `/hop-tac` (optional) |
| **Detail Page** | ✅ `/projects/[slug]` | ⏳ Not yet | ⏳ `/hop-tac/[slug]` |
| **Data Layer** | ✅ `projectData.ts` | ✅ `capabilityData.ts` | ⏳ `engagementData.ts` |
| **Client Component** | ✅ `ProjectDetailContent` | ✅ `CapabilitiesListContent` | ⏳ `HopTacDetailContent` |
| **i18n Namespace** | ✅ `projectDetail` | ✅ `capabilityDetail` | ⏳ `hopTacDetail` |
| **CTA Integration** | ✅ Contact prefill | ✅ Contact prefill | ✅ Can use same pattern |
| **LOC (Detail)** | 306 | N/A (list only) | ~300 (estimated) |

---

## 11. Implementation Readiness Checklist

### Dependencies Met

- ✅ Data structure pattern (use `capabilityData.ts` as template)
- ✅ UI components (SpotlightCard, SectionHeader, CheckList reusable)
- ✅ Animation library (Framer Motion, `useSectionVariants`)
- ✅ i18n infrastructure (next-intl fully configured)
- ✅ Routing system (Next.js 15 App Router with [slug] support)
- ✅ Contact integration (form supports `?type=` and `?message=` pre-fills)

### Knowledge Gaps (None — all patterns exist)

- ✅ Server component wrapper pattern (projects/[slug]/page.tsx)
- ✅ Client detail content pattern (projects/[slug]/ProjectDetailContent.tsx)
- ✅ Data lookup utility pattern (getCapabilityBySlug, getProjectBySlug)
- ✅ Animation patterns (useSectionVariants, Framer Motion variants)
- ✅ Contact form integration (existing URL params mechanism)

---

## 12. Reference Files (Read-Only Research)

### Detail Page Template (Projects)
- **Server:** `app/[locale]/projects/[slug]/page.tsx` (41 lines)
- **Client:** `app/[locale]/projects/[slug]/ProjectDetailContent.tsx` (306 lines)

### Data Registry Template (Capabilities)
- **Registry:** `lib/capabilityData.ts` (83 lines)
- **Utility:** `getCapabilityBySlug(slug)` function

### UI Components (Reusable)
- **SpotlightCard:** `components/SpotlightCard.tsx` (2587 bytes)
- **SectionHeader:** `components/landing/SectionHeader.tsx` (1605 bytes)
- **CheckList:** `components/landing/CheckList.tsx` (1110 bytes)
- **Animations:** `lib/landingMotion.ts` (useSectionVariants, fadeUp, stagger)

### i18n Keys (Reference)
- **Projects:** `projectDetail.*` namespace in en.json, vi.json
- **Capabilities:** `capabilityDetail.*` namespace in en.json, vi.json
- **Landing Engagement:** `landing.engagement.*` currently hard-coded

### Translation Files
- `locales/en.json` (41 KB) — has `landing.engagement` keys
- `locales/vi.json` (46 KB) — has `landing.engagement` keys

---

## 13. Unresolved Questions

1. **List Page Priority?** Should `/hop-tac` list page be created, or keep only detail pages `/hop-tac/product` & `/hop-tac/outsource`?

2. **Navigation Strategy?** Keep current scroll-anchor navigation (`#engagement` on homepage), or redirect nav menu to `/hop-tac` pages?

3. **EngagementModelsSection Refactor?** Should landing section import from `engagementData.ts` to avoid duplication, or keep separate implementations?

4. **Detail Page Content?** What specific features/benefits should be in the detail pages? (Currently in landing section only)

5. **Localization Route Naming?** Should routes be `/hop-tac` (Vietnamese) or `/partnership` (English)? Current codebase uses English routes (e.g., `/capabilities`, `/projects`).

---

## 14. Summary

**Ready to implement** partnership detail pages following `/projects/[slug]` pattern:

✅ All infrastructure exists (routing, i18n, components, data layer pattern)  
✅ Two models identified (product, outsource)  
✅ Reference implementations available (projects detail page = 306 lines)  
✅ Estimated effort: 2-3 files to create + 1 data file + i18n keys  
✅ No new dependencies required  
✅ No architectural changes needed  

**Estimated new code:** ~400-450 lines total (registry + detail page + translations)

