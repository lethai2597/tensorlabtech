---
description: Tạo React components với categorization tự động (ui/layout/feature), TypeScript props interfaces, barrel export updates, React 19 patterns, và UI guidelines compliance
---

# Component Creator Workflow

Tạo React components với categorization tự động, TypeScript props interfaces, và barrel export updates.

## ⚠️ CRITICAL: Read UI Guidelines First

**BEFORE generating any component, you MUST:**

1. **Read UI Guidelines Skill:**
   ```
   Read file: /.agent/skills/ui-guidelines/SKILL.md
   ```

2. **Extract relevant rules based on component type:**
   - **UI Component** → Focus on: `colors-token-first`, `spacing-*`, `radius-system`, `icons-usage`
   - **Layout Component** → Focus on: `layout-*`, `section-*`, `spacing-*`
   - **Feature Component** → Apply **all rules** (comprehensive compliance)

3. **Reference specific rule files when needed:**
   - Container patterns: `/.agent/skills/ui-guidelines/rules/layout-container.md`
   - Section structure: `/.agent/skills/ui-guidelines/rules/section-card-structure.md`
   - Spacing system: `/.agent/skills/ui-guidelines/rules/spacing-level-system.md`
   - Colors: `/.agent/skills/ui-guidelines/rules/colors-token-first.md`
   - Typography: `/.agent/skills/ui-guidelines/rules/typography-hierarchy.md`

4. **Generate code following these rules** - Don't rely on examples in this workflow, always check skill files for latest patterns.

5. **Validate output** - Before completing, verify generated code matches UI guidelines (see checklist below).

## Capabilities

- ✅ Tạo components trong appropriate category (ui/layout/feature)
- ✅ Generate TypeScript props interfaces with proper typing
- ✅ Setup i18n hooks khi cần thiết
- ✅ Auto-update barrel exports (index.ts)
- ✅ Import common Ant Design components
- ✅ Follow React 19 patterns (no forwardRef)
- ✅ **Dynamically apply UI guidelines from skill files**

## Component Categories

### 1. UI Components (`components/ui/`)

**Khi nào**: Reusable, presentational components không chứa business logic.

**Đặc điểm**:
- Pure presentation components
- Highly reusable
- No business logic
- No API calls
- Props-driven
- May use Ant Design components

**Examples**: Buttons, Cards, Badges, ThemeToggle, LanguageSwitcher, Custom inputs

### 2. Layout Components (`components/layout/`)

**Khi nào**: Components định nghĩa cấu trúc và bố cục trang.

**Đặc điểm**:
- Define page structure
- Composition patterns
- May contain navigation
- Wrapper components
- Grid/Container systems

**Examples**: Header, Footer, Sidebar, MainLayout, DashboardLayout, PageContainer

### 3. Feature Components (`components/features/`)

**Khi nào**: Components chứa business logic và features cụ thể.

**Đặc điểm**:
- Business logic
- API calls (React Query)
- State management
- Data fetching
- Form handling
- Feature-specific

**Examples**: UserProfile, ProductList, LoginForm, CheckoutFlow, DataTable

## Decision Tree

```
Component mới
│
├─ Có API calls / business logic?
│  └─ YES → Feature Component (components/features/)
│
├─ Định nghĩa layout / structure?
│  └─ YES → Layout Component (components/layout/)
│
└─ Pure presentation / reusable?
   └─ YES → UI Component (components/ui/)
```

## Workflow Steps

```
1. READ UI GUIDELINES FIRST ⚠️ CRITICAL
   ├─ Read /.agent/skills/ui-guidelines/SKILL.md
   ├─ Extract relevant rules for component type
   └─ Keep rules in mind during generation

2. Analyze Request
   ├─ Extract component name
   ├─ Identify required props
   └─ Determine dependencies

3. Categorize Component
   ├─ Check for API calls → Feature
   ├─ Check for layout logic → Layout
   └─ Default → UI

4. Generate Props Interface
   ├─ Required props
   ├─ Optional props
   ├─ Callbacks
   └─ Style props

5. Select Template
   ├─ UI Component template
   ├─ Layout Component template
   └─ Feature Component template

6. Apply Template WITH UI Guidelines
   ├─ Replace placeholders
   ├─ Add imports
   ├─ Generate JSX
   └─ Apply patterns from skill files (NOT hardcoded examples)

7. Add i18n (if needed)
   ├─ Add 'use client' directive
   ├─ Import useTranslations
   └─ Replace static text

8. Create File
   └─ Write to appropriate directory

9. Update Barrel Export
   ├─ Add component export
   ├─ Add type export
   └─ Sort alphabetically

10. VALIDATE AGAINST UI GUIDELINES ⚠️ CRITICAL
    └─ Use checklist below to verify compliance
```

