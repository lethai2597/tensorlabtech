# Section Card Structure

**Priority:** HIGH
**Impact:** Cấu trúc chuẩn cho mọi section trong page

## Rule

Áp dụng cho mọi block nội dung chính trong page.

## Incorrect

```tsx
<div className="bg-white shadow-lg rounded-lg p-6">
  {/* content */}
</div>
```

## Correct

```tsx
<div className="bg-surface border border-border rounded-3xl p-8">
  {/* content */}
</div>
```

## Spacing Giữa Sections

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

## Notes

- Wrapper: `bg-surface border border-border rounded-3xl p-8`
- Không dùng shadow, chỉ dùng border
- Spacing giữa sections: `mb-8` hoặc `space-y-8` (hệ 8)
- Radius: `rounded-3xl` (lớn - bắt buộc)
