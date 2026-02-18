# Level Spacing (Hệ 8)

**Priority:** MEDIUM
**Impact:** Spacing nhất quán cho layout lớn

## Rule

Chỉ áp dụng cho tối đa 3 phân cấp:
- **Page → Section**
- **Section → Block**
- **Block → Sub-block**

## Classes Chuẩn

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

## Example

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

## Notes

- Mục tiêu: page "thoáng" ở layout lớn
- Không dùng các giá trị khác (6, 12, 16...) cho level spacing
- Chỉ dùng hệ 8 cho 3 phân cấp chính
