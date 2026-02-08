# Section Header with Title & Actions

**Priority:** HIGH
**Impact:** Header structure chuẩn cho mọi section card

## Rule

Dùng flex layout với spacing chuẩn.

## Correct

```tsx
<div className="flex items-start justify-between gap-8 mb-8">
  <div className="flex items-start gap-4">
    {/* Optional icon container */}
    <div className="size-12 rounded-2xl bg-border flex items-center justify-center text-primary">
      <Icon size={22} />
    </div>
    <div className="space-y-1">
      <h2 className="text-2xl font-bold">Section Title</h2>
      <p className="text-sm text-zinc-500">Optional subtitle</p>
    </div>
  </div>
  <div className="flex items-center gap-4">
    {/* Actions: Button, Dropdown, etc. */}
    <Button>Action</Button>
  </div>
</div>
```

## Notes

- Spacing: `gap-8` giữa title và actions, `gap-4` cho actions group
- Spacing dưới header: `mb-8` trước nội dung section
- Icon không bắt buộc, chỉ dùng khi giúp nhận diện nhanh section
- Actions dùng AntD components
- Override padding section khi cần (vd. `pb-0` cho Timeline sát đáy)
