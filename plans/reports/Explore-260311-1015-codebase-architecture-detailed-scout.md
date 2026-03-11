# Codebase Architecture Scout Report: Detailed Code Structure & Patterns
**Date:** 2026-03-11 | **Scope:** TensorLab File Paths, Components, Data Structures, Routing

---

## 1. Complete File Structure with Paths

### App Directory (Routing)
```
/Users/lethai/Desktop/projects/startup/tensorlab/app/
├── layout.tsx                                    # Root layout
└── [locale]/
    ├── layout.tsx                                # Locale layout (i18n provider)
    ├── page.tsx                                  # Homepage (TensorLabLandingPage)
    ├── projects/
    │   ├── page.tsx                              # List page (ProjectsListContent)
    │   └── [slug]/
    │       └── page.tsx                          # Detail page (ProjectDetailContent)
    ├── blog/
    │   ├── page.tsx
    │   ├── [slug]/
    │   │   └── page.tsx
    │   └── layout.tsx
    ├── events/
    │   ├── page.tsx
    │   ├── [slug]/
    │   │   ├── page.tsx
    │   │   └── EventContent.tsx
    │   └── layout.tsx
    ├── team/
    │   └── page.tsx                              # Team page (TeamContent)
    ├── contact/
    │   └── page.tsx
    └── test/                                     # Testing pages
        ├── components/
        │   └── page.tsx
        ├── dashboard/
        │   └── page.tsx
        └── landingpage/
            └── page.tsx
```

### Component Directory
```
/Users/lethai/Desktop/projects/startup/tensorlab/components/
├── SpotlightCard.tsx                            # Glow effect card component
├── ShinyText.tsx                                # Animated shine text
├── ScrollReveal.tsx                             # Scroll-triggered animations
├── ui/                                          # Basic UI components
├── layout/                                      # Layout wrappers
├── landing/
│   ├── SectionHeader.tsx                        # Section title + tag + desc
│   ├── SectionBackdrop.tsx                      # Background backdrop effect
│   └── TensorLabLandingPage/
│       ├── TensorLabLandingPage.tsx             # Main landing page
│       └── sections/
│           ├── CapabilitiesSection.tsx          # 6 capabilities cards
│           ├── EngagementSection.tsx
│           ├── HeaderSection.tsx
│           ├── HeroSection.tsx
│           └── [other sections]
├── blog/
│   └── mdx/
├── events/
└── resources/
    └── articles/
```

### Library & Config
```
/Users/lethai/Desktop/projects/startup/tensorlab/lib/
├── projectData.ts                               # PROJECT_ITEMS registry
├── teamData.ts                                  # TEAM_MEMBERS + TEAM_ADVISORS
├── landingMotion.ts                             # Motion variants (fadeUp, stagger)
├── theme.ts                                     # Ant Design theme config
├── constants.ts
└── utils.ts

/Users/lethai/Desktop/projects/startup/tensorlab/i18n/
└── routing.ts                                   # Locale config (en, vi)

/Users/lethai/Desktop/projects/startup/tensorlab/locales/
├── en.json                                      # English translations
└── vi.json                                      # Vietnamese translations
```

---

## 2. Key Component Implementations

### A. SpotlightCard (`components/SpotlightCard.tsx`)
**Purpose:** Card with radial-gradient glow on hover

**Type Definition:**
```typescript
type SpotlightCardProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement> & {
    spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
  }
>;
```

**Key Features:**
- Mouse position tracking via `onMouseMove`
- Radial gradient spotlight: `radial-gradient(circle at ${x}px ${y}px, ${color}, transparent 78%)`
- Focus ring support (accessibility)
- Dark mode blend mode: `dark:mix-blend-soft-light`
- Smooth transitions (500ms)

**Usage Examples:**
```tsx
<SpotlightCard spotlightColor="rgba(37, 99, 235, 0.35)">
  {children}
</SpotlightCard>
```

### B. CapabilitiesSection (`components/landing/.../CapabilitiesSection.tsx`)
**Current Implementation:**

