# Sub-block trong Section

**Priority:** HIGH
**Impact:** Phân cấp rõ ràng giữa section và sub-block

## Rule

Dùng `bg-background` để phân cấp với section (`bg-surface`).

## Incorrect

```tsx
<div className="bg-surface border border-border rounded-3xl p-8">
  {/* Section wrapper */}
  <div className="bg-white shadow p-6">
    {/* Sub-block - WRONG */}
  </div>
</div>
```

## Correct

```tsx
<div className="bg-surface border border-border rounded-3xl p-8">
  {/* Section wrapper */}
  <div className="rounded-2xl bg-background p-8">
    {/* Sub-block - CORRECT */}
  </div>
</div>
```

## Spacing Giữa Sub-blocks

```tsx
<div className="space-y-4">
  <div className="rounded-2xl bg-background p-8">Sub-block 1</div>
  <div className="rounded-2xl bg-background p-8">Sub-block 2</div>
</div>
```

## Notes

- Chuẩn: `rounded-2xl bg-background p-8`
- Không viền, không shadow
- Phân cấp bằng nền: section dùng `bg-surface`, sub-block dùng `bg-background`
- Khoảng cách giữa sub-blocks: `gap-4` hoặc `space-y-4` (hệ 4, không dùng 8)
