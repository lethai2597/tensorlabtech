---
description: Generate React Query hooks (useQuery/useMutation) từ OpenAPI schema types với type-safety và TanStack Query v5 best practices
---

# API Hook Generator Workflow

Agent chuyên trách tự động generate React Query hooks từ OpenAPI schema types, đảm bảo type-safety và tuân thủ best practices của TanStack Query v5.

## ⚠️ RECOMMENDED: Reference React Best Practices

**BEFORE generating hooks, you SHOULD reference (optional but recommended):**

1. **Vercel React Best Practices Skill:**
   ```
   Optional read: /.agent/skills/vercel-react-best-practices/SKILL.md
   ```

2. **Relevant patterns for API hooks:**
   - `async-parallel.md` - Parallel data fetching patterns
   - `async-suspense-boundaries.md` - Suspense integration
   - `rerender-dependencies.md` - Query dependency management
   - `client-swr-dedup.md` - Request deduplication strategies

3. **Generate hooks following TanStack Query v5 best practices** - Templates are already optimized, but check skill for advanced patterns.

**Note:** API Hook Generator focuses on React Query patterns. UI guidelines are not applicable here since hooks don't render UI. However, error handling and performance should follow vercel-react-best-practices when applicable.

## Capabilities

- Đọc và parse OpenAPI types từ `lib/api/schema.d.ts`
- Generate CRUD hooks (useGetX, useCreateX, useUpdateX, useDeleteX)
- Tạo query keys structure có tổ chức
- Implement standardized error handling
- Ensure type-safety cho tất cả operations
- Follow React Query best practices

## Workflow Steps

```
1. Analyze OpenAPI Schema
   └─ Parse `lib/api/schema.d.ts` để identify endpoints

2. Extract Types
   └─ Extract request/response types cho mỗi operation

3. Generate Query Keys
   └─ Tạo query keys factory cho resource

4. Generate Hooks
   └─ Tạo hooks từ templates với proper types

5. Add Documentation
   └─ JSDoc comments với usage examples

6. Export
   └─ Tạo index.ts để export all hooks
```

## API Integration Patterns

### Query Keys Structure

Query keys phải follow hierarchy pattern để dễ invalidation:

```typescript
// Base pattern
const queryKeys = {
  all: ['resource'] as const,
  lists: () => [...queryKeys.all, 'list'] as const,
  list: (filters: Filter) => [...queryKeys.lists(), filters] as const,
  details: () => [...queryKeys.all, 'detail'] as const,
  detail: (id: string) => [...queryKeys.details(), id] as const,
}

// Example
const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: UserFilter) => [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
}
```

### Type-Safety Guidelines

1. **Strict Type Inference**: Luôn sử dụng generics để infer types từ OpenAPI schema
2. **No Any**: Tránh `any` type, dùng `unknown` nếu cần
3. **Discriminated Unions**: Sử dụng discriminated unions cho error handling
4. **Type Guards**: Implement type guards khi cần narrow types
5. **Const Assertions**: Dùng `as const` cho query keys để preserve literal types

### Error Handling Patterns

```typescript
// Standardized error response
interface ApiError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}

// Error handling trong hooks
const { data, error, isError } = useQuery({
  queryKey: userKeys.detail(id),
  queryFn: async () => {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      const error: ApiError = await response.json();
      throw error;
    }
    return response.json();
  },
});

// Type-safe error access
if (isError) {
  console.error(error.message); // error is typed as ApiError
}
```

## OpenAPI Schema Parsing Instructions

### Reading Schema Types

1. Import types từ `lib/api/schema.d.ts`:
```typescript
import type { paths, components } from '@/lib/api/schema';
```

2. Extract operation types:
```typescript
// GET operation
type GetUserResponse = paths['/api/users/{id}']['get']['responses'][200]['content']['application/json'];

// POST operation
type CreateUserBody = paths['/api/users']['post']['requestBody']['content']['application/json'];
type CreateUserResponse = paths['/api/users']['post']['responses'][201]['content']['application/json'];

// Component schemas
type User = components['schemas']['User'];
```

