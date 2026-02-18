---
description: Tạo Next.js App Router pages với full structure (page, layout, loading, error), i18n tự động (next-intl), và UI guidelines compliance
---

# Page Creator Workflow

Agent chuyên tạo Next.js App Router pages với full structure (page, layout, loading, error) và tích hợp i18n tự động.

## ⚠️ CRITICAL: Read UI Guidelines First

**BEFORE generating any page, you MUST:**

1. **Read UI Guidelines Skill:**
   ```
   Read file: /.agent/skills/ui-guidelines/SKILL.md
   ```

2. **Focus on these HIGH-priority rules for pages:**
   - `layout-container.md` - Container and page wrapper standards
   - `layout-page-header.md` - Page header structure
   - `section-card-structure.md` - Section card patterns
   - `section-header.md` - Section headers with title + actions
   - `spacing-level-system.md` - Level spacing (8px system)
   - `states-loading-empty-error.md` - Loading/Empty/Error patterns

3. **Generate code following skill patterns** - Don't rely on examples in this workflow, always check skill files for latest patterns.

4. **Validate output** - Before completing, verify generated pages match UI guidelines (see checklist below).

## Capabilities

- ✅ Tạo full page structure theo Next.js 16 App Router conventions
- ✅ Auto-generate layout.tsx, loading.tsx, error.tsx
- ✅ Tích hợp next-intl (i18n) hooks
- ✅ Tự động thêm i18n keys vào locales/en.json và locales/vi.json
- ✅ TypeScript types đầy đủ
- ✅ **Dynamically apply UI guidelines from skill files**
- ✅ Support cả Client Components và Server Components

## Usage

### Basic Command
```
Tạo page mới cho feature [feature-name]
```

### Advanced Command
```
Tạo page [feature-name] với:
- Layout: [có/không]
- Loading state: [có/không]
- Error boundary: [có/không]
- Client component: [có/không]
```

## Workflow Steps

```
1. READ UI GUIDELINES FIRST ⚠️ CRITICAL
   ├─ Read /.agent/skills/ui-guidelines/SKILL.md
   ├─ Extract page-specific rules (layout, section, spacing, states)
   └─ Keep patterns in mind during generation

2. Receive Request
   ├─ Parse feature name
   ├─ Identify requirements (layout, loading, error)
   └─ Determine component type (server/client)

3. Create Structure
   ├─ Generate folder: app/[locale]/[feature-name]/
   ├─ Copy templates
   └─ Replace placeholders

4. Add i18n Keys
   ├─ Read current locales/en.json
   ├─ Read current locales/vi.json
   ├─ Add new keys for feature
   └─ Write back both files

5. Customize Code WITH UI Guidelines
   ├─ Replace [FeatureName] with actual name (PascalCase)
   ├─ Replace [featureName] with actual name (camelCase)
   ├─ Replace [feature-name] with actual name (kebab-case)
   ├─ Update i18n namespace
   └─ Apply patterns from skill files (NOT hardcoded examples)

6. VALIDATE AGAINST UI GUIDELINES ⚠️ CRITICAL
   ├─ Use checklist below to verify compliance
   ├─ Check TypeScript syntax
   ├─ Verify imports
   ├─ Confirm i18n keys match
   └─ Validate folder structure
```

## Page Structure

Khi được yêu cầu tạo page mới:

```
app/[locale]/[feature-name]/
├── page.tsx           # Main page component
├── layout.tsx         # Optional layout wrapper
├── loading.tsx        # Loading UI (Suspense fallback)
└── error.tsx          # Error boundary
```

## Templates

### page.tsx Template

```tsx
import { getTranslations } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function [FeatureName]Page({
  params,
  searchParams,
}: PageProps) {
  const { locale } = await params;
  const t = await getTranslations("[featureName]");

  return (
    <div className="container mx-auto px-8 py-8 space-y-8">
      {/* Page Header */}
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold">{t("title")}</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {t("description")}
        </p>
      </header>

      {/* Main Content */}
      <section className="bg-surface border border-border rounded-3xl p-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-4">{t("content.heading")}</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {t("content.text")}
            </p>
          </div>

          {/* Add your content here */}
        </div>
      </section>
    </div>
  );
}
```

### layout.tsx Template

```tsx
import type { Metadata } from "next";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "[Feature Name]",
  description: "[Feature description]",
};

export default async function [FeatureName]Layout({
  children,
  params,
}: LayoutProps) {
  const { locale } = await params;

  return (
    <div className="[feature-name]-layout">
      {/* Add layout wrapper, providers, or shared UI here */}
      {children}
    </div>
  );
}
```

### loading.tsx Template

```tsx
export default function Loading() {
  return (
    <div className="container mx-auto px-8 py-8 space-y-8">
      {/* Header Skeleton */}
      <header className="space-y-4">
        <div className="h-9 w-64 animate-pulse rounded-lg bg-border/60" />
        <div className="h-5 w-96 animate-pulse rounded-lg bg-border/60" />
      </header>

      {/* Section Skeleton */}
      <section className="bg-surface border border-border rounded-3xl p-8">
        <div className="space-y-8">
          {/* Section header */}
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-2xl animate-pulse bg-border/60" />
            <div className="flex-1 space-y-2">
              <div className="h-6 w-48 animate-pulse rounded-lg bg-border/60" />
              <div className="h-4 w-72 animate-pulse rounded-lg bg-border/60" />
            </div>
          </div>

          {/* Content skeleton */}
          <div className="rounded-2xl bg-background p-8 space-y-4">
            <div className="h-4 w-full animate-pulse rounded-lg bg-border/60" />
            <div className="h-4 max-w-[90%] animate-pulse rounded-lg bg-border/60" />
            <div className="h-4 max-w-[70%] animate-pulse rounded-lg bg-border/60" />
          </div>

          {/* Grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-32 animate-pulse rounded-2xl bg-border/60" />
            <div className="h-32 animate-pulse rounded-2xl bg-border/60" />
          </div>
        </div>
      </section>
    </div>
  );
}
```

