# Lib — Hooks, API Client & Utilities

## API Client (`api-client.ts`)

Centralized fetch wrapper with automatic JWT injection:

```typescript
import { api } from '@/lib/api-client';

// GET
const data = await api.get<MyType>('/endpoint');

// POST
const result = await api.post<MyType>('/endpoint', { body: 'data' });

// PATCH
await api.patch<{ success: boolean }>('/endpoint', { field: 'value' });

// DELETE
await api.delete('/endpoint');
```

- Auto-injects `Authorization: Bearer <token>` from localStorage
- Throws `ApiError` with `status`, `message`, `data` on non-ok responses
- Returns `{}` for 204 No Content
- Base URL from `NEXT_PUBLIC_API_URL` env var

### PaginatedResponse
```typescript
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
```

## Auth (`auth.ts`)

```typescript
saveAuth(response)    // Save token + user to localStorage
getToken()            // Get JWT token (null if not set)
getUser()             // Get cached user object
clearAuth()           // Remove token + user
isAuthenticated()     // Check if token exists
```

## Hooks Pattern

All hooks in `lib/hooks/` follow React Query v5 patterns:

### Query Hook (GET)
```typescript
export function useMyData(id: string | null) {
  return useQuery({
    queryKey: ['my-data', id],
    queryFn: () => api.get<MyType>(`/endpoint/${id}`),
    enabled: !!id,  // Don't fetch if id is null
  });
}
```

### Mutation Hook (POST/PATCH/DELETE)
```typescript
export function useCreateThing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateDto) => api.post<Thing>('/endpoint', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['things'] });
    },
  });
}
```

### Optimistic Update Pattern
```typescript
export function useUpdateThing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => api.patch(`/endpoint/${id}`, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ['things'] });
      const previous = queryClient.getQueryData(['things']);
      queryClient.setQueryData(['things'], (old) => /* optimistic update */);
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['things'], context.previous);
      }
    },
  });
}
```

## Available Hooks

### `use-auth.ts`
- `useLogin()` — POST /auth/login, saves auth, redirects to /dashboard
- `useRegister()` — POST /auth/register, saves auth, redirects
- `useLogout()` — Clears auth + cache, redirects to /login
- `useProfile()` — GET /auth/profile
- `useUser()` — Profile + auth guard (redirects to /login if unauthenticated)
- `useUpdateProfile()` — PATCH /auth/profile

### `use-course.ts`
- `useCourses()` — GET /course (user's courses)
- `useCourse(key)` — GET /course/:key
- `useCourseComponents(key)` — GET /course/:key/components
- `useCreateCourse()` through `useGenerateCourse()` — Task dispatcher mutations

### `use-course-editor.ts`
- `useUpdateComponentData(courseKey)` — PATCH /course/components/:id/data (optimistic)
- `useDeleteComponent(courseKey)` — DELETE /course/components/:id
- `useDuplicateComponent(courseKey)` — POST /course/components/:id/duplicate
- `useReorderComponents(courseKey)` — PATCH /course/:key/reorder
- `useSwitchComponentStyle(courseKey)` — PATCH /course/components/:id/switch-style

### `use-course-sse.ts`
- `useCourseSSE(courseKey)` — SSE connection for real-time generation progress
- Returns: `{ isConnected, loadingText, phase, progress, units, proposedIndex, isComplete, error }`
- Auto-reconnects on disconnect (3s delay)

### `use-lms.ts`
- `useLmsDashboard()` — Student dashboard data
- `useLmsCourseContent(key)` — Course content for student view
- `useLmsSelfEnroll(key)` — Self-enrollment
- `useLmsUpdateProgress(key)` — Mark unit progress
- `useLmsCompleteCourse(key)` — Course completion

### `use-learning-plans.ts`
- Full CRUD for learning plans
- Assignment to users and groups
- Course ordering within plans

### `use-badges.ts`
- CRUD + award/duplicate badges
- Org-scoped badge management

### `use-organizations.ts`
- CRUD organizations
- Member management (invite, role update, remove)

### `use-notifications.ts`
- `useNotifications()`, `useUnreadCount()`
- `useMarkAsRead()`, `useMarkAllAsRead()`

## React Query Config

```typescript
new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,       // 1 minute
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})
```

## Validators (`validators.ts`)

```typescript
validateEmail(email): { isValid: boolean; error?: string }
validateRequired(value, fieldName): { isValid: boolean; error?: string }
validateName(name, fieldName): { isValid: boolean; error?: string }
validateArrayNotEmpty(values, fieldName): { isValid: boolean; error?: string }
```

## Adding a New Hook

1. Create `use-my-feature.ts` in this directory
2. Import `api` from `@/lib/api-client`
3. Use `useQuery` for GET, `useMutation` for POST/PATCH/DELETE
4. Invalidate related queries on mutation success
5. Use optimistic updates for frequently-updated data (editor components)
6. Set `enabled: !!param` to prevent fetching with null params