## Templates

### UI Component Template

```tsx
import { cn } from '@/lib/utils';

export interface {{COMPONENT_NAME}}Props {
  {{PROPS_DEFINITION}}
  className?: string;
}

export function {{COMPONENT_NAME}}({{PROPS_DESTRUCTURE}}: {{COMPONENT_NAME}}Props) {
  return (
    <div className={cn({{BASE_CLASSES}}, className)}>
      {{COMPONENT_BODY}}
    </div>
  );
}
```

**Placeholders:**
- `{{COMPONENT_NAME}}` : Component name (e.g., "Button", "StatusBadge")
- `{{PROPS_DEFINITION}}` : Props interface body (multiline)
- `{{PROPS_DESTRUCTURE}}` : Props destructuring in function params
- `{{BASE_CLASSES}}` : Base Tailwind classes as string
- `{{COMPONENT_BODY}}` : JSX content inside component

### Layout Component Template

```tsx
import { cn } from '@/lib/utils';

export interface {{COMPONENT_NAME}}Props {
  children: React.ReactNode;
  {{PROPS_DEFINITION}}
  className?: string;
}

export function {{COMPONENT_NAME}}({{PROPS_DESTRUCTURE}}: {{COMPONENT_NAME}}Props) {
  return (
    <{{WRAPPER_ELEMENT}} className={cn({{BASE_CLASSES}}, className)}>
      {{COMPONENT_BODY}}
    </{{WRAPPER_ELEMENT}}>
  );
}
```

**Additional placeholder:**
- `{{WRAPPER_ELEMENT}}` : HTML element (div, section, header, main, etc.)

**Common Layout Patterns:**
- Page Wrapper: `'container mx-auto px-8'`
- Section Card: `'bg-surface border border-border rounded-3xl p-8'`
- Sub-block: `'bg-background rounded-2xl p-6'`
- Header: `'border-b border-border bg-surface'`
- Sidebar: `'w-64 border-r border-border bg-surface'`

### Feature Component Template

```tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { {{ANT_IMPORTS}} } from 'antd';
import { cn } from '@/lib/utils';

export interface {{COMPONENT_NAME}}Props {
  {{PROPS_DEFINITION}}
  className?: string;
}

export function {{COMPONENT_NAME}}({{PROPS_DESTRUCTURE}}: {{COMPONENT_NAME}}Props) {
  const t = useTranslations('{{I18N_NAMESPACE}}');

  {{HOOKS_SECTION}}

  {{LOADING_STATE}}

  {{ERROR_STATE}}

  return (
    <div className={cn({{BASE_CLASSES}}, className)}>
      {{COMPONENT_BODY}}
    </div>
  );
}
```

**Additional placeholders:**
- `{{ANT_IMPORTS}}` : Ant Design components to import
- `{{I18N_NAMESPACE}}` : Translation namespace
- `{{HOOKS_SECTION}}` : React hooks (useQuery, useState, etc.)
- `{{LOADING_STATE}}` : Loading state JSX
- `{{ERROR_STATE}}` : Error state JSX

## TypeScript Props Interface

### Naming Convention

```typescript
// Component: Button.tsx → export interface ButtonProps
// Component: UserProfile.tsx → export interface UserProfileProps
```

### Common Prop Types

```typescript
// Children
children?: React.ReactNode;

// Text content
title: string;
description?: string;

// Variants
variant?: 'primary' | 'secondary' | 'ghost' | 'outlined';
size?: 'sm' | 'md' | 'lg';
status?: 'success' | 'warning' | 'error' | 'info';

// Boolean flags
disabled?: boolean;
loading?: boolean;

// Callbacks
onClick?: () => void;
onSubmit?: (data: T) => void;
onChange?: (value: T) => void;

// Styling
className?: string;
style?: React.CSSProperties;
```

## Barrel Export Update Logic

```typescript
// components/ui/index.ts - Alphabetically sorted
export { Badge } from './Badge';
export { Button } from './Button';
export { Card } from './Card';

export type { BadgeProps } from './Badge';
export type { ButtonProps } from './Button';
export type { CardProps } from './Card';
```