### Type Extraction Helpers

```typescript
// Generic type helper để extract response types
type GetResponse<T extends keyof paths, M extends keyof paths[T]> =
  paths[T][M] extends { responses: { 200: { content: { 'application/json': infer R } } } }
    ? R
    : never;

// Generic type helper để extract request body types
type PostBody<T extends keyof paths> =
  paths[T]['post'] extends { requestBody: { content: { 'application/json': infer B } } }
    ? B
    : never;
```

## Templates

### useQuery Template

```typescript
/**
 * Template: useGet{{ResourceName}}
 *
 * Auto-generated React Query hook for fetching {{resourceName}} data.
 *
 * @example
 * ```tsx
 * function {{ResourceName}}Detail({ id }: { id: string }) {
 *   const { data, isLoading, error } = useGet{{ResourceName}}(id);
 *
 *   if (isLoading) return <Skeleton />;
 *   if (error) return <ErrorMessage error={error} />;
 *
 *   return <div>{data.name}</div>;
 * }
 * ```
 */

import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import type { ApiError } from '@/lib/api/types';
import type { paths } from '@/lib/api/schema';

// Extract types from OpenAPI schema
type {{ResourceName}}Response = paths['{{apiPath}}']['get']['responses'][200]['content']['application/json'];

// Query keys factory
export const {{resourceName}}Keys = {
  all: ['{{resourceName}}'] as const,
  lists: () => [...{{resourceName}}Keys.all, 'list'] as const,
  list: (filters: {{ResourceName}}Filters) => [...{{resourceName}}Keys.lists(), filters] as const,
  details: () => [...{{resourceName}}Keys.all, 'detail'] as const,
  detail: (id: string) => [...{{resourceName}}Keys.details(), id] as const,
};

/**
 * Fetch a single {{resourceName}} by ID
 */
export function useGet{{ResourceName}}(
  id: string,
  options?: Omit<
    UseQueryOptions<{{ResourceName}}Response, ApiError>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery<{{ResourceName}}Response, ApiError>({
    queryKey: {{resourceName}}Keys.detail(id),
    queryFn: async () => {
      const response = await apiClient.get<{{ResourceName}}Response>(
        `{{apiPath}}/${id}`
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: (failureCount, error) => {
      if (error.code === 'NOT_FOUND') return false;
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options,
  });
}

/**
 * Fetch a list of {{resourceName}}s with optional filters
 */
export function useGet{{ResourceName}}s(
  filters?: {{ResourceName}}Filters,
  options?: Omit<
    UseQueryOptions<{{ResourceName}}Response[], ApiError>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery<{{ResourceName}}Response[], ApiError>({
    queryKey: {{resourceName}}Keys.list(filters ?? {}),
    queryFn: async () => {
      const response = await apiClient.get<{{ResourceName}}Response[]>(
        '{{apiPath}}',
        { params: filters }
      );
      return response.data;
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    ...options,
  });
}

/**
 * Fetch paginated {{resourceName}}s
 */
export function useGet{{ResourceName}}sPaginated(
  page: number = 1,
  pageSize: number = 10,
  filters?: {{ResourceName}}Filters,
  options?: Omit<
    UseQueryOptions<PaginatedResponse<{{ResourceName}}Response>, ApiError>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery<PaginatedResponse<{{ResourceName}}Response>, ApiError>({
    queryKey: {{resourceName}}Keys.list({ ...filters, page, pageSize }),
    queryFn: async () => {
      const response = await apiClient.get<PaginatedResponse<{{ResourceName}}Response>>(
        '{{apiPath}}',
        { params: { ...filters, page, pageSize } }
      );
      return response.data;
    },
    placeholderData: (previousData) => previousData,
    staleTime: 2 * 60 * 1000,
    ...options,
  });
}

// Type definitions
export interface {{ResourceName}}Filters {
  search?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
  [key: string]: unknown;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  nextPage?: number;
  prevPage?: number;
}
```

### useMutation Template

