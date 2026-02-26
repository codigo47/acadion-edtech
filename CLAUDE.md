# CLAUDE.md - Project Context

This is **acadion.ai**, a full-stack AI-powered educational content creation platform.

## Project Structure

```
source/
├── web/          # Next.js 16 + React 19 frontend
├── back/         # NestJS 11 backend
└── .claude/      # Claude Code settings
```

## Quick Commands

```bash
# Frontend (web/)
cd web && npm run dev      # Start dev server on port 8000
cd web && npm run build    # Build for production
cd web && npm test         # Run Jest tests

# Backend (back/)
cd back && npm run start:dev   # Start dev server (port 8001)
cd back && npm run build       # Build for production
cd back && npm test            # Run Jest tests
cd back && npx prisma generate # Generate Prisma client
cd back && npx prisma migrate dev # Run migrations
```

## Architecture Overview

### Frontend (web/)

- **Framework:** Next.js 16 with App Router
- **State:** React Query (@tanstack/react-query) for server state
- **Styling:** Tailwind CSS v4
- **Auth:** JWT tokens in localStorage

**Key Directories:**
- `app/` - Pages and layouts (App Router)
- `app/components/` - Reusable UI components
- `app/project/[courseKey]/` - Course editor pages
- `lib/` - Utilities, hooks, API client
- `lib/hooks/` - React Query hooks (use-auth, use-course, use-course-sse)

**API Client:** `lib/api-client.ts` - Centralized fetch wrapper with auth token injection

### Backend (back/)

- **Framework:** NestJS 11
- **Database:** PostgreSQL with Prisma ORM
- **Queue:** BullMQ with Redis
- **AI:** LangChain + OpenAI
- **Auth:** Passport.js (JWT + Google OAuth)

**Key Directories:**
- `src/auth/` - Authentication (guards, strategies, DTOs)
- `src/course/` - Core course generation logic
- `src/course/orchestrator/` - AI generation pipeline with handlers
- `src/users/` - User management
- `src/prisma/` - Database service
- `src/queue/` - Job queue management

**API Prefix:** `/api/v1`

## Key Patterns

### Task-Based API

The course API uses a dispatcher pattern - single endpoint handles multiple task types:
```typescript
POST /api/v1/course/tasks
Body: { taskName: TaskName, ...taskData }
```

Task types defined in `src/course/enums/task-name.enum.ts`

### Course Generation Pipeline

1. User submits course metadata via task API
2. Backend enqueues orchestration job (BullMQ)
3. Job processor runs handlers sequentially:
   - `index.handler.ts` - Generate structure
   - `objectives.handler.ts` - Learning objectives
   - `intro-unit.handler.ts` - Introduction content
   - `content-unit.handler.ts` - Main content
   - `module-evaluation.handler.ts` - Module tests
   - `course-evaluation.handler.ts` - Final evaluation
4. Each handler uses LangChain with structured output (Zod schemas)
5. SSE broadcasts real-time progress to frontend

### Authentication Flow

1. Register/Login via `/auth/register` or `/auth/login`
2. Backend issues JWT token
3. Frontend stores token in localStorage
4. `api-client.ts` injects token in Authorization header
5. Protected routes use `@UseGuards(JwtAuthGuard)`

## Database Schema

Key models in `back/prisma/schema.prisma`:
- **User** - Authentication & profile
- **Course** - Course with status (draft/generating/completed/failed)
- **CourseStep** - Generation step tracking
- **CourseComponent** - Content blocks
- **Conversation** - Chat history
- **Message** - Chat messages

## Naming Conventions

- **Files:** kebab-case (`user-auth.guard.ts`)
- **Classes/Interfaces:** PascalCase
- **Methods/Variables:** camelCase
- **Constants:** UPPER_SNAKE_CASE
- **Enums:** PascalCase with UPPER_SNAKE_CASE values

## Environment Variables

Backend requires: `DATABASE_URL`, `REDIS_HOST`, `REDIS_PORT`, `JWT_SECRET`, `OPENAI_API_KEY`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `FRONTEND_URL`

Frontend requires: `NEXT_PUBLIC_API_URL`

## Testing

- Jest for both frontend and backend
- Test files: `*.spec.ts` (backend), `*.test.tsx` (frontend)
- Frontend uses @testing-library/react

## Common Tasks

**Adding a new API endpoint:**
1. Create/update DTO in `src/[module]/dto/`
2. Add service method in `src/[module]/[module].service.ts`
3. Add controller route in `src/[module]/[module].controller.ts`

**Adding a new course generation step:**
1. Create handler in `src/course/orchestrator/handlers/`
2. Extend `BaseHandler` class
3. Register in orchestrator processor

**Adding a new React Query hook:**
1. Create in `web/lib/hooks/`
2. Use `useMutation` or `useQuery` from @tanstack/react-query
3. Use `apiClient` from `lib/api-client.ts`

## Important Notes

- CORS is configured for frontend URL in `back/src/main.ts`
- Global validation pipe enabled - all DTOs validated automatically
- Password hashing uses bcryptjs with salt rounds
- SSE used for real-time updates (not WebSockets)

## Testing with Playwright
1. Login with this credentials:
   email: claude@gmail.com
   password: password123