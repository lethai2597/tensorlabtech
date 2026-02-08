# Grid and Flex Layout Patterns

**Priority:** HIGH
**Impact:** Cấu trúc grid/flex nhất quán cho responsive layouts

## Rule

Dùng grid với breakpoint responsive cho layout 2 cột (dashboard).

## Layout 2 Cột

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

## Notes

- Dùng `gap-8` cho spacing giữa columns (hệ 8)
- Responsive: mobile first, breakpoint `lg:` cho desktop
- Không dùng quá nhiều breakpoint lắt nhắt
