# Page Header Structure

**Priority:** HIGH
**Impact:** Cấu trúc header nhất quán cho mọi page

## Rule

Page header (H1 + mô tả) dùng `space-y-4` giữa title và description.

## Correct

```tsx
<div className="space-y-4 mb-8">
  <h1 className="text-3xl font-semibold">Page Title</h1>
  <p className="text-sm text-zinc-500">Page description here</p>
</div>
```

## Notes

- Title: `text-3xl font-semibold` (heading lớn nhất)
- Description: `text-sm text-zinc-500` (secondary text)
- Spacing dưới header: `mb-8` trước content chính
- Không dùng heading size khác cho page title
