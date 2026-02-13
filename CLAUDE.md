# FE Boilerplate - Project Documentation

> Comprehensive documentation for Claude Code agents working on this Next.js project.

## Tech Stack Overview

### Core Framework

- **Next.js 16.1.6** - App Router with Server Components
- **React 19.2.3** - Latest React with concurrent features
- **TypeScript 5** - Strict mode enabled

### UI & Styling

- **Ant Design 5.23.2** - Primary component library
- **TailwindCSS 4** - Utility-first CSS framework
- **Lucide React 0.563.0** - Icon library
- **Recharts 3.7.0** - Charting library

### State Management & Data Fetching

- **Zustand 5.0.2** - Lightweight state management (for global app state)
- **TanStack Query 5.90.20** - Server state management & caching
- **openapi-fetch 0.15.0** - Type-safe API client

### Internationalization

- **next-intl 4.8.1** - i18n solution for Next.js

### Development Tools

- **ESLint 9** - Linting
- **openapi-typescript 7.10.1** - Generate TypeScript types from OpenAPI specs

## Project Structure

```
/Users/lethai/Desktop/projects/startup/fe-boilderplate/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Locale-based routing (en, vi)
│   │   ├── layout.tsx           # Locale layout with i18n provider
│   │   ├── page.tsx             # Home page
│   │   ├── error.tsx            # Error boundary
│   │   ├── loading.tsx          # Loading UI
│   │   └── test/                # Test pages
│   ├── providers/               # Global providers
│   │   ├── index.tsx            # Combined providers
│   │   ├── ThemeProvider.tsx    # Ant Design theme + dark mode
│   │   └── QueryProvider.tsx    # TanStack Query setup
│   ├── layout.tsx               # Root layout
│   ├── not-found.tsx            # 404 page
│   └── globals.css              # Global styles & CSS variables
├── components/                   # React components
│   ├── layout/                  # Layout components (Header, MainLayout)
│   ├── ui/                      # Reusable UI components
│   ├── dashboard/               # Dashboard-specific components
│   ├── landing/                 # Landing page components
│   └── landing-v2/              # Landing page v2 components
├── lib/                         # Utilities & configurations
│   ├── api/                     # API client & schema
│   │   └── schema.d.ts         # Generated OpenAPI types
│   ├── constants.ts             # App constants
│   ├── theme.ts                 # Ant Design theme config
│   └── utils.ts                 # Utility functions
├── stores/                      # Zustand stores
│   └── useAppConfigStore.ts     # App configuration (theme, etc.)
├── i18n/                        # i18n configuration
│   └── routing.ts               # Locale routing config
├── locales/                     # Translation files
│   ├── en.json                  # English translations
│   └── vi.json                  # Vietnamese translations
├── .claude/skills/              # Claude Code skills
│   ├── ui-guidelines/           # UI/UX guidelines
│   ├── vercel-react-best-practices/  # React performance patterns
│   └── vercel-composition-patterns/  # Component composition patterns
└── public/                      # Static assets
```

## Coding Conventions

### File Naming

- **Components**: `PascalCase.tsx` (e.g., `MainLayout.tsx`, `ThemeToggle.tsx`)
- **Utilities/Hooks**: `camelCase.ts` (e.g., `useAppConfigStore.ts`, `utils.ts`)
- **Pages**: Next.js conventions (`page.tsx`, `layout.tsx`, `error.tsx`, `loading.tsx`)
- **Directories**: `kebab-case` (e.g., `landing-v2/`, `api-hooks/`)

### Import Order

```tsx
// 1. External dependencies (React, Next.js, libraries)
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "antd";

// 2. Internal imports with @ alias
import { Header } from "@/components/layout/Header";
import { useAppConfigStore } from "@/stores/useAppConfigStore";
import { cn } from "@/lib/utils";

// 3. Type imports (if not inline)
import type { ThemeMode } from "@/lib/theme";
```

### TypeScript Guidelines

- **Strict mode enabled** - All type errors must be resolved
- **Path alias**: Use `@/` for imports from project root
- **Type inference**: Prefer type inference over explicit typing when obvious
- **Type safety**: Use `unknown` over `any`, avoid type assertions unless necessary
- **Function props**: Use inline types for simple props, separate `type` for complex interfaces

