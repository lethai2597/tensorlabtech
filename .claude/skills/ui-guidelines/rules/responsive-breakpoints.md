# Responsive Design (3-tier System)

**Priority:** LOW
**Impact:** Responsive breakpoints nhất quán

## Rule

Chỉ thiết kế theo 3 mức: **mobile / tablet / desktop**.

## Breakpoints

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

## Example: Dashboard Layout

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

## Notes

- **Mobile**: mặc định (không prefix)
- **Tablet**: dùng `md:*`
- **Desktop**: dùng `lg:*`
- Tránh dùng quá nhiều breakpoint lắt nhắt (`sm`, `xl`, `2xl`) nếu không thật sự cần
- Mobile-first approach
