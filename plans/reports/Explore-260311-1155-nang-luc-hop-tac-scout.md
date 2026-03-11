# Scout Report: Năng lực & Hợp tác Pages Structure

**Date:** 2026-03-11 | **Scout:** Explore  
**Status:** Complete | **Files Analyzed:** 12+

---

## Executive Summary

TensorLab has partially implemented the Năng lực (capabilities) infrastructure but **Hợp tác (cooperation/partnership) pages do not yet exist**. Currently:

- ✅ **Năng lực pages:** Implemented (list + detail)
- ✅ **Data layer:** Centralized in `lib/capabilityData.ts` with 6 capabilities
- ✅ **Homepage sync:** CapabilitiesSection wired to `/capabilities`
- ❌ **Hợp tác pages:** Does not exist as separate pages; exists only as landing section
- ❌ **Hợp tác detail/list pages:** Not implemented

---

## 1. Năng lực (Capabilities) File Structure

### Current Implementation

```
app/[locale]/
├── capabilities/                           # LIST PAGE
│   ├── page.tsx                           # Entry point
│   ├── CapabilitiesListContent.tsx        # Client component with animations
│   └── (no [slug]/ subdirectory yet)
│
lib/
├── capabilityData.ts                      # Single source of truth (DRY)
│
components/landing/TensorLabLandingPage/sections/
├── CapabilitiesSection.tsx                # Homepage section (wired to /capabilities)
```

### Implemented Pages

| Page | Route | File | Status |
|------|-------|------|--------|
| Capabilities List | `/capabilities` | `app/[locale]/capabilities/page.tsx` | ✅ Complete |
| Detail Page | `/capabilities/[slug]` | **NOT CREATED** | ❌ Planned |

**Current state:** Only list page implemented. Detail page infrastructure from projects exists but not for capabilities.

---

## 2. Hợp tác (Cooperation/Partnership) Structure

### Current Implementation

```
components/landing/TensorLabLandingPage/sections/
├── EngagementModelsSection.tsx            # LANDING SECTION ONLY
│                                          # Shows: "Hợp tác Product" + "Thuê Outsource"
│
(No dedicated /hop-tac pages)
```

### Status
- ✅ **Landing section:** Exists in `EngagementModelsSection.tsx`
- ❌ **Dedicated pages:** `/hop-tac`, `/hop-tac/[slug]` do not exist
- ✅ **Translations:** Vietnamese & English phrases in `locales/` reference "hợp tác"
- ✅ **Navigation:** "Hợp tác" link on homepage → scroll anchor `#engagement` (not a page link)

### Engagement Models Section Details

Located: `components/landing/TensorLabLandingPage/sections/EngagementModelsSection.tsx`

**Two models (hard-coded in component):**
1. **"Hợp tác Product"** (`key: "product"`)
   - Co-build sản phẩm, tập trung outcome & tốc độ ra mắt
   - CTA: `/contact?type=product`

2. **"Thuê Outsource"** (`key: "outsource"`)
   - Thuê đội ngũ triển khai
   - CTA: `/contact?type=outsource`

**No detail pages** — both models are display-only on landing.

---

## 3. Data Layer & Shared Structures

### Capability Data (`lib/capabilityData.ts`)

**6 capabilities defined:**

```typescript
export type CapabilityItem = {
  key: string;              // i18n key, e.g. "consulting"
  slug: string;             // URL segment
  icon: LucideIcon;
  color: string;            // Tailwind text color (static)
  dotColor: string;         // Tailwind bg color (static)
  spotlightColor: string;   // rgba for SpotlightCard glow
  contactType: "product" | "outsource" | "other";  // pre-fill ?type=
  contactMessage: string;   // Vietnamese pre-fill ?message=
};
```

**Items:**
1. `consulting` → Tư vấn chiến lược & kiến trúc (Compass icon, text-info)
2. `dx` → Tối ưu quy trình & Developer Experience (Shield icon, text-success)
3. `product` → Phát triển sản phẩm số (Rocket icon, text-primary)
4. `ai` → AI & Automation (Cpu icon, text-warning)
5. `web3` → Web3 & dApp (Layers icon, text-error)
6. `cloud` → Cloud & Infrastructure (Cloud icon, text-info)

**No similar data structure exists for Hợp tác models** — they're hard-coded in `EngagementModelsSection.tsx`.

---

## 4. Key Patterns (Năng lực Detail Page Model)

### Pattern: Clone `/projects` Structure

Based on completed plan (Phase 03), the detail page should:

**Template: `/projects/[slug]/page.tsx`**
```typescript
// 1. Server-side page wrapper
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cap = getCapabilityBySlug(slug);
  if (!cap) return {};
  // Generate title with i18n lookup
}

export default async function CapabilityPage({ params }: Props) {
  const { slug } = await params;
  const cap = getCapabilityBySlug(slug);
  if (!cap) notFound();
  return <CapabilityDetailContent slug={slug} />;
}
```

**Template: `/projects/[slug]/ProjectDetailContent.tsx`**
```typescript
// 1. Client component with animations
// 2. Hero section with back link, title, description
// 3. Features section (4 features with icons)
// 4. CTA section with contact link
// 5. Uses CAPABILITY_ITEMS lookup + i18n for translations
```

### Shared Components & Patterns

