---
name: ui-guidelines
description: Complete UI design system for Ant Design + TailwindCSS with Modern Minimalism style. Covers layout, spacing (8/4 system), typography, components, states, and accessibility. Use when creating/updating pages, components, or any UI elements.
license: MIT
metadata:
  author: lethai
  version: "2.0.0"
---

# UI Guidelines (Ant Design + TailwindCSS)

Modern Minimalism design system cho dự án startup frontend boilerplate.

## When to Apply

- Creating new UI pages or components
- Refactoring existing UI code
- Reviewing UI for consistency
- Implementing responsive layouts
- Choosing between Ant Design vs Tailwind

## Rule Categories by Priority

| Priority | Category | Impact | Prefix | Count |
|----------|----------|--------|--------|-------|
| 1 | Layout & Container | HIGH | `layout-` | 3 |
| 2 | Section & Block | HIGH | `section-` | 3 |
| 3 | Spacing System | MEDIUM | `spacing-` | 2 |
| 4 | Component Choice | MEDIUM | `components-` | 3 |
| 5 | Typography | MEDIUM | `typography-` | 1 |
| 6 | Colors & Tokens | MEDIUM | `colors-` | 1 |
| 7 | Radius System | MEDIUM | `radius-` | 1 |
| 8 | Icons & Visual | LOW | `icons-` | 1 |
| 9 | States | LOW | `states-` | 1 |
| 10 | Responsive | LOW | `responsive-` | 1 |

**Total: 17 rules**

## Quick Reference

### Layout & Container (HIGH)
- **layout-container** - Container & page wrapper standard (`container mx-auto px-8`)
- **layout-grid** - Grid and flex layout patterns (responsive grid)
- **layout-page-header** - Page header structure (H1 + description)

### Section & Block (HIGH)
- **section-card-structure** - Section card wrapper chuẩn (`bg-surface border rounded-3xl p-8`)
- **section-header** - Section header với title + actions
- **section-sub-block** - Sub-block trong section (`bg-background rounded-2xl`)

### Spacing System (MEDIUM)
- **spacing-level-system** - Level spacing (hệ 8: p-8, gap-8, mb-8)
- **spacing-micro-system** - Micro spacing (hệ 4: gap-4, space-y-4)

### Component Choice (MEDIUM)
- **components-antd-vs-tailwind** - Khi nào dùng AntD vs Tailwind
- **components-table** - Table rules (AntD Table với bordered)
- **components-form** - Form elements (AntD Form với validation)

### Typography (MEDIUM)
- **typography-hierarchy** - Heading và text hierarchy (3xl/2xl/xl)

### Colors & Tokens (MEDIUM)
- **colors-token-first** - Token-first approach (bg-surface, text-primary, etc.)

### Radius System (MEDIUM)
- **radius-system** - Border radius (3xl/2xl/xl)

### Icons & Visual (LOW)
- **icons-usage** - Icon size, container, badge/chip (lucide-react)

### States (LOW)
- **states-loading-empty-error** - Loading/Empty/Error patterns

### Responsive (LOW)
- **responsive-breakpoints** - 3-tier responsive system (mobile/md/lg)

## Core Principles

1. **Ant Design = System components**: Navigation, Form, Data display, Feedback, Table
2. **TailwindCSS = Layout + spacing + typography**: Khung trang, section/block, spacing, chữ
3. **Không dùng shadow**: chỉ dùng `bg-surface` + `border-border` để phân lớp
4. **Token-first**: màu nền/viền/chữ theo token CSS (`bg-background`, `text-foreground`, `bg-surface`, `border-border`, `text-primary`)
5. **Spacing system**: Hệ 8 cho layout lớn (page/section/block), hệ 4 cho chi tiết nhỏ (list items, micro spacing)
6. **Large radius**: `rounded-3xl` (section), `rounded-2xl` (sub-block), `rounded-xl` (smallest)

## How to Use

1. **For humans**: Use Quick Reference để tìm rule cần thiết
2. **For AI agents**: Đọc [AGENTS.md](./AGENTS.md) để có full context với code examples
3. **Priority**: Tập trung vào HIGH impact rules trước (Layout & Section)

## Checklist trước khi "xong UI page"

- ✅ Có dùng `container mx-auto px-8` cho page wrapper
- ✅ Mọi section chính là `bg-surface border border-border rounded-3xl p-8`
- ✅ Section header có cấu trúc title (optional icon + subtitle) + actions, spacing `gap-8` / `gap-4` đúng
- ✅ Spacing layout giữa block chỉ dùng hệ 8
- ✅ Heading chỉ dùng `3xl/2xl/xl` đúng weight
- ✅ Text nhỏ/secondary đúng `text-sm text-zinc-500` (dark: `dark:text-zinc-400` khi cần)
- ✅ Không có shadow
- ✅ Empty/Error dùng AntD "info" (Result/Empty/Alert)
- ✅ Loading dùng skeleton (match size)
- ✅ Responsive chỉ dùng default + `md:` + `lg:`

## Full Compiled Document

See [AGENTS.md](./AGENTS.md) for complete rules with detailed code examples.
