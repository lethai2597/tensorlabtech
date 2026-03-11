# Project Scout Report: Competency Feature Implementation
**Date:** 2026-03-11 | **Scope:** TensorLab Codebase Architecture & Patterns

## Executive Summary

TensorLab is a Next.js 16 marketing website with an established pattern for list/detail pages. **Good news:** The codebase already has nearly all the patterns needed for a competency feature. We can follow the existing `/projects` pattern as a template.

---

## 1. Project Structure

### Key Directories
```
/Users/lethai/Desktop/projects/startup/tensorlab/
├── app/[locale]/
│   ├── projects/              # List page + detail pages (PATTERN REFERENCE)
│   ├── blog/                  # Blog with MDX content
│   ├── events/                # Events with detail pages
│   ├── team/                  # Team members (card grid)
│   ├── contact/               # Contact page
│   └── test/                  # Testing/component showcase
├── components/
│   ├── landing/               # Landing page sections (Capabilities included)
│   ├── ui/                    # Reusable UI components
│   ├── SpotlightCard.tsx      # Spotlight card with hover effects
│   ├── ShinyText.tsx          # Animated text
│   └── ScrollReveal.tsx       # Scroll animations
├── lib/
│   ├── projectData.ts         # Data registry (PATTERN)
│   ├── teamData.ts            # Team member registry (PATTERN)
│   ├── landingMotion.ts       # Motion animation utilities
│   └── theme.ts               # Ant Design theme config
├── locales/
│   ├── en.json                # English translations
│   └── vi.json                # Vietnamese translations
├── i18n/
│   └── routing.ts             # i18n config (en, vi)
└── public/images/             # Static assets
```

### Tech Stack
- **Framework:** Next.js 16.1.6 (App Router)
- **UI Components:** Ant Design 5.23.2 + TailwindCSS 4
- **Icons:** Lucide React 0.563.0
- **Animations:** Framer Motion
- **i18n:** next-intl 4.8.1
- **Forms:** Native HTML + Ant Design Form
- **Charts:** Recharts (available)
- **State:** Zustand (available)
- **Data Fetching:** TanStack Query (available)

---

## 2. Existing List/Detail Page Patterns

### Pattern A: Projects (BEST MATCH FOR COMPETENCIES)

**Location:** `/app/[locale]/projects/`

**Structure:**
```
projects/
├── page.tsx                   # List page (ProjectsListContent)
└── [slug]/
    ├── page.tsx              # Detail page (ProjectDetailContent)
    └── ProjectDetailContent.tsx
```

**List Page Pattern (`ProjectsListContent.tsx`):**
- Uses `PROJECT_ITEMS` data registry from `/lib/projectData.ts`
- Grid layout: 2 columns on desktop, 1 on mobile
- Each card shows:
  - Thumbnail image
  - Category badge
  - Title + description
  - Tech stack chips
  - Arrow icon on hover
- Framer Motion animations (fadeUp + stagger)
- Responsive motion (useReducedMotion hook)

**Detail Page Pattern (`ProjectDetailContent.tsx`):**
- Hero section with title, category, description, tech stack
- Back link to list page
- Screenshot image
- Features grid (if translations exist) — 4 columns with icons
- CTA section at bottom
- Similar animation pattern

**Data Registry Pattern (`projectData.ts`):**
```typescript
export const PROJECT_ITEMS = [
  {
    key: "project-key",          // i18n lookup key
    slug: "project-slug",        // URL slug
    url: "external-url",         // Public projects link
    isPublic: boolean,           // CTA logic
    thumbnailUrl: "/images/...", // Image path
    spotlightColor: "rgba(...)", // Card glow effect
    categoryColor: "text-...",   // Text color
    categoryBg: "bg-...",        // Background color
  },
]
```