```typescript
const capabilityItems = [
  {
    key: "consulting",
    icon: Compass,
    color: "text-info",
    spotlightColor: "rgba(56, 189, 248, 0.38)",
  },
  // ... 5 more items (dx, product, ai, web3, cloud)
] as const;

export function CapabilitiesSection() {
  const t = useTranslations("landing.capabilities");
  const shouldReduceMotion = useReducedMotion();
  const reduced = Boolean(shouldReduceMotion);
  const { fadeUp, stagger } = useSectionVariants(reduced);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={landingViewport}
      variants={stagger}
    >
      {/* Grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {capabilityItems.map((c) => (
          <motion.div variants={fadeUp}>
            <SpotlightCard>
              <div className="size-12 rounded-2xl bg-border flex items-center justify-center mb-4">
                <c.icon size={22} className={c.color} />
              </div>
              <h3>{t(`items.${c.key}.title`)}</h3>
              <p>{t(`items.${c.key}.desc`)}</p>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
```

**Current Data Source:**
- Hardcoded `capabilityItems` array in component
- Translations from `landing.capabilities.items.{key}.*`
- NO separate page or detail routes

---

## 3. List/Detail Page Patterns

### A. Projects Pattern (BEST MATCH)

#### 1. List Page: `/app/[locale]/projects/page.tsx`
```typescript
export async function generateMetadata() {
  const t = await getTranslations("landing.projects");
  return {
    title: t("title") + " — TensorLab",
    description: t("desc"),
  };
}

export default async function ProjectsPage() {
  return <ProjectsListContent />;
}
```

#### 2. Content Component: `/app/[locale]/projects/ProjectsListContent.tsx`
```typescript
"use client";

export default function ProjectsListContent() {
  const t = useTranslations("landing.projects");
  const shouldReduceMotion = useReducedMotion();
  const reduced = Boolean(shouldReduceMotion);
  const { fadeUp, stagger } = useSectionVariants(reduced);

  return (
    <div className="container mx-auto px-8 py-8 pb-24">
      {/* Page header */}
      <motion.div variants={stagger}>
        <Tag bordered={false} color="geekblue">
          <ShinyText text={t("tag")} disabled={reduced} />
        </Tag>
        <h1>{t("title")}</h1>
        <p>{t("desc")}</p>
      </motion.div>

      {/* Grid */}
      <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECT_ITEMS.map((project) => (
          <motion.div variants={fadeUp}>
            <Link href={`/projects/${project.slug}`}>
              <SpotlightCard spotlightColor={project.spotlightColor}>
                <Image src={project.thumbnailUrl} />
                <h2>{t(`items.${project.key}.title`)}</h2>
                <p>{t(`items.${project.key}.desc`)}</p>
                {/* Tech chips */}
              </SpotlightCard>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
```