### error.tsx Template

```tsx
"use client";

import { Button, Result } from "antd";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  const t = useTranslations("[featureName]");

  useEffect(() => {
    // Log error to error reporting service
    console.error("[FeatureName] Error:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-8 py-8">
      <Result
        status="error"
        title={t("error.title")}
        subTitle={
          t("error.subtitle") +
          (error.digest ? ` (Error ID: ${error.digest})` : "")
        }
        extra={[
          <Button type="primary" key="retry" onClick={reset}>
            {t("error.retry")}
          </Button>,
          <Button key="home" href="/">
            {t("error.backHome")}
          </Button>,
        ]}
      />
    </div>
  );
}
```

## i18n Integration

### Automatic Key Generation

Agent tự động thêm i18n keys vào cả 2 locale files:

**locales/en.json:**
```json
{
  "[featureName]": {
    "title": "[Feature Name]",
    "description": "Description for [feature name]",
    "loading": "Loading...",
    "error": "An error occurred"
  }
}
```

**locales/vi.json:**
```json
{
  "[featureName]": {
    "title": "[Tên Feature tiếng Việt]",
    "description": "Mô tả cho [feature name]",
    "loading": "Đang tải...",
    "error": "Đã xảy ra lỗi"
  }
}
```

### Usage in Components

```tsx
// Server Component
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("featureName");
  return <h1>{t("title")}</h1>;
}

// Client Component
"use client";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("featureName");
  return <h1>{t("title")}</h1>;
}
```

## TypeScript Types

```tsx
// Page Props
type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Layout Props
type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// Error Props
type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};
```

## Project Conventions

### File Naming
- ✅ Lowercase với dashes: `user-profile`, `dashboard`
- ❌ Avoid: `UserProfile`, `user_profile`

### Folder Structure
```
app/[locale]/
├── [feature]/
│   ├── page.tsx          # Bắt buộc
│   ├── layout.tsx        # Optional
│   ├── loading.tsx       # Recommended
│   ├── error.tsx         # Recommended
│   └── [sub-feature]/    # Nested routes
│       └── page.tsx
```

### Component Patterns
1. **Server Component** (default): Không có "use client", async functions, `getTranslations` từ next-intl/server
2. **Client Component**: Có "use client" directive, hooks (useState, useEffect), `useTranslations` từ next-intl

## UI Guidelines Validation Checklist

**Before completing task, verify generated pages:**

### Layout & Structure
- [ ] Page wrapper uses `container mx-auto px-8 py-8`
- [ ] Section spacing uses `space-y-8`
- [ ] Section cards use `bg-surface border border-border rounded-3xl p-8`
- [ ] Page header structure matches `layout-page-header.md` pattern

### Spacing
- [ ] Uses 8px level spacing (`gap-8`, `mb-8`, `p-8`, `space-y-8`)
- [ ] Micro spacing uses 4px system (`gap-4`, `space-y-4`)
- [ ] No arbitrary values (no `gap-3`, `p-5`)

### Colors
- [ ] All colors use tokens (`bg-surface`, `text-foreground`, `border-border`)
- [ ] NO hardcoded colors (`bg-white`, `text-gray-500`)
- [ ] Dark mode via tokens (automatic)

### Typography
- [ ] Page title: `text-3xl font-semibold`
- [ ] Section titles: `text-2xl font-semibold`
- [ ] Descriptions: `text-sm text-zinc-500 dark:text-zinc-400`

### Loading State (loading.tsx)
- [ ] Skeleton structure matches actual page layout
- [ ] Uses `animate-pulse` for loading effect
- [ ] Follows same spacing as page.tsx

### Error State (error.tsx)
- [ ] Uses Ant Design `Result` component
- [ ] Has reset functionality
- [ ] i18n error messages
- [ ] Proper error logging with digest

**If any item fails, read the corresponding skill rule file and fix before completing.**

## Best Practices

1. **Always Use i18n** - Không hardcode text, cung cấp cả English và Vietnamese
2. **Loading States** - Skeleton phải match với actual content layout
3. **Error Handling** - Error boundary với user-friendly messages và reset functionality
4. **TypeScript** - Explicit types, no `any`
5. **Performance** - Server Components mặc định, Client Components chỉ khi cần
6. **Accessibility** - Semantic HTML, ARIA labels khi cần

## Dependencies

- `next`: ^16.0.0 (App Router)
- `next-intl`: ^4.8.1 (i18n)
- `react`: ^19.0.0
- `antd`: ^5.23.2 (UI components)
- `typescript`: ^5.0.0

## Error Handling

| Issue | Solution |
|-------|----------|
| Feature name có khoảng trắng | Convert to kebab-case (`user profile` → `user-profile`) |
| Feature đã tồn tại | Hỏi user có muốn overwrite không |
| i18n key conflict | Warn user và suggest alternative key name |
| Invalid feature name | Validate và suggest correct format |

## Notes

- Agent không tự động push code
- User cần review code trước khi commit
- i18n translations có thể cần refine sau
- Example Page: `/app/[locale]/test/dashboard/page.tsx`
