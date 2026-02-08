# Icons & Visual Elements

**Priority:** LOW
**Impact:** Icon size, container, badge/chip nhất quán

## Icons (lucide-react)

Luôn dùng **lucide-react** (dự án không dùng `@ant-design/icons`).

## Kích Thước

**Icon với AntD component:**
```tsx
<Button icon={<Icon />}>Button</Button>
// Dùng size mặc định
```

**Icon đứng độc lập:**
```tsx
<Sun className="size-4" />
// Icon có size mặc định className="size-4" (16px)
```

**Icon container (section header, metric):**
```tsx
<div className="size-12 rounded-2xl bg-border flex items-center justify-center text-primary">
  <Icon size={22} />
  {/* hoặc className="text-[22px]" */}
</div>
```

## Icon Container Variants

```tsx
// Primary
<div className="size-12 rounded-2xl bg-border flex items-center justify-center text-primary font-semibold">
  <Icon size={22} />
</div>

// Info
<div className="size-12 rounded-2xl bg-border flex items-center justify-center text-info font-semibold">
  <Icon size={22} />
</div>

// Success
<div className="size-12 rounded-2xl bg-border flex items-center justify-center text-success font-semibold">
  <Icon size={22} />
</div>

// Warning
<div className="size-12 rounded-2xl bg-border flex items-center justify-center text-warning font-semibold">
  <Icon size={22} />
</div>
```

## Badge/Chip/Tag

```tsx
// Status với AntD Tag
<Tag color="success" bordered={false}>Active</Tag>
<Tag color="error" bordered={false}>Error</Tag>
<Tag color="warning" bordered={false}>Warning</Tag>
<Tag color="info" bordered={false}>Info</Tag>

// Luôn dùng bordered={false}
```

## A11y

```tsx
// Icon trang trí
<Icon aria-hidden="true" />

// Icon button
<Button icon={<Icon />} aria-label="Close">
</Button>
```

## Notes

- Icon không bắt buộc ở header section
- Chỉ dùng khi giúp nhận diện nhanh section
- Tránh icon "trôi" trên nền - luôn dùng icon container khi icon đứng riêng
- Dùng icon + badge/chip/tag để tăng phân cấp thông tin