#### 3. Detail Page: `/app/[locale]/projects/[slug]/page.tsx`
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = PROJECT_ITEMS.find((p) => p.slug === slug);
  if (!project) return {};

  const t = await getTranslations({
    locale,
    namespace: "landing.projects",
  });
  const title = t(`items.${project.key}.title`);

  return {
    title: `${title} — TensorLab`,
    openGraph: {
      images: [{ url: project.thumbnailUrl }],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECT_ITEMS.find((p) => p.slug === slug);

  if (!project) notFound();

  return <ProjectDetailContent slug={slug} />;
}
```

#### 4. Detail Content: `/app/[locale]/projects/[slug]/ProjectDetailContent.tsx`
```typescript
"use client";

export default function ProjectDetailContent({ slug }: { slug: string }) {
  const t = useTranslations("landing.projects");
  const tDetail = useTranslations("projectDetail");
  const project = PROJECT_ITEMS.find((p) => p.slug === slug);

  // Sections:
  // 1. Back link
  // 2. Hero (category badge, title, description, tech chips, CTA)
  // 3. Screenshot
  // 4. Features grid (if translation exists)
  // 5. CTA bottom
}
```

### B. Data Registry Pattern: `/lib/projectData.ts`
```typescript
export const PROJECT_ITEMS = [
  {
    key: "ccpoke",
    slug: "ccpoke",
    url: "https://kaida-palooza.github.io/ccpoke/vi/",
    isPublic: true,
    thumbnailUrl: "/images/projects/ccpoke.png",
    spotlightColor: "rgba(249, 115, 22, 0.35)" as const,
    categoryColor: "text-orange-500",
    categoryBg: "bg-orange-500/10 border-orange-500/20",
  },
  // ... more items
] as const;

export type ProjectItem = (typeof PROJECT_ITEMS)[number];
```

### C. Team Pattern: `/app/[locale]/team/TeamContent.tsx`
```typescript
const TEAM_MEMBERS: TeamMember[] = [
  {
    key: "member-1",
    slug: "member-1",
    avatarUrl: "/images/team/thai.jpg",
    social: { linkedin, github, facebook, twitter, website },
    cvUrl?: "/images/team/thai-resume.pdf",
  },
];

// Component structure:
// - Grid layout: 1 col mobile, 2 cols tablet, 4 cols desktop
// - Unified TeamCard component
// - Rotating accent colors from CARD_COLORS array
// - Social icons map for platform detection
```

---

## 4. Translation Structure

### Location
- `/locales/en.json` — English
- `/locales/vi.json` — Vietnamese

### Current Capabilities Keys
```json
{
  "landing": {
    "capabilities": {
      "tag": "Capabilities",
      "title": "From consulting to production delivery",
      "desc": "Outcome-focused delivery...",
      "items": {
        "consulting": {
          "title": "Tech & architecture consulting",
          "desc": "Architecture, technical roadmap..."
        },
        "dx": { /* Digital transformation */ },
        "product": { /* End-to-end product build */ },
        "ai": { /* AI enablement */ },
        "web3": { /* Web3 & access control */ },
        "cloud": { /* Cloud, DevOps & operations */ }
      }
    }
  }
}
```

### Projects Keys
```json
{
  "landing": {
    "projects": {
      "tag": "Our Work",
      "title": "Featured Projects",
      "desc": "...",
      "items": {
        "ccpoke": {
          "title": "Project Title",
          "category": "Category",
          "desc": "Short description",
          "tech": ["Next.js", "React", "Node"]
        }
      }
    }
  },
  "projectDetail": {
    "ccpoke": {
      "desc": "Longer description...",
      "features": [
        { "title": "Feature 1", "desc": "..." },
        { "title": "Feature 2", "desc": "..." }
      ]
    },
    "backToProjects": "Back to Projects",
    "visitProject": "Visit Project",
    "contactUs": "Contact us"
  }
}
```

---

## 5. Motion & Animation Utilities

### File: `/lib/landingMotion.ts`

**Viewport Configuration:**
```typescript
export const landingViewport = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -120px 0px", // Delays trigger for noticeable reveal
} as const;
```

**Variants Hook:**
```typescript
export function useSectionVariants(reduceMotion: boolean) {
  return {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
      }
    },
    fadeUp: {
      hidden: { opacity: 0, y: 24 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
      }
    },
    stagger: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.2
        }
      }
    }
  };
}
```

**Usage Pattern:**
```tsx
const { fadeUp, stagger } = useSectionVariants(reduced);

<motion.div variants={stagger} initial="hidden" whileInView="visible">
  <motion.div variants={fadeUp}>{/* item 1 */}</motion.div>
  <motion.div variants={fadeUp}>{/* item 2 */}</motion.div>
</motion.div>
```

---

## 6. Routing & i18n Integration

### Locale Routing
- **Supported locales:** `en` (default), `vi`
- **URL structure:**
  - English: `/projects`, `/projects/ccpoke`
  - Vietnamese: `/vi/projects`, `/vi/projects/ccpoke`

### Navigation Helper
```typescript
import { Link } from "@/i18n/navigation";

