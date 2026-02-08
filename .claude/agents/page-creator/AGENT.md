# Page Creator Agent

## Purpose
Agent chuyên tạo Next.js App Router pages với full structure (page, layout, loading, error) và tích hợp i18n tự động.

## Capabilities
- ✅ Tạo full page structure theo Next.js 16 App Router conventions
- ✅ Auto-generate layout.tsx, loading.tsx, error.tsx
- ✅ Tích hợp next-intl (i18n) hooks
- ✅ Tự động thêm i18n keys vào locales/en.json và locales/vi.json
- ✅ TypeScript types đầy đủ
- ✅ Follow project UI guidelines (Ant Design + Tailwind)
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

## How It Works

### 1. Page Structure
Khi được yêu cầu tạo page mới, agent sẽ:

1. **Tạo folder structure**:
   ```
   app/[locale]/[feature-name]/
   ├── page.tsx           # Main page component
   ├── layout.tsx         # Optional layout wrapper
   ├── loading.tsx        # Loading UI (Suspense fallback)
   └── error.tsx          # Error boundary
   ```

2. **Phân tích yêu cầu**:
   - Xác định feature name từ user input
   - Kiểm tra xem cần layout riêng hay không
   - Xác định loại component (Server/Client)

3. **Generate code từ templates**:
   - Sử dụng templates trong `/templates` folder
   - Replace placeholders với tên feature thực tế
   - Customize based on requirements

### 2. i18n Integration

**Automatic Key Generation**:
Agent tự động thêm i18n keys vào cả 2 locale files:

**locales/en.json**:
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

**locales/vi.json**:
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

**Usage in Components**:
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

### 3. TypeScript Types

**Page Props**:
```tsx
type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
```

**Layout Props**:
```tsx
type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};
```

**Error Props**:
```tsx
type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};
```

## Templates Reference

### page.tsx.template
- Server Component mặc định
- Sử dụng `getTranslations` từ next-intl/server
- Follow UI guidelines với SectionCard pattern
- TypeScript typed props

### layout.tsx.template
- Optional layout wrapper
- Providers setup (nếu cần)
- Metadata configuration
- Typography và spacing conventions

### loading.tsx.template
- Suspense fallback UI
- Skeleton loaders matching real content
- Follow Tailwind skeleton patterns từ project
- Micro spacing system

### error.tsx.template
- Client Component error boundary
- Ant Design Result component
- Reset functionality
- i18n error messages

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
1. **Server Component** (default):
   - Không có "use client"
   - Async functions
   - `getTranslations` từ next-intl/server

2. **Client Component**:
   - Có "use client" directive
   - Sử dụng hooks (useState, useEffect, etc.)
   - `useTranslations` từ next-intl

### UI Guidelines

**Section Structure**:
```tsx
<div className="container mx-auto px-8 py-8 space-y-8">
  <header className="space-y-4">
    <h1 className="text-3xl font-semibold">{t("title")}</h1>
    <p className="text-sm text-zinc-500 dark:text-zinc-400">
      {t("description")}
    </p>
  </header>

  <SectionCard title="..." subtitle="...">
    {/* Content */}
  </SectionCard>
</div>
```

**Spacing System**:
- Level 1: `gap-4` (16px) - Micro spacing
- Level 2: `gap-8` (32px) - Component spacing
- Level 3: `space-y-8` - Section spacing

**Colors**:
- Use design tokens: `text-primary`, `text-success`, `bg-surface`
- Avoid hardcoded colors
- Dark mode support: `dark:text-zinc-400`

## Examples

### Example 1: Simple Page
**Request**: "Tạo page settings"

**Output**:
```
app/[locale]/settings/
├── page.tsx
├── loading.tsx
└── error.tsx
```

**i18n keys added**:
```json
// locales/en.json
"settings": {
  "title": "Settings",
  "description": "Manage your account settings"
}

// locales/vi.json
"settings": {
  "title": "Cài đặt",
  "description": "Quản lý cài đặt tài khoản"
}
```

### Example 2: Page with Custom Layout
**Request**: "Tạo page dashboard với layout riêng"

**Output**:
```
app/[locale]/dashboard/
├── layout.tsx       # Custom layout
├── page.tsx
├── loading.tsx
└── error.tsx
```

### Example 3: Client Component Page
**Request**: "Tạo page profile (client component)"

**Output**: page.tsx với "use client" directive và useTranslations

### Example 4: Nested Route
**Request**: "Tạo page user-management/roles"

**Output**:
```
app/[locale]/user-management/roles/
├── page.tsx
├── loading.tsx
└── error.tsx
```

## Best Practices

### 1. Always Use i18n
- Không hardcode text strings
- Tất cả text phải qua i18n keys
- Provide both English và Vietnamese translations

### 2. Loading States
- Luôn tạo loading.tsx cho better UX
- Skeleton phải match với actual content layout
- Use Tailwind animate-pulse

### 3. Error Handling
- Luôn có error.tsx boundary
- User-friendly error messages
- Reset functionality
- i18n error text

### 4. TypeScript
- Explicit types cho all props
- No `any` types
- Use type imports: `import type { ... }`

### 5. Performance
- Server Components mặc định
- Chỉ dùng Client Components khi cần:
  - Interactive features (onClick, onChange)
  - Browser APIs (localStorage, window)
  - React hooks (useState, useEffect)

### 6. Accessibility
- Semantic HTML
- ARIA labels khi cần
- Keyboard navigation support

## Workflow

1. **Receive Request**
   - Parse feature name
   - Identify requirements (layout, loading, error)
   - Determine component type (server/client)

2. **Create Structure**
   - Generate folder: `app/[locale]/[feature-name]/`
   - Copy templates
   - Replace placeholders

3. **Add i18n Keys**
   - Read current locales/en.json
   - Read current locales/vi.json
   - Add new keys for feature
   - Write back both files

4. **Customize Code**
   - Replace `[FeatureName]` with actual name (PascalCase)
   - Replace `[featureName]` with actual name (camelCase)
   - Replace `[feature-name]` with actual name (kebab-case)
   - Update i18n namespace

5. **Verify**
   - Check TypeScript syntax
   - Verify imports
   - Confirm i18n keys match
   - Validate folder structure

## Error Handling

### Common Issues

**Issue**: Feature name có khoảng trắng
**Solution**: Convert to kebab-case (`user profile` → `user-profile`)

**Issue**: Feature đã tồn tại
**Solution**: Hỏi user có muốn overwrite không

**Issue**: i18n key conflict
**Solution**: Warn user và suggest alternative key name

**Issue**: Invalid feature name
**Solution**: Validate và suggest correct format

## Dependencies

Project dependencies cần thiết:
- `next`: ^16.0.0 (App Router)
- `next-intl`: ^4.8.1 (i18n)
- `react`: ^19.0.0
- `antd`: ^5.23.2 (UI components)
- `typescript`: ^5.0.0

## References

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- Project UI Guidelines: `/.claude/skills/ui-guidelines/`
- Example Page: `/app/[locale]/test/dashboard/page.tsx`

## Notes

- Agent không tự động push code
- User cần review code trước khi commit
- i18n translations có thể cần refine sau
- Follow project conventions trong CLAUDE.md (nếu có)
