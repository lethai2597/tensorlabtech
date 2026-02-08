# Table Rules (AntD-only)

**Priority:** MEDIUM
**Impact:** Chuẩn hóa hiển thị bảng dữ liệu

## Rule

Tất cả bảng dữ liệu dùng **AntD Table**.

## Bọc Table (khi cần khung đồng bộ với section)

```tsx
<div className="rounded-2xl border border-border overflow-hidden bg-surface">
  <Table
    columns={columns}
    dataSource={data}
    bordered
    showHeader={true}
  />
  <div className="h-4" />
  {/* Khoảng đáy để viền không đè nhau */}
</div>
```

## Table Compact (không header)

```tsx
<Table
  columns={columns}
  dataSource={data}
  bordered
  showHeader={false}
/>
```

## Notes

- Luôn dùng `bordered` khi có khung rõ
- `showHeader={false}` khi thiết kế dạng compact / bảng trong section đã có title
- Layout xung quanh table (section wrapper, spacing, title/filter bar) dùng Tailwind theo rule trên
- Wrapper: `rounded-2xl border border-border overflow-hidden`