| Pattern | File | Used By |
|---------|------|---------|
| Data lookup | `getCapabilityBySlug()` | List + Detail pages |
| Spotlight cards | `SpotlightCard` | Homepage, List, Detail |
| Motion animations | `useSectionVariants()` | All sections |
| i18n keys | `capabilityList`, `capabilityDetail` | All pages |
| Contact prefill | `?type=` + `?message=` | Detail CTAs |

---

## 5. App Routing Structure

### Current Navigation

```
/ (Home)
├── /capabilities                          # List page (✅)
├── /capabilities/[slug]                   # Detail page (❌ NOT CREATED)
├── /projects                              # Projects list
├── /projects/[slug]                       # Project detail
├── /team                                  # Team page
├── /blog
├── /blog/[slug]
├── /contact                               # Contact form
└── /events
    ├── /events/ai-application-engineer-intro
    └── /events/workshop-vibe-coding-for-non-tech-people
```

### Header Navigation

Currently in `components/layout/Header.tsx` (line 24-33):
```typescript
const items = [
  { key: "home", label: t("home"), href: "/" },
  { key: "capabilities", label: t("capabilities"), href: "/capabilities" },  // ← Points to LIST
  { key: "engagement", label: t("engagement"), hash: "engagement" },        // ← Scroll anchor on home
  { key: "projects", label: t("projects"), href: "/projects" },
  { key: "blog", label: "Blog", href: "/blog" },
  { key: "team", label: t("team"), href: "/team" },
  { key: "contact", label: t("contact"), href: "/contact" },
];
```

**Note:** "Engagement" (hợp tác) is a scroll anchor on homepage, NOT a page link.

---

## 6. i18n & Translation Keys

### Capability-Related Keys

**`capabilityList` namespace:**
- `tag` → Badge text
- `title` → Page title
- `desc` → Page description

**`capabilityDetail` namespace:**
- `items.{key}.longDesc` → Long description
- `items.{key}.features` → Array of { title, desc }
- `consultButton` → "Tìm hiểu thêm"
- `viewAll` → "Xem tất cả năng lực"
- `learnMore` → Learn more CTA text

**`landing.capabilities` namespace:**
- `items.{key}.title` → Capability name
- `items.{key}.desc` → Short description

### Hợp tác Related Keys

**`landing.engagement` namespace:**
- `tag` → "Mô hình hợp tác"
- `title` → "2 hướng hợp tác cùng TensorLab"
- `desc` → "Chọn mô hình phù hợp..."
- `product.title` → "Hợp tác Product"
- `product.subtitle` → "Co-build sản phẩm..."
- `product.cta` → "Hợp tác Product"
- `outsource.title` → "Thuê Outsource"
- `outsource.subtitle` → "Thuê đội ngũ triển khai..."
- `outsource.cta` → "Thuê Outsource"

---

## 7. Unresolved Questions

1. **Hợp tác Detail Pages?** Should each engagement model (Product / Outsource) have dedicated detail pages at `/hop-tac/product` & `/hop-tac/outsource`, or remain landing-section-only?

2. **Detail Page Route?** When implemented, should it be `/capabilities/[slug]` or `/nang-luc/[slug]`? (Current Header.tsx says `/capabilities`, but plan mentions `/nang-luc`)

3. **Contact Form Integration?** The `capabilityData.ts` has `contactType` and `contactMessage` pre-fills. Should Hợp tác models have the same structure if detail pages are created?

4. **Mobile Navigation?** Header doesn't change between locales — should `/capabilities` route be locale-aware (i18n) or English-only?

---

## 8. Files to Reference

### Năng lực Implementation Files
- `lib/capabilityData.ts` — Data registry (DRY single source)
- `app/[locale]/capabilities/page.tsx` — List page entry
- `app/[locale]/capabilities/CapabilitiesListContent.tsx` — List layout + animations
- `components/landing/TensorLabLandingPage/sections/CapabilitiesSection.tsx` — Homepage section

### Reference Pattern (Projects)
- `lib/projectData.ts` — Project data structure
- `app/[locale]/projects/page.tsx` — Projects list entry
- `app/[locale]/projects/[slug]/page.tsx` — Project detail entry
- `app/[locale]/projects/[slug]/ProjectDetailContent.tsx` — Project detail layout

### Hợp tác Landing Section
- `components/landing/TensorLabLandingPage/sections/EngagementModelsSection.tsx` — Landing section only

### Plans & Design Docs
- `plans/260311-1014-nang-luc-list-detail-pages/` — Completed Năng lực implementation plan
- `plans/260311-1136-capabilities-animation-cta-fix/` — Current animation fixes

---

## 9. Summary Table

| Aspect | Năng lực | Hợp tác |
|--------|---------|---------|
| **Data Layer** | ✅ Centralized `capabilityData.ts` | ❌ Hard-coded in component |
| **List Page** | ✅ `/capabilities` | ❌ Not exists |
| **Detail Pages** | ⏳ Planned `/capabilities/[slug]` | ❌ Not planned |
| **Landing Section** | ✅ `CapabilitiesSection` | ✅ `EngagementModelsSection` |
| **Navigation** | ✅ Header → `/capabilities` | ✅ Header → scroll anchor |
| **i18n Support** | ✅ Complete | ✅ Complete (landing only) |
| **Contact Integration** | ✅ Pre-fill via `capabilityData` | ✅ Pre-fill in component |
| **Pattern** | ✅ Follows `/projects` model | ❌ No pattern yet |