// Automatically handles locale prefixing
<Link href="/projects/ccpoke">View Project</Link>
```

### Metadata Generation
```typescript
export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "landing.projects"
  });
  // ...
}
```

---

## 7. Existing Colors & Design Tokens

### Icon Colors (Ant Design)
- `text-info` — Blue (#38bdf8)
- `text-success` — Green (#22c55e)
- `text-primary` — Blue (#2563eb)
- `text-warning` — Amber (#f59e0b)
- `text-error` — Red (#ef4444)

### Spotlight Colors (Rgba)
- Consulting: `rgba(56, 189, 248, 0.38)` — Cyan
- DX: `rgba(34, 197, 94, 0.35)` — Green
- Product: `rgba(37, 99, 235, 0.35)` — Blue
- AI: `rgba(245, 158, 11, 0.38)` — Amber
- Web3: `rgba(239, 68, 68, 0.35)` — Red
- Cloud: `rgba(14, 165, 233, 0.38)` — Sky

### Team Card Colors (Cycling)
```typescript
const CARD_COLORS = [
  { spotlight: "rgba(37, 99, 235, 0.30)", accent: "#2563eb" },
  { spotlight: "rgba(139, 92, 246, 0.30)", accent: "#8b5cf6" },
  { spotlight: "rgba(56, 189, 248, 0.30)", accent: "#0ea5e9" },
  { spotlight: "rgba(34, 197, 94, 0.30)", accent: "#10b981" },
];
```

---

## 8. Grid Layouts (Responsive)

### Projects List
```
1 col: grid-cols-1 (mobile)
2 cols: md:grid-cols-2 (tablet+)
Gap: gap-8
```

### Team
```
1 col: grid-cols-1 (mobile)
2 cols: sm:grid-cols-2 (tablet)
4 cols: lg:grid-cols-4 (desktop)
Gap: gap-6
```

### Capabilities (Current)
```
1 col: grid-cols-1 (mobile)
2 cols: md:grid-cols-2 (tablet)
3 cols: lg:grid-cols-3 (desktop)
Gap: gap-8
```

### Features (Project Detail)
```
1 col: grid-cols-1 (mobile)
2 cols: md:grid-cols-2 (tablet)
4 cols: lg:grid-cols-4 (desktop)
Gap: gap-6
```

---

## 9. Component Import Patterns

### From `@/components/`
```typescript
import SpotlightCard from "@/components/SpotlightCard";
import ShinyText from "@/components/ShinyText";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { SectionBackdrop } from "@/components/landing/TensorLabLandingPage/SectionBackdrop";
```

### From `@/lib/`
```typescript
import { PROJECT_ITEMS } from "@/lib/projectData";
import { TEAM_MEMBERS, TEAM_ADVISORS } from "@/lib/teamData";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";
```

### From `@/i18n/`
```typescript
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
```

---

## 10. Unresolved Questions

1. **Will competencies have images/screenshots?** Current team/projects have thumbnails.
2. **Should competencies replace the landing section?** Or exist alongside?
3. **External links or contact form?** Projects use both patterns.
4. **Detail page structure?** (features grid, use cases, etc.)
5. **Navigation menu integration?** Should `/competencies` appear in nav?
6. **Content source?** Hardcoded or API-fetched?

---

## Summary Table

| Element | File Path | Type | Usage |
|---------|-----------|------|-------|
| **Spotlight Card** | `components/SpotlightCard.tsx` | Component | Glow effect on all cards |
| **Projects List** | `app/[locale]/projects/ProjectsListContent.tsx` | Component | Grid of 2 cols |
| **Project Detail** | `app/[locale]/projects/[slug]/ProjectDetailContent.tsx` | Component | Hero + features + CTA |
| **Project Data** | `lib/projectData.ts` | Data Registry | 5 projects with metadata |
| **Team Data** | `lib/teamData.ts` | Data Registry | Members + Advisors |
| **Capabilities** | `components/landing/.../CapabilitiesSection.tsx` | Component | 6 hardcoded items on landing |
| **Motion Variants** | `lib/landingMotion.ts` | Hook | fadeUp, stagger, viewport |
| **i18n Links** | `i18n/navigation.ts` | Navigation | Locale-aware routing |
| **Translations** | `locales/en.json`, `locales/vi.json` | Config | All UI text |

---

## Recommended Next Steps

1. **Follow `/projects` pattern** → Nearly identical structure works for competencies
2. **Create `/lib/competencyData.ts`** → Registry of 6 competencies (consulting, dx, product, ai, web3, cloud)
3. **Create `/app/[locale]/competencies/` folder** → List page following ProjectsListContent pattern
4. **Create `/app/[locale]/competencies/[slug]/` folder** → Detail page following ProjectDetailContent pattern
5. **Add translations** → `landing.competencies.*` + `competencyDetail.*` keys
6. **Update navigation** → Link to `/competencies` if needed
7. **Keep CapabilitiesSection on landing** → Or refactor to use new route

---
