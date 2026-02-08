---
name: component-creator
description: Specialized agent for creating React components with proper categorization, TypeScript interfaces, and automatic barrel export updates. Follows React 19 patterns, UI guidelines, and project conventions.
metadata:
  version: "1.0.0"
  author: lethai
  last_updated: "2026-02-08"
---

# Component Creator Agent

Tạo React components với categorization tự động, TypeScript props interfaces, và barrel export updates.

## Capabilities

- ✅ Tạo components trong appropriate category (ui/layout/feature)
- ✅ Generate TypeScript props interfaces with proper typing
- ✅ Setup i18n hooks khi cần thiết
- ✅ Auto-update barrel exports (index.ts)
- ✅ Import common Ant Design components
- ✅ Follow React 19 patterns (no forwardRef)
- ✅ Apply UI guidelines automatically

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

**Examples**:
- Buttons, Cards, Badges
- ThemeToggle, LanguageSwitcher
- Custom inputs, selects
- Loading states, skeletons

**Template**: `ui-component.tsx.template`

### 2. Layout Components (`components/layout/`)

**Khi nào**: Components định nghĩa cấu trúc và bố cục trang.

**Đặc điểm**:
- Define page structure
- Composition patterns
- May contain navigation
- Wrapper components
- Grid/Container systems

**Examples**:
- Header, Footer, Sidebar
- MainLayout, DashboardLayout
- PageContainer, Section
- Navigation, Breadcrumbs

**Template**: `layout-component.tsx.template`

### 3. Feature Components (`components/features/`)

**Khi nào**: Components chứa business logic và features cụ thể.

**Đặc điểm**:
- Business logic
- API calls (React Query)
- State management
- Data fetching
- Form handling
- Feature-specific

**Examples**:
- UserProfile, ProductList
- LoginForm, CheckoutFlow
- DataTable, Dashboard widgets
- Chart components with data

**Template**: `feature-component.tsx.template`

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

## TypeScript Props Interface Generation

### Naming Convention

```typescript
// Component: Button.tsx
export interface ButtonProps {
  // ...
}

// Component: UserProfile.tsx
export interface UserProfileProps {
  // ...
}
```

### Props Structure

```typescript
export interface ComponentProps {
  // Required props (no ?)
  children: React.ReactNode;
  title: string;

  // Optional props (with ?)
  description?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';

  // Callbacks
  onSubmit?: (data: FormData) => void;
  onChange?: (value: string) => void;

  // Style/className (always optional)
  className?: string;
  style?: React.CSSProperties;

  // Ant Design props extension (khi cần)
  // ...extends ButtonProps from 'antd'
}
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
isOpen?: boolean;
isActive?: boolean;

// Callbacks
onClick?: () => void;
onSubmit?: (data: T) => void;
onChange?: (value: T) => void;
onClose?: () => void;

// Data
data?: T[];
item?: T;

// Styling
className?: string;
style?: React.CSSProperties;
```

## Barrel Export Update Logic

### Auto-update `index.ts` in component directory

```typescript
// components/ui/index.ts
export { Button } from './Button';
export { Card } from './Card';
export { Badge } from './Badge';
// ... alphabetically sorted

export type { ButtonProps } from './Button';
export type { CardProps } from './Card';
export type { BadgeProps } from './Badge';
```

**Rules**:
1. ✅ Alphabetically sorted
2. ✅ Named exports (không dùng default export)
3. ✅ Export both component và Props interface
4. ✅ Separate section cho components và types
5. ✅ Update automatically khi tạo component mới

### Example Update Flow

```bash
# Before
export { Button } from './Button';
export { Card } from './Card';

export type { ButtonProps } from './Button';
export type { CardProps } from './Card';

# Create new component: Badge.tsx

# After (auto-updated)
export { Badge } from './Badge';  // ← Added
export { Button } from './Button';
export { Card } from './Card';

export type { BadgeProps } from './Badge';  // ← Added
export type { ButtonProps } from './Button';
export type { CardProps } from './Card';
```

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

### Use hook patterns

```typescript
// ✅ Custom hooks for logic separation
function useProductData(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
  });
}

export function ProductDetail({ id }: ProductDetailProps) {
  const { data, isLoading } = useProductData(id);
  // ...
}
```

## i18n Integration

### When to add i18n

**Cần i18n nếu**:
- Component hiển thị static text
- Labels, placeholders, messages
- Error messages, tooltips
- Button text, headings

**Không cần i18n nếu**:
- Pure layout components (không có text)
- Dynamic content từ API
- Technical identifiers

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

### i18n File Structure

```json
// messages/en.json
{
  "auth": {
    "login": {
      "title": "Sign In",
      "email": {
        "label": "Email",
        "placeholder": "Enter your email"
      },
      "submit": "Sign In"
    }
  }
}
```

## Common Ant Design Imports

### UI Components

```typescript
import {
  Button,
  Input,
  Form,
  Select,
  Card,
  Table,
  Modal,
  Drawer,
  Dropdown,
  Menu,
  Tabs,
  Badge,
  Tag,
  Tooltip,
  Popover,
  Alert,
  Empty,
  Result,
  Spin,
  Skeleton,
} from 'antd';
```

### Icons (lucide-react)

```typescript
import {
  ChevronDown,
  ChevronRight,
  Search,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  AlertCircle,
  Info,
  Settings,
  User,
  LogOut,
} from 'lucide-react';
```

## UI Guidelines Integration

### Apply automatically

Khi tạo component, auto-apply các rules:

1. **Layout & Container**
   - Page wrapper: `container mx-auto px-8`
   - Section: `bg-surface border border-border rounded-3xl p-8`
   - Sub-block: `bg-background rounded-2xl p-6`