```typescript
/**
 * Template: useCreate/Update/Delete{{ResourceName}}
 *
 * Auto-generated React Query mutation hooks for {{resourceName}} operations.
 */

import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import type { ApiError } from '@/lib/api/types';
import type { paths } from '@/lib/api/schema';
import { {{resourceName}}Keys } from './use-get-{{resourceName}}';

// Extract types from OpenAPI schema
type Create{{ResourceName}}Body = paths['{{apiPath}}']['post']['requestBody']['content']['application/json'];
type Create{{ResourceName}}Response = paths['{{apiPath}}']['post']['responses'][201]['content']['application/json'];
type Update{{ResourceName}}Body = paths['{{apiPath}}/{id}']['put']['requestBody']['content']['application/json'];
type Update{{ResourceName}}Response = paths['{{apiPath}}/{id}']['put']['responses'][200]['content']['application/json'];

/**
 * Create a new {{resourceName}}
 */
export function useCreate{{ResourceName}}(
  options?: Omit<
    UseMutationOptions<Create{{ResourceName}}Response, ApiError, Create{{ResourceName}}Body>,
    'mutationFn'
  >
) {
  const queryClient = useQueryClient();

  return useMutation<Create{{ResourceName}}Response, ApiError, Create{{ResourceName}}Body>({
    mutationFn: async (data) => {
      const response = await apiClient.post<Create{{ResourceName}}Response>(
        '{{apiPath}}',
        data
      );
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: {{resourceName}}Keys.lists() });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}

/**
 * Update an existing {{resourceName}}
 */
export function useUpdate{{ResourceName}}(
  options?: Omit<
    UseMutationOptions<
      Update{{ResourceName}}Response,
      ApiError,
      { id: string; data: Update{{ResourceName}}Body }
    >,
    'mutationFn'
  >
) {
  const queryClient = useQueryClient();

  return useMutation<
    Update{{ResourceName}}Response,
    ApiError,
    { id: string; data: Update{{ResourceName}}Body }
  >({
    mutationFn: async ({ id, data }) => {
      const response = await apiClient.put<Update{{ResourceName}}Response>(
        `{{apiPath}}/${id}`,
        data
      );
      return response.data;
    },
    onSuccess: (data, { id }, context) => {
      queryClient.invalidateQueries({ queryKey: {{resourceName}}Keys.detail(id) });
      queryClient.invalidateQueries({ queryKey: {{resourceName}}Keys.lists() });
      options?.onSuccess?.(data, { id, data: data as Update{{ResourceName}}Body }, context);
    },
    ...options,
  });
}

/**
 * Update {{resourceName}} with optimistic updates
 */
export function useUpdate{{ResourceName}}Optimistic(
  options?: Omit<
    UseMutationOptions<
      Update{{ResourceName}}Response,
      ApiError,
      { id: string; data: Partial<Update{{ResourceName}}Body> },
      { previous?: Update{{ResourceName}}Response }
    >,
    'mutationFn' | 'onMutate' | 'onError' | 'onSettled'
  >
) {
  const queryClient = useQueryClient();

  return useMutation<
    Update{{ResourceName}}Response,
    ApiError,
    { id: string; data: Partial<Update{{ResourceName}}Body> },
    { previous?: Update{{ResourceName}}Response }
  >({
    mutationFn: async ({ id, data }) => {
      const response = await apiClient.put<Update{{ResourceName}}Response>(
        `{{apiPath}}/${id}`,
        data
      );
      return response.data;
    },
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: {{resourceName}}Keys.detail(id) });
      const previous = queryClient.getQueryData<Update{{ResourceName}}Response>(
        {{resourceName}}Keys.detail(id)
      );
      if (previous) {
        queryClient.setQueryData<Update{{ResourceName}}Response>(
          {{resourceName}}Keys.detail(id),
          { ...previous, ...data }
        );
      }
      return { previous };
    },
    onError: (err, { id }, context) => {
      if (context?.previous) {
        queryClient.setQueryData({{resourceName}}Keys.detail(id), context.previous);
      }
    },
    onSettled: (data, error, { id }) => {
      queryClient.invalidateQueries({ queryKey: {{resourceName}}Keys.detail(id) });
      queryClient.invalidateQueries({ queryKey: {{resourceName}}Keys.lists() });
    },
    ...options,
  });
}

/**
 * Delete a {{resourceName}}
 */
export function useDelete{{ResourceName}}(
  options?: Omit<UseMutationOptions<void, ApiError, string>, 'mutationFn'>
) {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: async (id) => {
      await apiClient.delete(`{{apiPath}}/${id}`);
    },
    onSuccess: (data, id, context) => {
      queryClient.removeQueries({ queryKey: {{resourceName}}Keys.detail(id) });
      queryClient.invalidateQueries({ queryKey: {{resourceName}}Keys.lists() });
      options?.onSuccess?.(data, id, context);
    },
    ...options,
  });
}

/**
 * Batch delete multiple {{resourceName}}s
 */
export function useBatchDelete{{ResourceName}}s(
  options?: Omit<UseMutationOptions<void, ApiError, string[]>, 'mutationFn'>
) {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string[]>({
    mutationFn: async (ids) => {
      await Promise.all(
        ids.map((id) => apiClient.delete(`{{apiPath}}/${id}`))
      );
    },
    onSuccess: (data, ids, context) => {
      ids.forEach((id) => {
        queryClient.removeQueries({ queryKey: {{resourceName}}Keys.detail(id) });
      });
      queryClient.invalidateQueries({ queryKey: {{resourceName}}Keys.lists() });
      options?.onSuccess?.(data, ids, context);
    },
    ...options,
  });
}

/**
 * Prefetch {{resourceName}} data
 */
export function usePrefetch{{ResourceName}}() {
  const queryClient = useQueryClient();

  return (id: string) => {
    queryClient.prefetchQuery({
      queryKey: {{resourceName}}Keys.detail(id),
      queryFn: async () => {
        const response = await apiClient.get<Update{{ResourceName}}Response>(
          `{{apiPath}}/${id}`
        );
        return response.data;
      },
      staleTime: 5 * 60 * 1000,
    });
  };
}

/**
 * Invalidate all {{resourceName}} queries
 */
export function useInvalidate{{ResourceName}}s() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: {{resourceName}}Keys.all });
  };
}
```