**Translation Pattern:**
```json
{
  "landing.projects": {
    "tag": "Our Work",
    "title": "Featured Projects",
    "items": {
      "project-key": {
        "title": "Project Title",
        "category": "Product",
        "desc": "Short description",
        "tech": ["Next.js", "React", "Node"]
      }
    }
  },
  "projectDetail": {
    "project-key": {
      "desc": "Longer description",
      "features": [
        { "title": "Feature 1", "desc": "Description" },
        { "title": "Feature 2", "desc": "Description" }
      ]
    }
  }
}
```

### Pattern B: Team Members (SECONDARY MATCH)

**Location:** `/app/[locale]/team/TeamContent.tsx`

**Features:**
- Grid with unified card component
- Avatar image with hover scale effect
- Social media links (LinkedIn, GitHub, Facebook, Twitter, Website)
- CV download button (members only)
- Rotating accent colors for card styling
- Full i18n support for names, roles, bios

### Pattern C: Events (ALTERNATIVE PATTERN)

**Location:** `/app/[locale]/events/`

- Detail pages with markdown content support
- Loading states with skeleton screens
- Similar routing structure: list → detail with slug

---

## 3. Existing Competency/Capability Code

### Found in: `CapabilitiesSection.tsx`

**Location:** `/components/landing/TensorLabLandingPage/sections/CapabilitiesSection.tsx`

**Current Implementation:**
- 6 fixed capability items (consulting, dx, product, ai, web3, cloud)
- Each has: icon, color, spotlight color
- Grid layout: 3 columns on desktop
- Arrow icon in top-right corner
- Used in landing page hero section

**This is NOT a separate page** — just a landing section. The competency feature should:
1. Expand this into a dedicated list page (`/competencies`)
2. Create detail pages for each competency (`/competencies/[slug]`)
3. Keep the same styling/animation patterns

---

## 4. UI Components & Patterns

### Core Reusable Components

| Component | File | Usage |
|-----------|------|-------|
| **SpotlightCard** | `SpotlightCard.tsx` | Main card with glow effect (hover) |
| **ShinyText** | `ShinyText.tsx` | Animated text with shine effect |
| **ScrollReveal** | `ScrollReveal.tsx` | Scroll-triggered animations |
| **SectionHeader** | `landing/SectionHeader.tsx` | Section title + tag + description |
| **SectionBackdrop** | `landing/...SectionBackdrop` | Background blur effects |
| **Button** | Ant Design | Primary/secondary CTAs |
| **Tag** | Ant Design | Category badges |
| **Image** | Next.js Image | Optimized images |

### Motion Library
- **Framer Motion** with variants:
  - `fadeUp` — fade + translate Y animation
  - `stagger` — sequential children animations
  - `landingViewport` — scroll trigger settings
- **useReducedMotion()** hook for accessibility

### Styling
- **TailwindCSS** for layout/utilities
- **Ant Design tokens** for theming
- **CSS variables** for dynamic colors
- **Dark mode** support (automatic via provider)

---

## 5. Routing & i18n Patterns

### Locale Routing
- **Supported locales:** `en` (default), `vi`
- **URL structure:** `/projects` (English), `/vi/projects` (Vietnamese)
- **File structure:** `app/[locale]/competencies/` automatically supports both

### Translation Keys Pattern
```
landing.competencies.tag = "Năng lực"
landing.competencies.title = "Khả năng của chúng tôi"
landing.competencies.items.consulting.title = "Consulting"
landing.competencies.items.consulting.desc = "..."

competencyDetail.consulting.desc = "Longer description..."
competencyDetail.consulting.features[0] = { title, desc }
```

### Navigation
- **Link component:** `import { Link } from "@/i18n/navigation"`
- Automatically handles locale prefixing
- Used for internal navigation only

---

## 6. Data Management Patterns

### Static Data Registry
All list items stored in `/lib/` TypeScript files:
- `projectData.ts` — projects
- `teamData.ts` — team members
- **Pattern:** Const array + TypeScript type export

### Benefits:
✅ Type-safe queries  
✅ Single source of truth  
✅ Easy to update  
✅ i18n integration ready  

