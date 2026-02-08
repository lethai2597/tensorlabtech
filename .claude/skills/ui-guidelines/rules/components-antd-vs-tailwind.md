# Khi nào dùng AntD vs Tailwind

**Priority:** MEDIUM
**Impact:** Phân ranh giới rõ ràng giữa system components và layout

## Dùng Ant Design Khi

**Navigation:**
- Button, Breadcrumb, Dropdown, Menu, Pagination, Steps, Tabs

**Form:**
- Input, Select, DatePicker, Checkbox, Radio, Switch, Upload
- Validation, label, help text theo AntD

**Data display:**
- Avatar, Badge, Card, List, Tag, Tooltip, Popover
- **Tag**: luôn dùng `bordered={false}`

**Feedback:**
- Alert, Modal, Drawer, Message, Notification, Popconfirm, Spin, Progress

**Table:**
- Tất cả bảng dữ liệu dùng **AntD Table**
- Luôn dùng bordered khi có khung rõ

**Empty / Error:**
- Dùng `Result` hoặc `Empty` hoặc `Alert` theo context

## Dùng Tailwind Khi

**Layout trang:**
- Container, grid/flex, chia cột, khoảng cách giữa block

**Section / Block wrappers:**
- Card nền, viền, radius, padding

**Typography:**
- 100% chữ ngoài AntD component dùng Tailwind

**Loading skeleton:**
- Dùng Tailwind + CSS skeleton (ưu tiên cùng kích thước nội dung thật)

## Không Làm

- ❌ Không "rebuild" lại system component bằng Tailwind (dropdown/menu/table)
- ❌ Không override sâu style nội bộ `.ant-*` bằng Tailwind trừ khi có guideline riêng

## Example

```tsx
// CORRECT
<div className="bg-surface border border-border rounded-3xl p-8">
  {/* Tailwind for section wrapper */}

  <div className="flex items-center justify-between mb-8">
    {/* Tailwind for layout */}

    <h2 className="text-2xl font-bold">Section Title</h2>
    {/* Tailwind for typography */}

    <Button type="primary">Action</Button>
    {/* AntD for system component */}
  </div>

  <Table columns={columns} dataSource={data} bordered />
  {/* AntD for table */}
</div>
```