```tsx
// Simple props - inline
function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {}

// Complex props - separate type
type CardProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  loading?: boolean;
};

function Card({ title, description, actions, loading }: CardProps) {}
```

### Component Patterns

#### Server vs Client Components

```tsx
// Server Component (default in app/)
// - Can use async/await
// - Can access server-only APIs
// - Better performance (no JS shipped to client)
export default async function HomePage() {
  const t = await getTranslations("home");
  return <div>{t("welcome")}</div>;
}

// Client Component (must add "use client")
// - Can use hooks (useState, useEffect, etc.)
// - Can handle user interactions
// - Required for Ant Design components
("use client");
export function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  return <Button onClick={() => setTheme("dark")}>Toggle</Button>;
}
```

#### Component File Structure

```tsx
"use client"; // If client component

// Imports
import { useState } from "react";

// Types (if needed)
type MyComponentProps = {
  title: string;
};

// Main component
export function MyComponent({ title }: MyComponentProps) {
  return <div>{title}</div>;
}

// Helper components (if small and used only here)
function HelperComponent() {
  return <span>Helper</span>;
}
```

## State Management Decision Tree

### When to use what?

#### 1. React `useState` / `useReducer`

**Use for**: Component-local state that doesn't need to be shared

```tsx
// ✅ Good: Toggle, form input, local UI state
const [isOpen, setIsOpen] = useState(false);
const [searchQuery, setSearchQuery] = useState("");
```

#### 2. TanStack Query (`useQuery`, `useMutation`)

**Use for**: Server state (data fetching, caching, synchronization)

```tsx
// ✅ Good: API data, server-side data
const { data, isLoading } = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
});

const mutation = useMutation({
  mutationFn: updateUser,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
});
```

#### 3. Zustand Store

**Use for**: Global client state that needs to persist or be shared across components

```tsx
// ✅ Good: Theme preference, user preferences, app config
const theme = useAppConfigStore((s) => s.theme);
const setTheme = useAppConfigStore((s) => s.setTheme);

// With persist middleware for localStorage
export const useAppConfigStore = create<AppConfigState>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (mode) => set({ theme: mode }),
    }),
    { name: "boilerplate-app-config" },
  ),
);
```

#### 4. React Context API

**Use for**: Dependency injection, providing values down the component tree

```tsx
// ✅ Good: Theme provider, i18n provider, feature flags
const ThemeContext = createContext<ThemeMode | undefined>(undefined);

export function ThemeProvider({ children, initialTheme }: Props) {
  return (
    <ThemeContext.Provider value={initialTheme}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### Decision Flow

```
Need to share state?
├─ NO → useState/useReducer
└─ YES → Is it server data (API)?
    ├─ YES → TanStack Query
    └─ NO → Needs persistence?
        ├─ YES → Zustand with persist
        └─ NO → Many components need it?
            ├─ YES → Zustand (simple) or Context (complex)
            └─ NO → Lift state to nearest common parent
```

## Common Patterns

### 1. Creating a New Page

```tsx
// app/[locale]/my-page/page.tsx
import { getTranslations } from "next-intl/server";

export default async function MyPage() {
  const t = await getTranslations("myPage");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      {/* Page content */}
    </div>
  );
}
```

**Add translations** to `locales/en.json` and `locales/vi.json`:

```json
{
  "myPage": {
    "title": "My Page",
    "description": "Page description"
  }
}
```

### 2. Creating a Client Component with Ant Design

```tsx
// components/ui/MyButton.tsx
"use client";

import { Button } from "antd";
import { useTranslations } from "next-intl";
import type { ButtonProps } from "antd";

type MyButtonProps = ButtonProps & {
  customProp?: string;
};

export function MyButton({ customProp, ...props }: MyButtonProps) {
  const t = useTranslations("common");

  return (
    <Button type="primary" {...props}>
      {props.children || t("submit")}
    </Button>
  );
}
```

### 3. API Integration with TanStack Query

```tsx
// lib/api/users.ts
import createClient from "openapi-fetch";
import type { paths } from "./schema";

const client = createClient<paths>({
  baseUrl: "https://api.example.com",
});