**Rules**:
1. ✅ Alphabetically sorted
2. ✅ Named exports (không dùng default export)
3. ✅ Export both component và Props interface
4. ✅ Separate section cho components và types
5. ✅ Update automatically khi tạo component mới

## React 19 Patterns

### No forwardRef
```typescript
// ❌ Old (React 18)
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return <button ref={ref} {...props}>{children}</button>;
  }
);

// ✅ New (React 19)
export function Button({ children, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}
```

### Server Components by default
```typescript
// ✅ Server Component (default)
export function ProductList({ products }: ProductListProps) {
  return <div>...</div>;
}

// ✅ Client Component (khi cần interactivity)
'use client';
export function ThemeToggle() {
  const [theme, setTheme] = useState('light');
  // ...
}
```

## i18n Integration

### When to add i18n

**Cần i18n nếu**: Component hiển thị static text (labels, messages, buttons, headings)
**Không cần i18n nếu**: Pure layout components (không có text), dynamic content từ API

### i18n Pattern
```typescript
'use client';

import { useTranslations } from 'next-intl';

export function LoginForm() {
  const t = useTranslations('auth.login');

  return (
    <Form>
      <Input placeholder={t('email.placeholder')} />
      <Button>{t('submit')}</Button>
    </Form>
  );
}
```

## UI Guidelines Validation Checklist

**Before completing task, verify generated code:**

### Layout & Structure
- [ ] Container uses `container mx-auto px-8` (if applicable)
- [ ] Section card uses `bg-surface border border-border rounded-3xl p-8`
- [ ] Sub-blocks use `bg-background rounded-2xl p-6`
- [ ] Grid/flex layouts follow skill patterns

### Spacing
- [ ] Level spacing uses 8px system (`gap-8`, `mb-8`, `p-8`)
- [ ] Micro spacing uses 4px system (`gap-4`, `space-y-4`)
- [ ] No arbitrary spacing values (no `gap-3`, `p-5`, etc.)

### Colors
- [ ] All colors use tokens (`bg-surface`, `text-foreground`, `border-border`)
- [ ] NO hardcoded colors (`bg-white`, `text-gray-500`)
- [ ] Dark mode support via token system (automatic)

### Typography
- [ ] Headings use semantic classes (`text-3xl`, `text-2xl`, `text-xl`)
- [ ] Font weights appropriate (`font-semibold` for headings)
- [ ] Secondary text uses `text-sm text-zinc-500 dark:text-zinc-400`

### Radius
- [ ] Large elements use `rounded-3xl`
- [ ] Medium elements use `rounded-2xl`
- [ ] Small elements use `rounded-xl`
- [ ] NO `rounded-lg`, `rounded-md` (not in system)

### Components
- [ ] Ant Design used for complex components (Table, Form, Modal)
- [ ] Tailwind used for layout/spacing
- [ ] NO shadows (use borders instead: `border border-border`)

### Icons
- [ ] Icons from lucide-react (not Ant Design icons)
- [ ] Icon sizes: 16px (`size={16}`) or 20px (`size={20}`)

**If any checklist item fails, read the corresponding skill rule file and fix before completing.**

## Best Practices

### DO ✅
- ✅ Always generate TypeScript props interface
- ✅ Use named exports (not default)
- ✅ Follow React 19 patterns (no forwardRef)
- ✅ Apply UI guidelines automatically
- ✅ Add 'use client' khi cần hooks/state
- ✅ Update barrel exports automatically
- ✅ Sort exports alphabetically
- ✅ Use token-first colors
- ✅ Add i18n for static text
- ✅ Use Ant Design cho complex components
- ✅ Use TailwindCSS cho layout/spacing

### DON'T ❌
- ❌ Use default exports
- ❌ Use forwardRef (React 18 pattern)
- ❌ Hardcode colors (use tokens)
- ❌ Use inline styles (use Tailwind)
- ❌ Skip TypeScript types
- ❌ Forget barrel export updates
- ❌ Mix categories (ui component trong features/)
- ❌ Use shadow (dùng border thay vì)

## File Naming Conventions

```
components/
├─ ui/
│  ├─ Button.tsx          ← PascalCase, single word
│  ├─ StatusBadge.tsx     ← PascalCase, compound
│  └─ index.ts
│
├─ layout/
│  ├─ Header.tsx
│  ├─ MainLayout.tsx
│  └─ index.ts
│
└─ features/
   ├─ UserProfile.tsx
   ├─ ProductList.tsx
   └─ index.ts
```
