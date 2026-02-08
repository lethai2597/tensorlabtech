# Typography Hierarchy

**Priority:** MEDIUM
**Impact:** Heading và text hierarchy nhất quán

## Heading (chỉ dùng tối đa 3 level)

**Level 1 - Page title:**
```tsx
<h1 className="text-3xl font-semibold">Page Title</h1>
```

**Level 2 - Section title:**
```tsx
<h2 className="text-2xl font-bold">Section Title</h2>
```

**Level 3 - Sub-section title:**
```tsx
<h3 className="text-xl font-bold">Sub-section Title</h3>
```

## Body Text

Mặc định (không cần set thêm nếu không cần):
```tsx
<p>Body text content</p>
```

**Text nhỏ/secondary (chuẩn):**

```tsx
<p className="text-sm text-zinc-500">Secondary text</p>
```

**Dark mode:**
```tsx
<p className="text-sm text-zinc-500 dark:text-zinc-400">
  Secondary text with dark mode support
</p>
```

## Notes

- **Không dùng** các size heading khác (`text-4xl`, `text-lg` làm heading, v.v.)
- 100% chữ ngoài AntD component dùng Tailwind
- Text nhỏ/secondary: `text-sm text-zinc-500` (dark: `dark:text-zinc-400` khi cần)