export async function getUsers() {
  const { data, error } = await client.GET("/users");
  if (error) throw error;
  return data;
}

// hooks/useUsers.ts
("use client");

import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/lib/api/users";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}

// Usage in component
("use client");
import { useUsers } from "@/hooks/useUsers";

export function UserList() {
  const { data, isLoading, error } = useUsers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### 4. Creating a Zustand Store

```tsx
// stores/useMyStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type MyStoreState = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

// Simple store (no persistence)
export const useMyStore = create<MyStoreState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

// Persisted store (with localStorage)
export const useMyPersistedStore = create<MyStoreState>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
    }),
    {
      name: "my-store-key", // localStorage key
    },
  ),
);

// Usage in component
("use client");
export function Counter() {
  const count = useMyStore((s) => s.count);
  const increment = useMyStore((s) => s.increment);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
    </div>
  );
}
```

## i18n Patterns

### Configuration

- **Supported locales**: `en` (default), `vi`
- **Locale prefix**: `as-needed` - default locale (`en`) has no prefix in URL
  - English: `/` or `/about`
  - Vietnamese: `/vi` or `/vi/about`

### Server Components (Recommended)

```tsx
import { getTranslations, getLocale } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("home");
  const locale = await getLocale();

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>Current locale: {locale}</p>
    </div>
  );
}
```

### Client Components

```tsx
"use client";
import { useTranslations, useLocale } from "next-intl";

export function ClientComponent() {
  const t = useTranslations("common");
  const locale = useLocale();

  return <button>{t("submit")}</button>;
}
```

### Translation File Structure

```json
// locales/en.json
{
  "common": {
    "title": "App Title",
    "submit": "Submit"
  },
  "home": {
    "welcome": "Welcome to our app"
  },
  "errors": {
    "notFound": "Page not found",
    "serverError": "Something went wrong"
  }
}
```

### Dynamic Parameters

```tsx
const t = await getTranslations("messages");

// Translation: "Hello, {name}!"
t("greeting", { name: "John" }); // → "Hello, John!"

// Rich text: "You have {count} {count, plural, one {message} other {messages}}"
t("messageCount", { count: 5 }); // → "You have 5 messages"
```

## Theme System

### Dark Mode Implementation

- **Storage**: Zustand persist → localStorage (`boilerplate-app-config`)
- **SSR**: Cookie-based (`boilerplate-theme`) to prevent FOUC
- **Modes**: `light` | `dark` (no system mode)

### Using Theme in Components

```tsx
"use client";
import { useTheme } from "@/app/providers/ThemeProvider";

export function MyComponent() {
  const { theme, setTheme, isDark } = useTheme();

  return (
    <button onClick={() => setTheme(isDark ? "light" : "dark")}>
      Toggle Theme
    </button>
  );
}
```

### Ant Design Theme Tokens

See `lib/theme.ts` for full configuration:

- **Primary color**: `#2563eb` (blue-600)
- **Border radius**: `12px`
- **Control heights**: SM=32px, MD=40px, LG=48px
- **Font**: Be Vietnam Pro (Google Fonts)

### TailwindCSS Dark Mode

Use `dark:` prefix for dark mode styles:

```tsx
<div className="bg-white dark:bg-zinc-900 text-black dark:text-white">
  Content
</div>
```

## Reference to Existing Skills

### Available Skills

This project includes comprehensive coding guidelines in `.claude/skills/`:

#### 1. UI Guidelines (`ui-guidelines`)

**Location**: `.claude/skills/ui-guidelines/`

Comprehensive UI/UX guidelines covering:

- Color system & design tokens
- Component selection (Ant Design vs Tailwind)
- Layout patterns (container, grid, page header)
- Spacing system (level & micro)
- Typography hierarchy
- Form patterns
- Table patterns
- Icon usage
- Border radius system
- Responsive breakpoints
- State management (loading, empty, error)

**Invoke with**: Check skill files for detailed patterns

#### 2. Vercel React Best Practices (`vercel-react-best-practices`)

**Location**: `.claude/skills/vercel-react-best-practices/`

Performance optimization patterns:

- Rendering optimization
- Re-render prevention
- Async/await patterns
- Bundle optimization
- Client-side performance
- Server-side patterns
- JavaScript optimization

**Key patterns**:

- Memo usage
- Derived state
- Effect optimization
- Code splitting
- Lazy loading

#### 3. Vercel Composition Patterns (`vercel-composition-patterns`)

**Location**: `.claude/skills/vercel-composition-patterns/`

Component architecture patterns:

- Compound components
- Children over render props
- Explicit variants
- State management
- Avoiding boolean props
- React 19 patterns (no forwardRef)

**Key patterns**:

- Composition over configuration
- Context for complex state
- Lift state appropriately

### Using Skills

When working on specific features:

- **UI work**: Refer to `ui-guidelines` for design system
- **Performance issues**: Consult `vercel-react-best-practices`
- **Component design**: Follow `vercel-composition-patterns`

## Development Workflow

### Available Scripts

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Production
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint

# API
npm run api:generate     # Generate TypeScript types from OpenAPI spec
                         # Output: lib/api/schema.d.ts
```

### Development Process

1. **Start dev server**: `npm run dev`
2. **Create feature branch**: `git checkout -b feature/my-feature`
3. **Make changes** following conventions above
4. **Test locally**: Check both light/dark themes, both locales
5. **Lint**: `npm run lint`
6. **Commit**: Follow conventional commits
7. **Push & PR**: Create pull request

### Environment Setup

- **Node.js**: Version 20+ recommended
- **Package manager**: npm (lockfile: `package-lock.json`)
- **Port**: 3000 (default)

### Hot Reload

Next.js 16 supports:

- Fast Refresh for components
- Instant updates for CSS/Tailwind
- Server component updates (may require hard refresh)

## Best Practices Summary

### DO ✅

- Use Server Components by default (better performance)
- Add `"use client"` only when needed (hooks, events, Ant Design)
- Use TanStack Query for all API calls
- Follow existing file structure and naming conventions
- Add translations for all user-facing text
- Test both light/dark themes
- Test both English/Vietnamese locales
- Use TypeScript strictly (no `any`, minimal assertions)
- Use existing skills as reference for patterns
- Use path alias `@/` for imports
- Keep components small and focused
- Extract reusable logic to hooks
- Use Zustand for global client state
- Persist important state (theme, preferences)

### DON'T ❌

- Don't create new patterns without checking existing skills
- Don't use inline styles (use Tailwind or Ant Design)
- Don't hardcode strings (use i18n)
- Don't use `any` type (use `unknown` or proper types)
- Don't mix state management approaches (pick the right tool)
- Don't add dependencies without discussion
- Don't bypass TypeScript errors with assertions
- Don't create deeply nested component trees
- Don't forget to handle loading/error states
- Don't use `forwardRef` in React 19 (use `ref` prop directly)

## Quick Reference

### File Templates

#### New Page (Server Component)

```tsx
// app/[locale]/my-page/page.tsx
import { getTranslations } from "next-intl/server";

export default async function MyPage() {
  const t = await getTranslations("myPage");

  return (
    <div className="container mx-auto px-8 py-6">
      <h1 className="text-2xl font-semibold mb-4">{t("title")}</h1>
      {/* Content */}
    </div>
  );
}
```

#### New Client Component

```tsx
// components/ui/MyComponent.tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function MyComponent() {
  const t = useTranslations("common");
  const [state, setState] = useState();

  return <div>{t("label")}</div>;
}
```

#### New Hook

```tsx
// hooks/useMyHook.ts
"use client";

import { useState, useEffect } from "react";

export function useMyHook() {
  const [value, setValue] = useState();

  useEffect(() => {
    // Effect logic
  }, []);

  return { value, setValue };
}
```

---

## Additional Notes

- **Design system**: Follow Ant Design conventions for consistent UI
- **Accessibility**: Use semantic HTML, ARIA labels where needed
- **Performance**: Leverage Server Components, lazy loading, and code splitting
- **SEO**: Use Next.js metadata API for page titles and descriptions
- **Error handling**: Always handle loading and error states in data fetching
- **Type safety**: Leverage OpenAPI schema for API type safety

For more detailed patterns, refer to the skill files in `.claude/skills/`.
