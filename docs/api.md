# Làm việc với API (Generate schema & Hooks)

---

## Phần 1: Hướng dẫn dùng

### Generate schema từ backend

```bash
pnpm api:generate
```

- Tạo/cập nhật file `lib/api/schema.d.ts` từ OpenAPI (URL trong script `api:generate` tại `package.json`).
- Đổi backend: sửa URL trong script đó rồi chạy lại lệnh trên.

### Gọi API trong component — dùng hook có sẵn

Import từ `@/lib/api/hooks`:

```tsx
import { useMe, useTenants, useTenant, useLogin } from "@/lib/api/hooks";

// GET: data, isLoading, error, refetch
const { data, isLoading, error } = useMe();
const { data } = useTenants({ page: 1, perPage: 10 });
const { data } = useTenant(id);   // id null/undefined → không gọi

// POST: mutate, isPending
const { mutateAsync, isPending } = useLogin();
await mutateAsync({ username: "x", password: "y" });
```

Base URL lấy từ env `NEXT_PUBLIC_API_URL` (đặt trong `.env.local`).

### Thêm hook mới cho endpoint

1. **GET** — tạo file `lib/api/hooks/useXxx.ts`:

```ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";

export function useXxx(id: string | null | undefined) {
  return useQuery({
    queryKey: ["xxx", id],
    queryFn: async () => {
      if (!id) throw new Error("ID required");
      const res = await apiClient.GET("/api/v1/xxx/{id}", { params: { path: { id } } });
      if (res.error) throw res.error;
      return res.data;
    },
    enabled: !!id,
  });
}
```

2. **POST/PUT/DELETE** — dùng `useMutation`, trong `mutationFn` gọi `apiClient.POST(...)` (hoặc PUT/DELETE), trong `onSuccess` gọi `queryClient.invalidateQueries({ queryKey: ["..."] })` nếu cần refetch.

3. Export trong `lib/api/hooks/index.ts`:  
   `export { useXxx } from "./useXxx";`

Sau khi thêm endpoint vào OpenAPI của backend, chạy lại `pnpm api:generate` rồi viết hook — TypeScript sẽ gợi ý path/params/body theo schema.

---

## Phần 2: Behind the scenes

- **openapi-typescript**: Generate kiểu `paths` từ OpenAPI spec; `lib/api/client.ts` dùng `openapi-fetch` + `paths` để có GET/POST type-safe (path, query, body).
- **Client**: `createClient<paths>({ baseUrl })` → `apiClient.GET/POST(...)` trả về `{ data } | { error }`; luôn kiểm tra `res.error` và throw để TanStack Query xử lý.
- **Hooks**: Query key (ví dụ `["tenant", id]`) quyết định cache và refetch; `enabled: !!id` tránh gọi API khi thiếu tham số. Mutation `onSuccess` invalidate query liên quan để UI cập nhật ngay.
- **Env**: Chỉ `NEXT_PUBLIC_*` mới có ở client; `NEXT_PUBLIC_API_URL` dùng cho `apiClient` trong browser.