### For Competencies:
1. Create `/lib/competencyData.ts`
2. Export `COMPETENCY_ITEMS` array
3. Export `CompetencyItem` type
4. Follow same structure as `PROJECT_ITEMS`

---

## 7. Page Structure Conventions

### Server Components (Default)
- Use async/await for translations
- Example: `app/[locale]/projects/page.tsx`

```typescript
import ProjectsListContent from "./ProjectsListContent";

export default function Page() {
  return <ProjectsListContent />;
}
```

### Client Components (Content Logic)
- Add `"use client"` directive
- Use hooks: `useTranslations()`, `useReducedMotion()`
- Example: `ProjectsListContent.tsx`, `ProjectDetailContent.tsx`

### Detail Pages with Slugs
```typescript
// app/[locale]/competencies/[slug]/page.tsx
export default function Page({ params }: { params: { slug: string } }) {
  return <CompetencyDetailContent slug={params.slug} />;
}
```

---

## 8. Key Files to Reference

For implementation, reference these existing files:

| Task | Reference File | Learning Points |
|------|-----------------|-----------------|
| List page layout | `ProjectsListContent.tsx` | Grid, cards, animations |
| Detail page layout | `ProjectDetailContent.tsx` | Hero, features, CTAs |
| Data registry | `projectData.ts` | TypeScript types, export pattern |
| Component hierarchy | `TeamContent.tsx` | Card component reuse |
| i18n integration | `CapabilitiesSection.tsx` | Translation keys, fallbacks |
| Motion setup | `landingMotion.ts` | fadeUp, stagger variants |
| Responsive design | Any `.tsx` | TailwindCSS breakpoints (md:, lg:) |

---

## 9. Translation Files Structure

**Location:** `/locales/vi.json` and `/locales/en.json`

Current keys (partial):
- `landing.projects.*` — Projects section
- `landing.capabilities.*` — Capabilities section
- `projectDetail.*` — Project detail pages
- `landing.team.members.*` — Team section
- `common.*` — Shared translations

**For competencies, add:**
- `landing.competencies.*` — List page
- `competencyDetail.*` — Detail pages

---

## 10. Unresolved Questions

1. **Data source for competency items** — Will they be hardcoded in `competencyData.ts` or fetched from API?
2. **Detail page content** — What sections should be included? (Similar to projects: features, use cases, related services?)
3. **Images/assets** — Do we have screenshots/icons for each competency? Where will they be stored?
4. **CTA actions** — Should detail pages link to contact form like projects do? Or external resources?
5. **Navigation** — Should competencies be linked from main navigation menu or only landing page?
6. **Relationship to "Capabilities" section** — Should they replace the current hard-coded capability items on landing page?

---

## Recommendations

### ✅ DO
1. Follow the `/projects` pattern as blueprint — it's proven
2. Reuse `SpotlightCard`, `SectionHeader`, `ShinyText` components
3. Use `COMPETENCY_ITEMS` registry in `/lib/competencyData.ts`
4. Implement same animation patterns with `useSectionVariants()`
5. Keep both English + Vietnamese translations
6. Use Ant Design tags for categories/badges
7. Implement responsive grid (1 col mobile, 2-3 desktop)

### ⚠️ AVOID
1. Creating new components when existing ones (SpotlightCard) already work
2. Hardcoding translations — use i18n keys
3. Different card styling for competencies vs projects
4. Skipping responsive motion hook
5. Mixing routing patterns (use `[locale]/competencies/[slug]` format)

---

## Summary

**The codebase is well-structured for adding a competency feature.** The projects list/detail pattern is production-ready and battle-tested. By following the same architecture:

- **List Page:** Grid of competency cards with animations
- **Detail Page:** Hero + description + features section + CTA
- **Data:** Static registry in `competencyData.ts`
- **Translations:** Standard i18n keys in `locales/*.json`
- **Styling:** Existing components (SpotlightCard, etc.)
- **Routing:** Auto-locale support via `[locale]` folder

**Estimated effort:** Low (reusing patterns), medium (content creation)
