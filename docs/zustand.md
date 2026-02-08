# Làm việc với Zustand

---

## Phần 1: Hướng dẫn dùng

### Dùng store app config (theme)

```tsx
"use client";

import { useAppConfigStore } from "@/stores/useAppConfigStore";

const theme = useAppConfigStore((s) => s.theme);
const setTheme = useAppConfigStore((s) => s.setTheme);

// Đổi theme
setTheme("dark");
setTheme("light");
```

Luôn dùng selector `(s) => s.theme` / `(s) => s.setTheme` thay vì lấy cả store để tránh re-render thừa.

### Khi cần biết “đã load xong từ localStorage chưa”

```ts
import { useHasAppConfigHydrated } from "@/stores/useAppConfigStore";

const hasHydrated = useHasAppConfigHydrated();
// hasHydrated === true → có thể tin giá trị từ useAppConfigStore
```

Dùng khi render phụ thuộc theme ngay từ lần đầu (ví dụ tránh nháy giao diện).

### Thêm store mới

- **Không cần lưu qua reload**: tạo file trong `stores/`, dùng `create()`:

```ts
import { create } from "zustand";

export const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
}));
```

- **Cần lưu qua reload** (như theme): bọc bằng `persist(..., { name: "storage-key" })`. Key nên đặt trong `lib/constants.ts`. Nếu cần biết “đã hydrate chưa”, tham khảo pattern `useAppConfigHydrationStore` + `onRehydrateStorage` trong `useAppConfigStore.ts`.

---

## Phần 2: Behind the scenes

- **useAppConfigStore**: State `theme` + action `setTheme`, persist vào localStorage với key `APP_CONFIG_STORAGE_KEY`. ThemeProvider subscribe store, gắn class `.dark` lên `<html>` và ghi cookie để server đọc (tránh FOUC).
- **Hydration**: Zustand persist load bất đồng bộ; trước khi load xong, giá trị từ store có thể chưa đúng. Store riêng `useAppConfigHydrationStore` + `onRehydrateStorage` set `hasHydrated: true` sau khi rehydrate, dùng cho `useHasAppConfigHydrated()`.
- **Quy ước**: Một file một store (hoặc một domain), export hook `useXxxStore`. Không dùng Zustand để cache dữ liệu API — dùng TanStack Query (xem [docs/api.md](./api.md)). Theme flow chi tiết: [docs/theme.md](./theme.md).
