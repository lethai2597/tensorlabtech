# Form Elements (AntD)

**Priority:** MEDIUM
**Impact:** Form chuẩn với validation

## Rule

Tất cả form inputs dùng **AntD Form components**.

## Example

```tsx
<Form layout="vertical">
  <Form.Item
    label="Email"
    name="email"
    rules={[
      { required: true, message: 'Please input your email!' },
      { type: 'email', message: 'Please enter a valid email!' }
    ]}
  >
    <Input placeholder="Enter your email" />
  </Form.Item>

  <Form.Item label="Role" name="role">
    <Select placeholder="Select role">
      <Select.Option value="admin">Admin</Select.Option>
      <Select.Option value="user">User</Select.Option>
    </Select>
  </Form.Item>

  <Form.Item>
    <Button type="primary" htmlType="submit">
      Submit
    </Button>
  </Form.Item>
</Form>
```

## Notes

- Validation, label, help text theo AntD
- Không tự làm form validation bằng Tailwind
- Layout wrapper cho form dùng Tailwind (section card, spacing)