2. **Spacing**
   - Level spacing: `gap-8`, `mb-8`, `p-8`
   - Micro spacing: `gap-4`, `space-y-4`

3. **Typography**
   - H1: `text-3xl font-semibold`
   - H2: `text-2xl font-semibold`
   - H3: `text-xl font-semibold`
   - Body: `text-base`
   - Small: `text-sm text-zinc-500`

4. **Colors (Token-first)**
   - Background: `bg-background`, `bg-surface`
   - Text: `text-foreground`, `text-primary`, `text-zinc-500`
   - Border: `border-border`

5. **Radius**
   - Large: `rounded-3xl`
   - Medium: `rounded-2xl`
   - Small: `rounded-xl`

## Usage Examples

### Example 1: Create UI Component

**Request**: "Tạo StatusBadge component hiển thị status với màu sắc khác nhau"

**Agent Process**:
1. ✅ Categorize: UI component (pure presentation)
2. ✅ Generate props interface with variants
3. ✅ Apply template: `ui-component.tsx.template`
4. ✅ Add i18n (không cần - no static text)
5. ✅ Create file: `components/ui/StatusBadge.tsx`
6. ✅ Update: `components/ui/index.ts`

**Output**:
```typescript
// components/ui/StatusBadge.tsx
import { Badge } from 'antd';
import { cn } from '@/lib/utils';

export interface StatusBadgeProps {
  status: 'success' | 'warning' | 'error' | 'info';
  text?: string;
  className?: string;
}

export function StatusBadge({
  status,
  text,
  className
}: StatusBadgeProps) {
  return (
    <Badge
      status={status}
      text={text}
      className={cn(className)}
    />
  );
}
```

### Example 2: Create Layout Component

**Request**: "Tạo DashboardLayout với sidebar và main content area"

**Agent Process**:
1. ✅ Categorize: Layout component
2. ✅ Generate props interface with children
3. ✅ Apply template: `layout-component.tsx.template`
4. ✅ Add i18n (không cần - pure layout)
5. ✅ Create file: `components/layout/DashboardLayout.tsx`
6. ✅ Update: `components/layout/index.ts`
7. ✅ Apply UI guidelines: container, spacing

**Output**:
```typescript
// components/layout/DashboardLayout.tsx
export interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

export function DashboardLayout({
  children,
  sidebar
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {sidebar && (
        <aside className="w-64 border-r border-border bg-surface">
          {sidebar}
        </aside>
      )}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
```

### Example 3: Create Feature Component

**Request**: "Tạo UserProfileCard component fetch và hiển thị user data"

**Agent Process**:
1. ✅ Categorize: Feature component (có API call)
2. ✅ Generate props interface with user ID
3. ✅ Apply template: `feature-component.tsx.template`
4. ✅ Add i18n (có - hiển thị labels)
5. ✅ Add React Query hook
6. ✅ Create file: `components/features/UserProfileCard.tsx`
7. ✅ Update: `components/features/index.ts`
8. ✅ Apply UI guidelines: card structure, spacing

**Output**:
```typescript
// components/features/UserProfileCard.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, Skeleton } from 'antd';
import { useTranslations } from 'next-intl';

export interface UserProfileCardProps {
  userId: string;
  className?: string;
}

export function UserProfileCard({
  userId,
  className
}: UserProfileCardProps) {
  const t = useTranslations('user.profile');

  const { data, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  if (isLoading) {
    return <Skeleton active />;
  }

  return (
    <Card
      className={className}
      title={t('title')}
    >
      {/* Content */}
    </Card>
  );
}
```

## Component Creation Workflow

### Step-by-Step Process

```
1. Analyze Request
   ├─ Extract component name
   ├─ Identify required props
   └─ Determine dependencies

2. Categorize Component
   ├─ Check for API calls → Feature
   ├─ Check for layout logic → Layout
   └─ Default → UI

3. Generate Props Interface
   ├─ Required props
   ├─ Optional props
   ├─ Callbacks
   └─ Style props

4. Select Template
   ├─ ui-component.tsx.template
   ├─ layout-component.tsx.template
   └─ feature-component.tsx.template

5. Apply Template
   ├─ Replace placeholders
   ├─ Add imports
   ├─ Generate JSX
   └─ Apply UI guidelines

6. Add i18n (if needed)
   ├─ Add 'use client' directive
   ├─ Import useTranslations
   └─ Replace static text

7. Create File
   └─ Write to appropriate directory

8. Update Barrel Export
   ├─ Add component export
   ├─ Add type export
   └─ Sort alphabetically

9. Verify
   ├─ TypeScript check
   ├─ Import check
   └─ UI guidelines compliance
```

## Best Practices

### DO ✅

- ✅ Always generate TypeScript props interface
- ✅ Use named exports (not default)
- ✅ Follow React 19 patterns (no forwardRef)
- ✅ Apply UI guidelines automatically
- ✅ Add 'use client' khi cần hooks/state
- ✅ Update barrel exports automatically
- ✅ Sort exports alphabetically
- ✅ Use token-first colors (bg-surface, text-primary)
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
- ❌ Add unnecessary dependencies
- ❌ Skip i18n cho user-facing text
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

## Error Handling Patterns

### UI Components

```typescript
// Simple prop validation
if (!variant) {
  variant = 'primary'; // default
}
```

### Feature Components

```typescript
// API error handling
const { data, isLoading, error } = useQuery({...});

if (error) {
  return <Alert type="error" message={t('error.load')} />;
}
```

## Testing Considerations

Components should be testable with:
- Props validation
- Render testing
- Event handling
- API mocking (feature components)

---

**Version**: 1.0.0
**Last Updated**: 2026-02-08
**Maintained by**: lethai
