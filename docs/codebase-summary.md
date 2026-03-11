# Codebase Summary

**Last Updated:** 2026-03-11

## Project Overview

TensorLab frontend - Next.js 16 app with landing pages, blog, events, projects, capabilities, and partnership pages. Multi-locale (EN/VI), dark mode, server/client components.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Ant Design 5, TailwindCSS 4, TanStack Query, Zustand, next-intl

---

## Directory Structure

```
app/
├── [locale]/              # Locale routing (en, vi)
│   ├── page.tsx           # Home page (TensorLabLandingPage)
│   ├── layout.tsx         # Locale layout
│   ├── error.tsx
│   ├── events/            # Events listing & detail pages
│   ├── blog/              # Blog listing & detail pages
│   ├── projects/          # Projects listing & detail pages
│   ├── capabilities/      # Capabilities page
│   ├── team/              # Team page
│   ├── contact/           # Contact page
│   ├── partnership/       # Partnership detail page (NEW)
│   └── test/
├── layout.tsx             # Root layout
├── providers/             # Global providers (Theme, Query)
└── not-found.tsx

components/landing/
├── TensorLabLandingPage/  # Home page sections
│   ├── sections/          # Hero, Capabilities, Projects, Case Studies, etc.
│   └── TensorLabLandingPage.tsx
├── PartnershipPage/       # Partnership page (NEW)
│   ├── sections/          # Hero, Engagement Details, FAQ sections
│   │   ├── PartnershipHeroSection.tsx
│   │   ├── EngagementDetailSection.tsx
│   │   └── PartnershipFAQSection.tsx
│   └── PartnershipPage.tsx
├── layout/                # Header, MainLayout, Footer
├── ui/                    # Reusable UI components
└── [other components]

lib/
├── api/                   # API client & hooks
├── constants.ts
├── theme.ts               # Ant Design theme config
└── utils.ts

stores/                    # Zustand stores
├── useAppConfigStore.ts   # Theme, app config
└── [other stores]

locales/
├── en.json                # English translations
└── vi.json                # Vietnamese translations

docs/
├── api.md                 # API integration guide
├── zustand.md             # State management guide
├── custom-theme.md        # Theme customization guide
└── codebase-summary.md    # This file
```

---

## Key Routes

| Route                    | Component             | Purpose                                      |
| ----------------------- | --------------------- | -------------------------------------------- |
| `/`                      | TensorLabLandingPage  | Home landing page                            |
| `/blog`                  | Blog list             | Blog article listing                         |
| `/blog/[slug]`           | Blog detail           | Individual article                           |
| `/events`                | Events list           | Upcoming events & workshops                  |
| `/events/[slug]`         | Event detail          | Individual event details                     |
| `/projects`              | Projects list         | Project portfolio                            |
| `/projects/[slug]`       | Project detail        | Individual project showcase                  |
| `/capabilities`          | Capabilities list     | Service offerings                            |
| `/team`                  | Team page             | Team members                                 |
| `/contact`               | Contact form          | Contact/inquiry form                         |
| `/partnership` (NEW)     | PartnershipPage       | Partnership & engagement models detail page  |

**Navigation Changes:**
- Header engagement nav link: `/#engagement` → `/partnership`

---

## Component Structure

### Landing Pages
- **TensorLabLandingPage**: Home page with multiple sections (Hero, Capabilities, Projects, Case Studies, Team, Blog, Testimonials, FAQ, CTA, Footer)
- **PartnershipPage** (NEW): Partnership detail page with product and outsource engagement models

### PartnershipPage Components (NEW)

Located at `components/landing/PartnershipPage/`:

| Component                        | Purpose                                                   |
| -------------------------------- | --------------------------------------------------------- |
| `PartnershipPage.tsx`            | Main client component, orchestrates sections              |
| `sections/PartnershipHeroSection.tsx` | Hero section with tagline and partnership philosophy      |
| `sections/EngagementDetailSection.tsx` | Details for product & outsource engagement models         |
| `sections/PartnershipFAQSection.tsx` | FAQ accordion with partnership-related questions         |

### Layout Components
- **Header**: Navigation with locale switcher, theme toggle, engagement link
- **MainLayout**: App shell with header/footer
- **Footer**: Global footer

### Common UI Components
- Card, Button, Form inputs (from Ant Design + Tailwind)
- Icon components (Lucide)
- Custom sections (Hero, SectionHeader, Timeline, FAQ, etc.)

---

## Styling Approach

- **Ant Design**: Component library for structured UI (buttons, forms, modals, etc.)
- **TailwindCSS 4**: Utility-first for custom layouts, spacing, responsiveness
- **CSS Variables**: Theme colors, fonts, and semantic tokens in `app/globals.css`
- **Dark Mode**: Class-based (`.dark` on `<html>`), managed by Zustand + cookie
- **Responsive**: Mobile-first, breakpoints via Tailwind config

---

## Translation Structure

All user-facing text is i18n managed via `next-intl`.

**Namespaces:**
- `common` — Common buttons, labels, shared text
- `home` — Home page content
- `partnership` (NEW) — Partnership page content (`en.json`, `vi.json`)
- `blog`, `events`, `projects`, `capabilities`, `team`, `contact` — Page-specific

**Usage in components:**
```tsx
// Server components
const t = await getTranslations("partnership");

// Client components
const t = useTranslations("partnership");
t("title", { count: 5 }); // With parameters
```

---

## State Management

| Store/Hook                 | Purpose                          |
| -------------------------- | -------------------------------- |
| `useAppConfigStore`        | Theme, app config (persisted)    |
| `useHasAppConfigHydrated` | Hydration state (prevent FOUC)   |
| `useQuery`                 | Server state (TanStack Query)    |
| `useMutation`              | API mutations (TanStack Query)   |

See `docs/zustand.md` and `docs/api.md` for detailed patterns.

---

## Development Tips

1. **Add a new page:** Create `app/[locale]/new-page/page.tsx` + add translations to `locales/*.json`
2. **Create a reusable component:** Place in `components/ui/` or domain-specific folder
3. **Add API integration:** Create hook in `lib/api/hooks/`, regenerate schema via `pnpm api:generate`
4. **Customize theme:** Edit `lib/theme.ts` (Ant Design) + `app/globals.css` (CSS vars) + `app/layout.tsx` (fonts)
5. **Check current theme:** Use `useAppConfigStore((s) => s.theme)` selector
6. **Dark mode styles:** Use `dark:` Tailwind prefix

---

## Unresolved Questions

None at this time.
