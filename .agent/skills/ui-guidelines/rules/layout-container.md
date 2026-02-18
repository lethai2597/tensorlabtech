# Container & Page Wrapper Standard

**Priority:** HIGH
**Impact:** Đảm bảo layout nhất quán trên toàn bộ pages

## Rule

Luôn dùng `container mx-auto px-8` cho page wrapper.

## Incorrect

```tsx
<div className="max-w-7xl mx-auto px-4">
  {/* content */}
</div>
```

## Correct

```tsx
<div className="container mx-auto px-8">
  {/* content */}
</div>
```

## Page Spacing

Page wrapper ưu tiên `py-8` hoặc `p-8` (tuỳ layout).

```tsx
<div className="container mx-auto px-8 py-8">
  {/* page content */}
</div>
```

## Notes

- Không dùng padding khác cho page (vì toàn bộ spacing theo hệ 8)
- Có thể kết hợp `space-y-8` cho các block con
