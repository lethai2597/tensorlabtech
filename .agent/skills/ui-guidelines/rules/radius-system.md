# Border Radius System (Large Radius)

**Priority:** MEDIUM
**Impact:** Radius nhất quán cho modern look

## Rule

Modern Minimalism style với radius lớn.

## Chuẩn

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

## Example

```tsx
<div className="bg-surface border border-border rounded-3xl p-8">
  {/* Section: rounded-3xl */}

  <div className="rounded-2xl bg-background p-8">
    {/* Sub-block: rounded-2xl */}
  </div>
</div>
```

## Notes

- **Section**: `rounded-3xl` (chuẩn)
- **Sub-block**: `rounded-2xl`
- **Smallest**: `rounded-xl` (nếu bắt buộc)
- Không dùng radius nhỏ hơn (`rounded-lg`, `rounded-md`, `rounded-sm`)
