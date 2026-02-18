# Micro Spacing (Hệ 4)

**Priority:** MEDIUM
**Impact:** Spacing cho chi tiết nhỏ bên trong components

## Rule

Áp dụng cho spacing nhỏ bên trong 1 card/sub-block:
- Label/value pairs
- Row spacing
- Item meta
- Nhóm button
- **Danh sách/list items**

## Classes Chuẩn

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

## Example: List Items trong Section

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

## Example: Page Header

```tsx
<div className="space-y-4 mb-8">
  {/* H1 + description - space-y-4 (micro) */}
  <h1 className="text-3xl font-semibold">Page Title</h1>
  <p className="text-sm text-zinc-500">Description</p>
</div>
```

## Notes

- Mục tiêu: page vẫn "gọn" ở chi tiết nhỏ
- Trong thành phần con (section/sub-block): list items chỉ dùng `gap-4` hoặc `space-y-4`
- Không dùng `gap-2/space-y-2/mb-2` trong layout (trừ khi AntD tự render)
- Page header (H1 + description): mặc định là micro spacing `space-y-4`