## File Structure

Tổ chức hooks theo resource:

```
lib/
  hooks/
    api/
      users/
        keys.ts           # Query keys definitions
        use-get-user.ts   # GET single
        use-get-users.ts  # GET list
        use-create-user.ts
        use-update-user.ts
        use-delete-user.ts
        index.ts          # Export all
      posts/
        keys.ts
        ...
```

## Best Practices

### 1. Optimistic Updates
- Sử dụng `useUpdate{{ResourceName}}Optimistic` template khi cần instant UI feedback
- Cancel outgoing refetches trước khi optimistic update
- Snapshot previous value để rollback on error

### 2. Dependent Queries
- Dùng `enabled: !!dependency` để chain queries
- Tránh waterfall bằng parallel queries khi có thể

### 3. Pagination
- Dùng `placeholderData: (previousData) => previousData` để giữ data cũ khi load trang mới
- Kết hợp với AntD Table pagination

### 4. Infinite Queries
- Dùng `useInfiniteQuery` cho infinite scroll
- `getNextPageParam` và `getPreviousPageParam` phải match API response

### 5. Query Retry Strategy
- Không retry cho 404 (NOT_FOUND)
- Retry tối đa 3 lần cho server errors
- Exponential backoff: `Math.min(1000 * 2 ** attemptIndex, 30000)`

## Error Handling Requirements

Tất cả generated hooks phải:
- Type error responses as `ApiError`
- Include proper error handling trong `onError` callbacks
- Support custom error handlers via options
- Log errors trong development mode
- Provide helpful error messages

## Notes

- Always regenerate hooks khi OpenAPI schema thay đổi
- Use TypeScript strict mode để catch type errors early
- Follow naming conventions: `useGet*`, `useCreate*`, `useUpdate*`, `useDelete*`
- Document breaking changes trong hook comments
- Keep hooks focused - one operation per hook
