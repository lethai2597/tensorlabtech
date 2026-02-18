# Loading, Empty, and Error States

**Priority:** LOW
**Impact:** Xử lý states nhất quán

## Loading

Dùng **Tailwind skeleton** (CSS skeleton), không dùng AntD Spin cho toàn page.

**Skeleton nên match kích thước content thật:**

```tsx
// Card skeleton
<div className="bg-surface border border-border rounded-3xl p-8">
  <div className="space-y-4">
    <div className="h-6 w-48 animate-pulse bg-border/60 rounded-2xl" />
    <div className="h-4 w-full animate-pulse bg-border/60 rounded-2xl" />
    <div className="h-4 w-3/4 animate-pulse bg-border/60 rounded-2xl" />
  </div>
</div>

// Text skeleton (nhiều dòng với width khác nhau)
<div className="space-y-2">
  <div className="h-4 w-full animate-pulse bg-border/60 rounded" />
  <div className="h-4 w-5/6 animate-pulse bg-border/60 rounded" />
  <div className="h-4 w-4/6 animate-pulse bg-border/60 rounded" />
</div>
```

**AntD Spin chỉ khi chờ ngắn/inline:**
```tsx
<Spin spinning={loading}>
  <div>Content</div>
</Spin>
```

## Empty State

Dùng **AntD "info"** - ưu tiên `Result` hoặc `Empty`.

```tsx
// Result cho empty state
<Result
  status="info"
  title="No data available"
  subTitle="Start by creating your first item"
  extra={<Button type="primary">Create Item</Button>}
/>

// Empty cho tối giản
<Empty
  description="No data"
  image={Empty.PRESENTED_IMAGE_SIMPLE}
/>
```

## Error State

Dùng `Result status="error"` hoặc `Alert type="error"`.

```tsx
// Error toàn trang
<Result
  status="error"
  title="Something went wrong"
  subTitle="Please try again later"
  extra={[
    <Button type="primary" key="retry">Try Again</Button>,
    <Button key="home">Go Home</Button>
  ]}
/>

// Error inline
<Alert
  type="error"
  message="Error loading data"
  description="Please check your connection and try again"
  showIcon
  closable
/>
```

## Notes

- Skeleton: `animate-pulse bg-border/60 rounded-2xl`
- Empty/Error: luôn có CTA "Thử lại/Quay lại"
- Loading skeleton match size content thật
