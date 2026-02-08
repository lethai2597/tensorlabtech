# Colors & Tokens (Token-first Approach)

**Priority:** MEDIUM
**Impact:** Màu sắc nhất quán qua token system

## Rule

Màu nền/viền/chữ/primary/semantic phải bám theo token CSS của dự án.

## Background & Border Tokens

```tsx
// Background
className="bg-background"  // Page background
className="bg-surface"     // Section/card background

// Border
className="border-border"

// Text
className="text-foreground"
```

## Primary & Semantic Colors

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

## Màu Chính (Primary)

Luôn đảm bảo UI "nhìn thấy primary" ở các điểm nhấn:
- CTA chính
- Trạng thái active/selected
- Link quan trọng
- Icon nhấn trong tiêu đề/section

## Example

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

## Notes

- Không dùng shadow, chỉ dùng `bg-surface` + `border-border` để phân lớp
- Có thể kết hợp màu khác để "sinh động"/phân cấp thông tin, nhưng không lấn át primary
- Ưu tiên dùng trong data viz/tag phụ, không dùng làm màu chủ đạo
