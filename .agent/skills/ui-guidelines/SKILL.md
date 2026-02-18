---
name: ui-guidelines
description: Complete UI design system for Ant Design + TailwindCSS with Modern Minimalism style. Covers layout, spacing (8/4 system), typography, components, states, and accessibility. Use when creating/updating pages, components, or any UI elements.
---

# UI Guidelines (Ant Design + TailwindCSS)

**Version 2.1.0**
lethai
February 2026

> **Note:**
> This document is mainly for agents and LLMs to follow when creating,
> maintaining, or refactoring UI code. Humans may also find it useful,
> but guidance here is optimized for automation and consistency by
> AI-assisted workflows.

---

## Abstract

Modern Minimalism design system combining Ant Design components with TailwindCSS layout/spacing. Key principles: token-first colors, no shadows, 8/4 spacing system, large radius (3xl/2xl). This guide covers 22 rules across 11 categories, prioritized by impact from HIGH (layout & section structure) to LOW (responsive & states).

---

## Table of Contents

### CRITICAL & HIGH Impact Rules
1. [Layout & Container](#1-layout--container) — **HIGH**
   - 1.1 [Container & Page Wrapper Standard](#11-container--page-wrapper-standard)
   - 1.2 [Grid and Flex Layout Patterns](#12-grid-and-flex-layout-patterns)
   - 1.3 [Page Header Structure](#13-page-header-structure)

2. [Section & Block](#2-section--block) — **HIGH**
   - 2.1 [Section Card Structure](#21-section-card-structure)
   - 2.2 [Section Header with Title & Actions](#22-section-header-with-title--actions)
   - 2.3 [Sub-block trong Section](#23-sub-block-trong-section)

### MEDIUM Impact Rules
3. [Spacing System](#3-spacing-system) — **MEDIUM**
   - 3.1 [Level Spacing (Hệ 8)](#31-level-spacing-hệ-8)
   - 3.2 [Micro Spacing (Hệ 4)](#32-micro-spacing-hệ-4)

4. [Component Choice](#4-component-choice) — **MEDIUM**
   - 4.1 [Khi nào dùng AntD vs Tailwind](#41-khi-nào-dùng-antd-vs-tailwind)
   - 4.2 [Table Rules (AntD-only)](#42-table-rules-antd-only)
   - 4.3 [Form Elements (AntD)](#43-form-elements-antd)

5. [Typography](#5-typography) — **MEDIUM**
   - 5.1 [Typography Hierarchy](#51-typography-hierarchy)

6. [Colors & Tokens](#6-colors--tokens) — **MEDIUM**
   - 6.1 [Colors & Tokens (Token-first Approach)](#61-colors--tokens-token-first-approach)

7. [Radius System](#7-radius-system) — **MEDIUM**
   - 7.1 [Border Radius System (Large Radius)](#71-border-radius-system-large-radius)

### LOW Impact Rules
8. [Icons & Visual](#8-icons--visual) — **LOW**
   - 8.1 [Icons & Visual Elements](#81-icons--visual-elements)

9. [States](#9-states) — **LOW**
   - 9.1 [Loading, Empty, and Error States](#91-loading-empty-and-error-states)

10. [Responsive](#10-responsive) — **LOW**
    - 10.1 [Responsive Design (3-tier System)](#101-responsive-design-3-tier-system)

### LANDING PAGE Rules
11. [Landing Page Patterns](#11-landing-page-patterns) — **HIGH**
    - 11.1 [Landing Section Wrapper](#111-landing-section-wrapper)
    - 11.2 [Landing Section Header](#112-landing-section-header)
    - 11.3 [SpotlightCard](#113-spotlightcard)
    - 11.4 [Landing Card Content](#114-landing-card-content)
    - 11.5 [Landing Animation & A11y](#115-landing-animation--a11y)

---

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
| 11 | Landing Page Patterns | HIGH | `landing-` | 5 |

**Total: 22 rules**

Xem chi tiết từng rule trong folder `rules/`:
- `rules/layout-container.md`
- `rules/layout-grid.md`
- `rules/layout-page-header.md`
- `rules/section-card-structure.md`
- `rules/section-header.md`
- `rules/section-sub-block.md`
- `rules/spacing-level-system.md`
- `rules/spacing-micro-system.md`
- `rules/components-antd-vs-tailwind.md`
- `rules/components-table.md`
- `rules/components-form.md`
- `rules/typography-hierarchy.md`
- `rules/colors-token-first.md`
- `rules/radius-system.md`
- `rules/icons-usage.md`
- `rules/states-loading-empty-error.md`
- `rules/responsive-breakpoints.md`
- `rules/landing-section-wrapper.md`
- `rules/landing-section-header.md`
- `rules/landing-spotlight-card.md`
- `rules/landing-card-content.md`
- `rules/landing-animation-a11y.md`

---

## Core Principles

1. **Ant Design = System components**: Navigation, Form, Data display, Feedback, Table
2. **TailwindCSS = Layout + spacing + typography**: Khung trang, section/block, spacing, chữ
3. **Không dùng shadow**: chỉ dùng `bg-surface` + `border-border` để phân lớp
4. **Token-first**: màu nền/viền/chữ theo token CSS (`bg-background`, `text-foreground`, `bg-surface`, `border-border`, `text-primary`)
5. **Spacing system**: Hệ 8 cho layout lớn (page/section/block), hệ 4 cho chi tiết nhỏ (list items, micro spacing)
6. **Large radius**: `rounded-3xl` (section), `rounded-2xl` (sub-block), `rounded-xl` (smallest)
7. **Font**: `Be Vietnam Pro` (`--font-be-vietnam-pro`) — set trong `globals.css`, dùng làm `--font-sans` và `--font-mono`

---

## 1. Layout & Container

### 1.1 Container & Page Wrapper Standard

**Impact:** HIGH
**Impact Description:** Đảm bảo layout nhất quán trên toàn bộ pages

Luôn dùng `container mx-auto px-8` cho page wrapper.

**Incorrect:**
```tsx
<div className="max-w-7xl mx-auto px-4">
  {/* content */}
</div>
```

**Correct:**
```tsx
<div className="container mx-auto px-8">
  {/* content */}
</div>
```

**Page spacing:**

Page wrapper ưu tiên `py-8` hoặc `p-8` (tuỳ layout).

```tsx
<div className="container mx-auto px-8 py-8">
  {/* page content */}
</div>
```

**Notes:**
- Không dùng padding khác cho page (vì toàn bộ spacing theo hệ 8)
- Có thể kết hợp `space-y-8` cho các block con

---

### 1.2 Grid and Flex Layout Patterns

**Impact:** HIGH
**Impact Description:** Cấu trúc grid/flex nhất quán cho responsive layouts

**Layout 2 cột (dashboard):**

Dùng grid với breakpoint responsive.

```tsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div className="lg:col-span-2">
    {/* Main content */}
  </div>
  <div className="lg:col-span-1">
    {/* Sidebar */}
  </div>
</div>
```

**Notes:**
- Dùng `gap-8` cho spacing giữa columns (hệ 8)
- Responsive: mobile first, breakpoint `lg:` cho desktop
- Không dùng quá nhiều breakpoint lắt nhắt

---

### 1.3 Page Header Structure

**Impact:** HIGH
**Impact Description:** Cấu trúc header nhất quán cho mọi page

**Page header (H1 + mô tả):**

Dùng `space-y-4` giữa title và description.

```tsx
<div className="space-y-4 mb-8">
  <h1 className="text-3xl font-semibold">Page Title</h1>
  <p className="text-sm text-zinc-500">Page description here</p>
</div>
```

**Notes:**
- Title: `text-3xl font-semibold` (heading lớn nhất)
- Description: `text-sm text-zinc-500` (secondary text)
- Spacing dưới header: `mb-8` trước content chính
- Không dùng heading size khác cho page title

---

## 2. Section & Block

### 2.1 Section Card Structure

**Impact:** HIGH
**Impact Description:** Cấu trúc chuẩn cho mọi section trong page

Áp dụng cho mọi block nội dung chính trong page.

**Incorrect:**
```tsx
<div className="bg-white shadow-lg rounded-lg p-6">
  {/* content */}
</div>
```

**Correct:**
```tsx
<div className="bg-surface border border-border rounded-3xl p-8">
  {/* content */}
</div>
```

**Spacing giữa sections:**

```tsx
<div className="space-y-8">
  <section className="bg-surface border border-border rounded-3xl p-8">
    {/* Section 1 */}
  </section>
  <section className="bg-surface border border-border rounded-3xl p-8">
    {/* Section 2 */}
  </section>
</div>
```

**Notes:**
- Wrapper: `bg-surface border border-border rounded-3xl p-8`
- Không dùng shadow, chỉ dùng border
- Spacing giữa sections: `mb-8` hoặc `space-y-8` (hệ 8)
- Radius: `rounded-3xl` (lớn - bắt buộc)

---

### 2.2 Section Header with Title & Actions

**Impact:** HIGH
**Impact Description:** Header structure chuẩn cho mọi section card

Dùng flex layout với spacing chuẩn.

```tsx
<div className="flex items-start justify-between gap-8 mb-8">
  <div className="flex items-start gap-4">
    {/* Optional icon container */}
    <div className="size-12 rounded-2xl bg-border flex items-center justify-center text-primary">
      <Icon size={22} />
    </div>
    <div className="space-y-1">
      <h2 className="text-2xl font-bold">Section Title</h2>
      <p className="text-sm text-zinc-500">Optional subtitle</p>
    </div>
  </div>
  <div className="flex items-center gap-4">
    {/* Actions: Button, Dropdown, etc. */}
    <Button>Action</Button>
  </div>
</div>
```

**Notes:**
- Spacing: `gap-8` giữa title và actions, `gap-4` cho actions group
- Spacing dưới header: `mb-8` trước nội dung section
- Icon không bắt buộc, chỉ dùng khi giúp nhận diện nhanh section
- Actions dùng AntD components
- Override padding section khi cần (vd. `pb-0` cho Timeline sát đáy)

---

### 2.3 Sub-block trong Section

**Impact:** HIGH
**Impact Description:** Phân cấp rõ ràng giữa section và sub-block

Dùng `bg-background` để phân cấp với section (`bg-surface`).

**Incorrect:**
```tsx
<div className="bg-surface border border-border rounded-3xl p-8">
  {/* Section wrapper */}
  <div className="bg-white shadow p-6">
    {/* Sub-block - WRONG */}
  </div>
</div>
```

**Correct:**
```tsx
<div className="bg-surface border border-border rounded-3xl p-8">
  {/* Section wrapper */}
  <div className="rounded-2xl bg-background p-8">
    {/* Sub-block - CORRECT */}
  </div>
</div>
```

**Spacing giữa sub-blocks:**

```tsx
<div className="space-y-4">
  <div className="rounded-2xl bg-background p-8">Sub-block 1</div>
  <div className="rounded-2xl bg-background p-8">Sub-block 2</div>
</div>
```

**Notes:**
- Chuẩn: `rounded-2xl bg-background p-8`
- Không viền, không shadow
- Phân cấp bằng nền: section dùng `bg-surface`, sub-block dùng `bg-background`
- Khoảng cách giữa sub-blocks: `gap-4` hoặc `space-y-4` (hệ 4, không dùng 8)

---

## 3. Spacing System

### 3.1 Level Spacing (Hệ 8)

**Impact:** MEDIUM
**Impact Description:** Spacing nhất quán cho layout lớn

Chỉ áp dụng cho tối đa 3 phân cấp:
- **Page → Section**
- **Section → Block**
- **Block → Sub-block**

**Classes chuẩn:**

```tsx
// Padding
className="p-8"
className="px-8"
className="py-8"

// Margin
className="mb-8"
className="mt-8"

// Gap
className="gap-8"
className="space-y-8"
className="space-x-8"
```

**Example:**

```tsx
<div className="container mx-auto px-8 py-8">
  {/* Page wrapper - p-8/px-8/py-8 */}

  <div className="space-y-8">
    {/* Spacing giữa sections - space-y-8 */}

    <section className="bg-surface border border-border rounded-3xl p-8">
      {/* Section padding - p-8 */}

      <div className="mb-8">
        {/* Section header margin - mb-8 */}
      </div>
    </section>
  </div>
</div>
```

**Notes:**
- Mục tiêu: page "thoáng" ở layout lớn
- Không dùng các giá trị khác (6, 12, 16...) cho level spacing
- Chỉ dùng hệ 8 cho 3 phân cấp chính

---

### 3.2 Micro Spacing (Hệ 4)

**Impact:** MEDIUM
**Impact Description:** Spacing cho chi tiết nhỏ bên trong components

Áp dụng cho spacing nhỏ bên trong 1 card/sub-block:
- Label/value pairs
- Row spacing
- Item meta
- Nhóm button
- **Danh sách/list items**

**Classes chuẩn:**

```tsx
// Gap
className="gap-4"
className="space-y-4"
className="space-x-4"

// Margin
className="mb-4"
className="mt-4"
className="py-4"
```

**Example: List items trong section:**

```tsx
<div className="bg-surface border border-border rounded-3xl p-8">
  {/* Section wrapper */}

  <div className="space-y-4">
    {/* List items - space-y-4, NOT space-y-8 */}
    <div className="rounded-2xl bg-background p-4">Item 1</div>
    <div className="rounded-2xl bg-background p-4">Item 2</div>
    <div className="rounded-2xl bg-background p-4">Item 3</div>
  </div>
</div>
```

**Example: Page header:**

```tsx
<div className="space-y-4 mb-8">
  {/* H1 + description - space-y-4 (micro) */}
  <h1 className="text-3xl font-semibold">Page Title</h1>
  <p className="text-sm text-zinc-500">Description</p>
</div>
```

**Notes:**
- Mục tiêu: page vẫn "gọn" ở chi tiết nhỏ
- Trong thành phần con (section/sub-block): list items chỉ dùng `gap-4` hoặc `space-y-4`
- Không dùng `gap-2/space-y-2/mb-2` trong layout (trừ khi AntD tự render)
- Page header (H1 + description): mặc định là micro spacing `space-y-4`

---

## 4. Component Choice

### 4.1 Khi nào dùng AntD vs Tailwind

**Impact:** MEDIUM
**Impact Description:** Phân ranh giới rõ ràng giữa system components và layout

**Dùng Ant Design khi:**

**Navigation:**
- Button, Breadcrumb, Dropdown, Menu, Pagination, Steps, Tabs

**Form:**
- Input, Select, DatePicker, Checkbox, Radio, Switch, Upload
- Validation, label, help text theo AntD

**Data display:**
- Avatar, Badge, Card, List, Tag, Tooltip, Popover
- **Tag**: luôn dùng `bordered={false}`

**Feedback:**
- Alert, Modal, Drawer, Message, Notification, Popconfirm, Spin, Progress

**Table:**
- Tất cả bảng dữ liệu dùng **AntD Table**
- Luôn dùng bordered khi có khung rõ

**Empty / Error:**
- Dùng `Result` hoặc `Empty` hoặc `Alert` theo context

**Dùng Tailwind khi:**

**Layout trang:**
- Container, grid/flex, chia cột, khoảng cách giữa block

**Section / Block wrappers:**
- Card nền, viền, radius, padding

**Typography:**
- 100% chữ ngoài AntD component dùng Tailwind

**Loading skeleton:**
- Dùng Tailwind + CSS skeleton (ưu tiên cùng kích thước nội dung thật)

**Không làm:**

- ❌ Không "rebuild" lại system component bằng Tailwind (dropdown/menu/table)
- ❌ Không override sâu style nội bộ `.ant-*` bằng Tailwind trừ khi có guideline riêng

**Example:**

```tsx
// CORRECT
<div className="bg-surface border border-border rounded-3xl p-8">
  {/* Tailwind for section wrapper */}

  <div className="flex items-center justify-between mb-8">
    {/* Tailwind for layout */}

    <h2 className="text-2xl font-bold">Section Title</h2>
    {/* Tailwind for typography */}

    <Button type="primary">Action</Button>
    {/* AntD for system component */}
  </div>

  <Table columns={columns} dataSource={data} bordered />
  {/* AntD for table */}
</div>
```

---

### 4.2 Table Rules (AntD-only)

**Impact:** MEDIUM
**Impact Description:** Chuẩn hóa hiển thị bảng dữ liệu

Tất cả bảng dữ liệu dùng **AntD Table**.

**Bọc table (khi cần khung đồng bộ với section):**

```tsx
<div className="rounded-2xl border border-border overflow-hidden bg-surface">
  <Table
    columns={columns}
    dataSource={data}
    bordered
    showHeader={true}
  />
  <div className="h-4" />
  {/* Khoảng đáy để viền không đè nhau */}
</div>
```

**Table compact (không header):**

```tsx
<Table
  columns={columns}
  dataSource={data}
  bordered
  showHeader={false}
/>
```

**Notes:**
- Luôn dùng `bordered` khi có khung rõ
- `showHeader={false}` khi thiết kế dạng compact / bảng trong section đã có title
- Layout xung quanh table (section wrapper, spacing, title/filter bar) dùng Tailwind theo rule trên
- Wrapper: `rounded-2xl border border-border overflow-hidden`

---

### 4.3 Form Elements (AntD)

**Impact:** MEDIUM
**Impact Description:** Form chuẩn với validation

Tất cả form inputs dùng **AntD Form components**.

```tsx
<Form layout="vertical">
  <Form.Item
    label="Email"
    name="email"
    rules={[
      { required: true, message: 'Please input your email!' },
      { type: 'email', message: 'Please enter a valid email!' }
    ]}
  >
    <Input placeholder="Enter your email" />
  </Form.Item>

  <Form.Item label="Role" name="role">
    <Select placeholder="Select role">
      <Select.Option value="admin">Admin</Select.Option>
      <Select.Option value="user">User</Select.Option>
    </Select>
  </Form.Item>

  <Form.Item>
    <Button type="primary" htmlType="submit">
      Submit
    </Button>
  </Form.Item>
</Form>
```

**Notes:**
- Validation, label, help text theo AntD
- Không tự làm form validation bằng Tailwind
- Layout wrapper cho form dùng Tailwind (section card, spacing)

---

## 5. Typography

### 5.1 Typography Hierarchy

**Impact:** MEDIUM
**Impact Description:** Heading và text hierarchy nhất quán

**Heading (chỉ dùng tối đa 3 level):**

**Level 1 - Page title:**
```tsx
<h1 className="text-3xl font-semibold">Page Title</h1>
```

**Level 2 - Section title:**
```tsx
<h2 className="text-2xl font-bold">Section Title</h2>
```

**Level 3 - Sub-section title:**
```tsx
<h3 className="text-xl font-bold">Sub-section Title</h3>
```

**Body text:**

Mặc định (không cần set thêm nếu không cần):
```tsx
<p>Body text content</p>
```

**Text nhỏ/secondary (chuẩn):**

```tsx
<p className="text-sm text-zinc-500">Secondary text</p>
```

**Dark mode:**
```tsx
<p className="text-sm text-zinc-500 dark:text-zinc-400">
  Secondary text with dark mode support
</p>
```

**Notes:**
- **Không dùng** các size heading khác (`text-4xl`, `text-lg` làm heading, v.v.)
- 100% chữ ngoài AntD component dùng Tailwind
- Text nhỏ/secondary: `text-sm text-zinc-500` (dark: `dark:text-zinc-400` khi cần)

> **Landing page exception:** H2 trên landing dùng `text-3xl font-semibold` (không phải `text-2xl font-bold` của dashboard) vì cần headline lớn hơn. Xem thêm [11.2 Landing Section Header](#112-landing-section-header).

---

## 6. Colors & Tokens

### 6.1 Colors & Tokens (Token-first Approach)

**Impact:** MEDIUM
**Impact Description:** Màu sắc nhất quán qua token system

**Token-first:**

Màu nền/viền/chữ/primary/semantic phải bám theo token CSS của dự án.

**Background & Border tokens:**

```tsx
// Background
className="bg-background"  // Page background
className="bg-surface"     // Section/card background

// Border
className="border-border"

// Text
className="text-foreground"
```

**Primary & Semantic colors:**

```tsx
// Primary
className="text-primary"
className="bg-primary"

// Semantic (success/error/warning/info)
className="text-success"
className="text-error"
className="text-warning"
className="text-info"
```

**Màu chính (primary):**

Luôn đảm bảo UI "nhìn thấy primary" ở các điểm nhấn:
- CTA chính
- Trạng thái active/selected
- Link quan trọng
- Icon nhấn trong tiêu đề/section

**Example:**

```tsx
<div className="bg-surface border border-border rounded-3xl p-8">
  <div className="size-12 rounded-2xl bg-border flex items-center justify-center text-primary">
    <Icon size={22} />
  </div>

  <Button type="primary">Primary Action</Button>

  <Tag color="success" bordered={false}>Success</Tag>
  <Tag color="error" bordered={false}>Error</Tag>
</div>
```

**Notes:**
- Không dùng shadow, chỉ dùng `bg-surface` + `border-border` để phân lớp
- Có thể kết hợp màu khác để "sinh động"/phân cấp thông tin, nhưng không lấn át primary
- Ưu tiên dùng trong data viz/tag phụ, không dùng làm màu chủ đạo

**Gradient & color-mix (landing page):**

```tsx
// Gradient text (primary → info)
<span className="bg-linear-to-r from-(--color-primary) to-(--color-info) bg-clip-text text-transparent">
  Highlighted text
</span>

// Gradient button
style={{ backgroundImage: "linear-gradient(90deg, var(--color-primary) 0%, var(--color-info) 100%)" }}

// Radial glow background
style={{ backgroundImage: `radial-gradient(800px circle at 20% 10%, color-mix(in srgb, var(--color-primary) 22%, transparent) 0%, transparent 60%)` }}

// Opacity variants cho hiệu ứng depth
className="bg-primary/10"  // 10% opacity
className="bg-primary/7"   // dark mode, subtle
```

---

## 7. Radius System

### 7.1 Border Radius System (Large Radius)

**Impact:** MEDIUM
**Impact Description:** Radius nhất quán cho modern look

Modern Minimalism style với radius lớn.

**Chuẩn:**

**Section:**
```tsx
<div className="rounded-3xl">
  {/* Section card */}
</div>
```

**Sub-block:**
```tsx
<div className="rounded-2xl">
  {/* Sub-block trong section */}
</div>
```

**Smallest (nếu bắt buộc):**
```tsx
<div className="rounded-xl">
  {/* Smallest radius */}
</div>
```

**Example:**

```tsx
<div className="bg-surface border border-border rounded-3xl p-8">
  {/* Section: rounded-3xl */}

  <div className="rounded-2xl bg-background p-8">
    {/* Sub-block: rounded-2xl */}
  </div>
</div>
```

**Notes:**
- **Section**: `rounded-3xl` (chuẩn)
- **Sub-block**: `rounded-2xl`
- **Smallest**: `rounded-xl` (nếu bắt buộc)
- Không dùng radius nhỏ hơn (`rounded-lg`, `rounded-md`, `rounded-sm`)

---

## 8. Icons & Visual

### 8.1 Icons & Visual Elements

**Impact:** LOW
**Impact Description:** Icon size, container, badge/chip nhất quán

**Icons (lucide-react):**

Luôn dùng **lucide-react** (dự án không dùng `@ant-design/icons`).

**Kích thước:**

**Icon với AntD component:**
```tsx
<Button icon={<Icon />}>Button</Button>
// Dùng size mặc định
```

**Icon đứng độc lập:**
```tsx
<Sun className="size-4" />
// Icon có size mặc định className="size-4" (16px)
```

**Icon container (section header, metric):**
```tsx
<div className="size-12 rounded-2xl bg-border flex items-center justify-center text-primary">
  <Icon size={22} />
  {/* hoặc className="text-[22px]" */}
</div>
```

**Icon container variants:**

```tsx
// Primary
<div className="size-12 rounded-2xl bg-border flex items-center justify-center text-primary font-semibold">
  <Icon size={22} />
</div>

// Info
<div className="size-12 rounded-2xl bg-border flex items-center justify-center text-info font-semibold">
  <Icon size={22} />
</div>

// Success
<div className="size-12 rounded-2xl bg-border flex items-center justify-center text-success font-semibold">
  <Icon size={22} />
</div>

// Warning
<div className="size-12 rounded-2xl bg-border flex items-center justify-center text-warning font-semibold">
  <Icon size={22} />
</div>
```

**Badge/chip/tag:**

```tsx
// Status với AntD Tag
<Tag color="success" bordered={false}>Active</Tag>
<Tag color="error" bordered={false}>Error</Tag>
<Tag color="warning" bordered={false}>Warning</Tag>
<Tag color="info" bordered={false}>Info</Tag>

// Luôn dùng bordered={false}
```

**A11y:**

```tsx
// Icon trang trí
<Icon aria-hidden="true" />

// Icon button
<Button icon={<Icon />} aria-label="Close">
</Button>
```

**Notes:**
- Icon không bắt buộc ở header section
- Chỉ dùng khi giúp nhận diện nhanh section
- Tránh icon "trôi" trên nền - luôn dùng icon container khi icon đứng riêng
- Dùng icon + badge/chip/tag để tăng phân cấp thông tin

---

## 9. States

### 9.1 Loading, Empty, and Error States

**Impact:** LOW
**Impact Description:** Xử lý states nhất quán

**Loading:**

Dùng **Tailwind skeleton** (CSS skeleton), không dùng AntD Spin cho toàn page.

**Skeleton nên match kích thước content thật:**

```tsx
// Card skeleton
<div className="bg-surface border border-border rounded-3xl p-8">
  <div className="space-y-4">
    <div className="h-6 w-48 animate-pulse bg-border/60 rounded-2xl" />
    <div className="h-4 w-full animate-pulse bg-border/60 rounded-2xl" />
    <div className="h-4 w-3/4 animate-pulse bg-border/60 rounded-2xl" />
  </div>
</div>

// Text skeleton (nhiều dòng với width khác nhau)
<div className="space-y-2">
  <div className="h-4 w-full animate-pulse bg-border/60 rounded" />
  <div className="h-4 w-5/6 animate-pulse bg-border/60 rounded" />
  <div className="h-4 w-4/6 animate-pulse bg-border/60 rounded" />
</div>
```

**AntD Spin chỉ khi chờ ngắn/inline:**
```tsx
<Spin spinning={loading}>
  <div>Content</div>
</Spin>
```

**Empty state:**

Dùng **AntD "info"** - ưu tiên `Result` hoặc `Empty`.

```tsx
// Result cho empty state
<Result
  status="info"
  title="No data available"
  subTitle="Start by creating your first item"
  extra={<Button type="primary">Create Item</Button>}
/>

// Empty cho tối giản
<Empty
  description="No data"
  image={Empty.PRESENTED_IMAGE_SIMPLE}
/>
```

**Error state:**

Dùng `Result status="error"` hoặc `Alert type="error"`.

```tsx
// Error toàn trang
<Result
  status="error"
  title="Something went wrong"
  subTitle="Please try again later"
  extra={[
    <Button type="primary" key="retry">Try Again</Button>,
    <Button key="home">Go Home</Button>
  ]}
/>

// Error inline
<Alert
  type="error"
  message="Error loading data"
  description="Please check your connection and try again"
  showIcon
  closable
/>
```

**Notes:**
- Skeleton: `animate-pulse bg-border/60 rounded-2xl`
- Empty/Error: luôn có CTA "Thử lại/Quay lại"
- Loading skeleton match size content thật

---

## 10. Responsive

### 10.1 Responsive Design (3-tier System)

**Impact:** LOW
**Impact Description:** Responsive breakpoints nhất quán

Chỉ thiết kế theo 3 mức: **mobile / tablet / desktop**.

**Breakpoints:**

**Mobile (default):**
```tsx
<div className="grid grid-cols-1">
  {/* Mobile layout */}
</div>
```

**Tablet:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2">
  {/* Tablet: 2 columns */}
</div>
```

**Desktop:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Desktop: 3 columns */}
</div>
```

**Example: Dashboard layout:**

```tsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div className="lg:col-span-2">
    {/* Main content - 2/3 width on desktop */}
  </div>
  <div className="lg:col-span-1">
    {/* Sidebar - 1/3 width on desktop */}
  </div>
</div>
```

**Notes:**
- **Mobile**: mặc định (không prefix)
- **Tablet**: dùng `md:*`
- **Desktop**: dùng `lg:*`
- Tránh dùng quá nhiều breakpoint lắt nhắt (`sm`, `xl`, `2xl`) nếu không thật sự cần
- Mobile-first approach

---

## 11. Landing Page Patterns

> Các rules dưới đây áp dụng cho **landing/marketing pages**. Dashboard pages vẫn dùng rules 1–10.

---

### 11.1 Landing Section Wrapper

**Impact:** HIGH
**Impact Description:** Cấu trúc chuẩn cho mọi landing section

Mỗi landing section là một `motion.section` full-width với ambient glow background.

**Chuẩn:**

```tsx
import { motion, useReducedMotion } from "framer-motion";
import { SectionBackdrop } from "@/components/landing/TensorLabLandingPage/SectionBackdrop";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";

export function ExampleSection() {
  const shouldReduceMotion = useReducedMotion();
  const { fadeUp, stagger } = useSectionVariants(Boolean(shouldReduceMotion));

  return (
    <motion.section
      id="section-id"
      initial="hidden"
      whileInView="visible"
      viewport={landingViewport}
      variants={stagger}
      className="relative overflow-hidden bg-background py-20 md:py-28"
    >
      <SectionBackdrop variant="primary" />

      <div className="container mx-auto px-8 relative z-10">
        {/* Section content */}
      </div>
    </motion.section>
  );
}
```

**SectionBackdrop variants:**
- `primary` — Warm primary glow (CTA, capabilities)
- `cool` — Cool blue glow (engagement, testimonials)
- `neutral` — Subtle neutral (delivery process, FAQ)

**Notes:**
- Padding: `py-20 md:py-28` (KHÔNG dùng `py-8` như dashboard)
- Luôn `relative overflow-hidden` + `z-10` cho content
- Luôn wrap content trong `container mx-auto px-8`
- Sections đặc biệt (Hero, LogoCloud, Footer) có padding/bg riêng — không áp dụng rule này

---

### 11.2 Landing Section Header

**Impact:** HIGH
**Impact Description:** Header nhất quán cho mọi landing content section

Pattern: **Tag pill → H2 → Description**, căn giữa.

**Chuẩn:**

```tsx
import { Tag } from "antd";
import ShinyText from "@/components/ShinyText";

<motion.div
  variants={fadeUp}
  className="max-w-2xl mx-auto text-center flex flex-col items-center gap-4 mb-16"
>
  <Tag
    bordered={false}
    color="geekblue"
    className="rounded-full! px-3! py-0.5!"
  >
    <ShinyText
      text={t("tag")}
      disabled={Boolean(shouldReduceMotion)}
      speed={2}
      color="var(--color-primary)"
      shineColor="rgba(255, 255, 255, 0.7)"
    />
  </Tag>
  <h2 className="text-3xl font-semibold text-foreground">
    {t("title")}
  </h2>
  <p className="text-zinc-500 dark:text-zinc-400">{t("desc")}</p>
</motion.div>
```

**Notes:**
- Tag color: **luôn `"geekblue"`** — không dùng `"blue"` hay color khác
- ShinyText: luôn disable khi `shouldReduceMotion` = true
- H2: `text-3xl font-semibold` (khác dashboard `text-2xl font-bold`)
- Spacing dưới header: `mb-16` (KHÔNG dùng `mb-8`)
- Container `max-w-2xl` giới hạn độ rộng text

---

### 11.3 SpotlightCard

**Impact:** HIGH
**Impact Description:** Interactive card component cho landing page

Dùng `SpotlightCard` thay cho static `bg-surface border border-border rounded-3xl p-8`.

```tsx
import SpotlightCard from "@/components/SpotlightCard";

<SpotlightCard
  className="h-full flex flex-col justify-between"
  spotlightColor="rgba(37, 99, 235, 0.35)"  {/* Optional, default = blue */}
>
  <div className="space-y-5">
    {/* Card content */}
  </div>
  <div className="pt-6">
    {/* CTA button */}
  </div>
</SpotlightCard>
```

**Notes:**
- SpotlightCard tự bọc `rounded-3xl border border-border bg-surface p-8`
- Không thêm border/bg/padding bên ngoài, chỉ truyền via `className` nếu cần
- Prop `spotlightColor` tùy biến radial-gradient color khi hover
- Focus-visible: tự xử lý `ring-2 ring-primary/30`
- Grid cards: bọc mỗi `SpotlightCard` trong `motion.div variants={fadeUp}`

---

### 11.4 Landing Card Content

**Impact:** MEDIUM
**Impact Description:** Nội dung card nhất quán trên landing

**Card title (H3):**
```tsx
<h3 className="text-xl font-bold text-foreground">
  Card Title
</h3>
```

**Card description:**
```tsx
<p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
  Card description text.
</p>
```

**Tags trong card:**
```tsx
<div className="flex flex-wrap">
  <Tag bordered={false} color="blue" className="rounded-full! px-3!">
    Tag Label
  </Tag>
</div>
```

**CTA button trong card:**
```tsx
import { ChevronRight } from "lucide-react";

<Button
  size="large"
  href="#contact"
  className="rounded-xl! h-11! font-semibold!"
  block
>
  CTA Text <ChevronRight className="size-4" />
</Button>
```

**Notes:**
- Card title: `text-xl font-bold` (KHÔNG dùng `text-lg font-semibold`)
- Card content spacing: dùng `space-y-5` (systematic, không dùng individual margins)
- Button height: `h-11!` cho card CTA, `h-12!` cho hero CTA
- Button radius: `rounded-xl!`

---

### 11.5 Landing Animation & A11y

**Impact:** MEDIUM
**Impact Description:** Animation patterns và accessibility cho landing

**Animation setup:**

```tsx
import { motion, useReducedMotion } from "framer-motion";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";

const shouldReduceMotion = useReducedMotion();
const { fadeUp, fadeIn, stagger } = useSectionVariants(Boolean(shouldReduceMotion));
```

**Variants:**
- `stagger` — Container variant, dùng cho `motion.section`
- `fadeUp` — Fade in + slide up (y: 24 → 0), dùng cho content items
- `fadeIn` — Fade in only, dùng cho subtle elements

**Usage pattern:**
```tsx
<motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={landingViewport}>
  <motion.div variants={fadeUp}>
    {/* Header */}
  </motion.div>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {items.map((item) => (
      <motion.div key={item.key} variants={fadeUp}>
        <SpotlightCard>{/* ... */}</SpotlightCard>
      </motion.div>
    ))}
  </div>
</motion.section>
```

**Accessibility:**
```tsx
// Decorative elements
<div aria-hidden="true" className="..." />

// Decorative icons
<Icon size={22} aria-hidden="true" />

// Reduce motion
const shouldReduceMotion = useReducedMotion();
// Pass to useSectionVariants — tự disable tất cả animations
// Pass to ShinyText disabled prop
```

**Notes:**
- `useReducedMotion()` — BẮT BUỘC kiểm tra trong mọi section
- `landingViewport` — `{ once: true, amount: 0.2, margin: "0px 0px -120px 0px" }`, trigger animation 1 lần
- Không tự define animation variants, luôn dùng `useSectionVariants`
- Decorative elements: SectionBackdrop, gradient divs, blur divs → luôn `aria-hidden="true"`

---

## Checklist trước khi "xong UI page"

### Dashboard / App pages
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

### Landing / Marketing pages
- ✅ Section wrapper: `motion.section` + `SectionBackdrop` + `py-20 md:py-28`
- ✅ Section header: Tag `geekblue` + ShinyText → H2 `text-3xl font-semibold` → desc, `mb-16`
- ✅ Cards dùng `SpotlightCard` (có spotlight hover effect)
- ✅ Card title: `text-xl font-bold` (không `text-lg font-semibold`)
- ✅ `useReducedMotion()` + `useSectionVariants()` trong mọi section
- ✅ Decorative elements có `aria-hidden="true"`
- ✅ Grid cards: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
- ✅ Button: `rounded-xl! h-11!` (card) hoặc `h-12!` (hero)
