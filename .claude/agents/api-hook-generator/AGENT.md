# API Hook Generator Agent

## Mô tả

Agent chuyên trách tự động generate React Query hooks từ OpenAPI schema types, đảm bảo type-safety và tuân thủ best practices của TanStack Query v5.

## Capabilities

- Đọc và parse OpenAPI types từ `lib/api/schema.d.ts`
- Generate CRUD hooks (useGetX, useCreateX, useUpdateX, useDeleteX)
- Tạo query keys structure có tổ chức
- Implement standardized error handling
- Ensure type-safety cho tất cả operations
- Follow React Query best practices

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

## React Query Hook Generation Logic

### useQuery Pattern

```typescript
// Template: useGet<Resource>
export function useGetUser(id: string, options?: UseQueryOptions<User>) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: async () => {
      const response = await apiClient.get<User>(`/api/users/${id}`);
      return response.data;
    },
    ...options,
  });
}

// With filters
export function useGetUsers(filters?: UserFilter, options?: UseQueryOptions<User[]>) {
  return useQuery({
    queryKey: userKeys.list(filters ?? {}),
    queryFn: async () => {
      const response = await apiClient.get<User[]>('/api/users', { params: filters });
      return response.data;
    },
    ...options,
  });
}
```

### useMutation Pattern

```typescript
// Template: useCreate<Resource>
export function useCreateUser(options?: UseMutationOptions<User, ApiError, CreateUserBody>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateUserBody) => {
      const response = await apiClient.post<User>('/api/users', data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
    ...options,
  });
}

// Template: useUpdate<Resource>
export function useUpdateUser(options?: UseMutationOptions<User, ApiError, { id: string; data: UpdateUserBody }>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await apiClient.put<User>(`/api/users/${id}`, data);
      return response.data;
    },
    onSuccess: (_, { id }) => {
      // Invalidate specific detail and lists
      queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
    ...options,
  });
}

// Template: useDelete<Resource>
export function useDeleteUser(options?: UseMutationOptions<void, ApiError, string>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/api/users/${id}`);
    },
    onSuccess: (_, id) => {
      // Remove from cache and invalidate lists
      queryClient.removeQueries({ queryKey: userKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
    ...options,
  });
}
```

## Best Practices

### 1. Optimistic Updates

```typescript
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserFn,
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: userKeys.detail(id) });

      // Snapshot previous value
      const previous = queryClient.getQueryData(userKeys.detail(id));

      // Optimistically update
      queryClient.setQueryData(userKeys.detail(id), (old: User) => ({
        ...old,
        ...data,
      }));

      return { previous };
    },
    onError: (err, { id }, context) => {
      // Rollback on error
      if (context?.previous) {
        queryClient.setQueryData(userKeys.detail(id), context.previous);
      }
    },
  });
}
```

### 2. Dependent Queries

```typescript
export function useUserWithPosts(userId: string) {
  const userQuery = useGetUser(userId);

  const postsQuery = useQuery({
    queryKey: ['posts', userId],
    queryFn: () => fetchUserPosts(userId),
    enabled: !!userQuery.data, // Only fetch when user is loaded
  });

  return {
    user: userQuery,
    posts: postsQuery,
  };
}
```

### 3. Pagination

```typescript
export function useGetUsersPaginated(page: number = 1, pageSize: number = 10) {
  return useQuery({
    queryKey: userKeys.list({ page, pageSize }),
    queryFn: async () => {
      const response = await apiClient.get<PaginatedResponse<User>>('/api/users', {
        params: { page, pageSize },
      });
      return response.data;
    },
    keepPreviousData: true, // Keep previous page while loading next
  });
}
```

### 4. Infinite Queries

```typescript
export function useGetUsersInfinite(filters?: UserFilter) {
  return useInfiniteQuery({
    queryKey: userKeys.list({ ...filters, infinite: true }),
    queryFn: async ({ pageParam = 1 }) => {
      const response = await apiClient.get<PaginatedResponse<User>>('/api/users', {
        params: { ...filters, page: pageParam },
      });
      return response.data;
    },
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    getPreviousPageParam: (firstPage) => firstPage.prevPage ?? undefined,
  });
}
```

### 5. Query Retry Strategy

```typescript
// Retry logic cho different error types
export function useGetUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: getUserFn,
    retry: (failureCount, error) => {
      // Don't retry on 404
      if (error.code === 'NOT_FOUND') return false;
      // Retry up to 3 times for server errors
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
```

## Usage Examples

### Basic CRUD Operations

```typescript
// components/UserProfile.tsx
function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading, error } = useGetUser(userId);
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleUpdate = async (newData: Partial<User>) => {
    await updateUser.mutateAsync({ id: userId, data: newData });
  };

  const handleDelete = async () => {
    await deleteUser.mutateAsync(userId);
  };

  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={() => handleUpdate({ name: 'New Name' })}>
        Update Name
      </button>
      <button onClick={handleDelete}>Delete User</button>
    </div>
  );
}
```

### List with Filters

```typescript
// components/UserList.tsx
function UserList() {
  const [filters, setFilters] = useState<UserFilter>({});
  const { data: users, isLoading } = useGetUsers(filters);
  const createUser = useCreateUser();

  const handleCreate = async (userData: CreateUserBody) => {
    const newUser = await createUser.mutateAsync(userData);
    console.log('Created:', newUser);
  };

  return (
    <div>
      <FilterBar onChange={setFilters} />
      {isLoading ? (
        <Skeleton />
      ) : (
        <UserGrid users={users} onCreate={handleCreate} />
      )}
    </div>
  );
}
```

### Advanced: Prefetching

```typescript
// Prefetch user data on hover
function UserCard({ userId }: { userId: string }) {
  const queryClient = useQueryClient();

  const handleMouseEnter = () => {
    queryClient.prefetchQuery({
      queryKey: userKeys.detail(userId),
      queryFn: () => fetchUser(userId),
    });
  };

  return (
    <Link
      to={`/users/${userId}`}
      onMouseEnter={handleMouseEnter}
    >
      View Profile
    </Link>
  );
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

## Generation Workflow

1. **Analyze OpenAPI Schema**: Parse `lib/api/schema.d.ts` để identify endpoints
2. **Extract Types**: Extract request/response types cho mỗi operation
3. **Generate Query Keys**: Tạo query keys factory cho resource
4. **Generate Hooks**: Tạo hooks từ templates với proper types
5. **Add Documentation**: JSDoc comments với usage examples
6. **Export**: Tạo index.ts để export all hooks

## Error Handling Requirements

Tất cả generated hooks phải:
- Type error responses as `ApiError`
- Include proper error handling trong `onError` callbacks
- Support custom error handlers via options
- Log errors trong development mode
- Provide helpful error messages

## Testing Considerations

Generated hooks nên include test setup:

```typescript
// users/__tests__/use-get-user.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGetUser } from '../use-get-user';

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useGetUser', () => {
  it('should fetch user data', async () => {
    const { result } = renderHook(() => useGetUser('123'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });
});
```

## Notes

- Always regenerate hooks khi OpenAPI schema thay đổi
- Use TypeScript strict mode để catch type errors early
- Follow naming conventions: `useGet*`, `useCreate*`, `useUpdate*`, `useDelete*`
- Document breaking changes trong hook comments
- Keep hooks focused - one operation per hook
