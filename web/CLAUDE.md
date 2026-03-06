# Frontend - Next.js 16 + React 19

## Commands

```bash
npm run dev             # Dev server on port 8000
npm run build           # Production build (TypeScript check)
npm test                # Run Jest tests
npm run test:watch      # Watch mode
npm run lint            # ESLint check
```

## Architecture

Next.js 16 App Router with React 19. Server state via React Query. Styling with Tailwind CSS v4.

```
app/                        # Pages and layouts (App Router)
├── components/             # Shared UI components
│   ├── blocks/             # 80+ content block components (see blocks/CLAUDE.md)
│   └── providers/          # QueryProvider, PostHogProvider
├── dashboard/              # Dashboard pages (courses, badges, orgs, plans)
├── lms/                    # LMS pages (course viewer, achievements)
├── project/[courseKey]/     # Course editor (see _components/CLAUDE.md)
│   └── _components/        # Editor-specific components
├── preview/[courseKey]/     # Course preview page
├── login/                  # Auth pages
├── p/[username]/           # Public portfolio
└── onboarding/             # User onboarding flow
lib/                        # Utilities and hooks
├── hooks/                  # React Query hooks (see lib/CLAUDE.md)
├── api-client.ts           # Fetch wrapper with auth
├── auth.ts                 # Token management (localStorage)
└── validators.ts           # Form validation utilities
```

## Key Patterns

### Page Pattern
```typescript
'use client';
import { useUser } from '@/lib/hooks/use-auth';

export default function MyPage() {
  const { user, isLoading } = useUser();  // Redirects to /login if unauthenticated

  if (isLoading) return <StarLoader texts={['Loading...']} />;
  return <div>...</div>;
}
```

### Data Fetching (React Query)
```typescript
// Query (GET)
const { data, isLoading, error } = useMyData(id);

// Mutation (POST/PATCH/DELETE)
const mutation = useCreateThing();
mutation.mutate({ name: 'value' }, {
  onSuccess: () => showToast('Created!', 'success'),
});
```

### Toast Notifications
```typescript
const { showToast } = useToast();
showToast('Success message', 'success');
showToast('Error occurred', 'error');
```

### Form Pattern
No form library — use React state + mutations:
```typescript
const [formData, setFormData] = useState({ name: '', email: '' });
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  mutation.mutate(formData);
};
```

## Authentication

- JWT stored in `localStorage` via `lib/auth.ts`
- `api-client.ts` auto-injects `Authorization: Bearer <token>`
- Protected routes: `/lms/*`, `/project/*` (inline script in root layout)
- `useUser()` hook validates auth and redirects to `/login` if invalid
- Logout clears localStorage + React Query cache

## Styling

### Tailwind CSS v4
- **Primary color:** `#9F80DA` (purple) — used as `bg-[#9F80DA]`, `text-[#9F80DA]`, `border-[#9F80DA]`
- **Primary dark:** `#8A6BC5` (hover states)
- CSS variables defined in `app/globals.css`: `--primary`, `--primary-dark`, `--primary-light`

### Common Patterns
```
/* Layout */        max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
/* Card */          bg-white rounded-xl border border-gray-200 shadow-sm
/* Button primary */bg-[#9F80DA] hover:bg-[#8A6BC5] text-white rounded-lg
/* Button ghost */  text-gray-500 hover:text-gray-700 hover:bg-gray-100
/* Status colors */ green-500 (success), red-500 (error), amber-500 (warning)
```

### Icons
`lucide-react` for all icons. Import individually:
```typescript
import { Plus, Trash2, Eye, Settings } from 'lucide-react';
```

## Testing

Jest + React Testing Library. Test files in `__tests__/`.

```typescript
import { render, screen } from '@testing-library/react';

it('renders heading', () => {
  render(<MyComponent />);
  expect(screen.getByRole('heading')).toBeInTheDocument();
});
```

## Shared Color Picker

Use `<ColorPicker>` from `app/components/ColorPicker.tsx` for ALL color selection UIs.
Supports: basic grid (8x5), HEX/RGB inputs, project colors, favorites (localStorage via `use-favorite-colors` hook).

```typescript
import { ColorPicker } from '@/app/components/ColorPicker';

<ColorPicker
  selectedColor={color}
  onSelect={(c) => setColor(c)}
  onClose={() => setOpen(false)}
  projectColors={['#9F80DA', '#1a1a1a']}  // optional
  position="top"  // or "bottom"
/>
```

## Environment Variables

Required: `NEXT_PUBLIC_API_URL` (e.g., `http://localhost:8001/api`)

## Naming Conventions

| What | Convention | Example |
|------|-----------|---------|
| Components | PascalCase.tsx | `NotificationBell.tsx` |
| Hooks | use-kebab.ts | `use-course.ts` |
| Utilities | kebab-case.ts | `api-client.ts` |
| Pages | page.tsx in folder | `app/dashboard/page.tsx` |
| Dynamic routes | [paramName] | `app/project/[courseKey]/` |
| Constants | UPPER_SNAKE_CASE | `API_URL` |
