# CLAUDE.md - Project Context

This is **acadion.ai**, a full-stack AI-powered educational content creation platform.

## Project Structure

```
source/
├── apps/web/     # Next.js 16 + React 19 frontend
├── apps/api/     # NestJS 11 backend
└── .claude/      # Claude Code settings
```

## Quick Commands

```bash
# Frontend (apps/web/)
cd apps/web && npm run dev      # Start dev server on port 8000
cd apps/web && npm run build    # Build for production
cd apps/web && npm test         # Run Jest tests

# Backend (apps/api/)
cd apps/api && npm run start:dev   # Start dev server (port 8001)
cd apps/api && npm run build       # Build for production
cd apps/api && npm test            # Run Jest tests
cd apps/api && npx prisma generate # Generate Prisma client
cd apps/api && npx prisma migrate dev # Run migrations
```

## Architecture Overview

### Frontend (apps/web/)

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

### Backend (apps/api/)

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

Key models in `apps/api/prisma/schema.prisma`:
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
1. Create in `apps/web/lib/hooks/`
2. Use `useMutation` or `useQuery` from @tanstack/react-query
3. Use `apiClient` from `lib/api-client.ts`

## Important Notes

- CORS is configured for frontend URL in `apps/api/src/main.ts`
- Global validation pipe enabled - all DTOs validated automatically
- Password hashing uses bcryptjs with salt rounds
- SSE used for real-time updates (not WebSockets)

## Testing with Playwright
1. Login with this credentials:
   email: claude@gmail.com
   password: password123

# context-mode — MANDATORY routing rules

You have context-mode MCP tools available. These rules are NOT optional — they protect your context window from flooding. A single unrouted command can dump 56 KB into context and waste the entire session.

## BLOCKED commands — do NOT attempt these

### curl / wget — BLOCKED
Any Bash command containing `curl` or `wget` is intercepted and replaced with an error message. Do NOT retry.
Instead use:
- `ctx_fetch_and_index(url, source)` to fetch and index web pages
- `ctx_execute(language: "javascript", code: "const r = await fetch(...)")` to run HTTP calls in sandbox

### Inline HTTP — BLOCKED
Any Bash command containing `fetch('http`, `requests.get(`, `requests.post(`, `http.get(`, or `http.request(` is intercepted and replaced with an error message. Do NOT retry with Bash.
Instead use:
- `ctx_execute(language, code)` to run HTTP calls in sandbox — only stdout enters context

### WebFetch — BLOCKED
WebFetch calls are denied entirely. The URL is extracted and you are told to use `ctx_fetch_and_index` instead.
Instead use:
- `ctx_fetch_and_index(url, source)` then `ctx_search(queries)` to query the indexed content

## REDIRECTED tools — use sandbox equivalents

### Bash (>20 lines output)
Bash is ONLY for: `git`, `mkdir`, `rm`, `mv`, `cd`, `ls`, `npm install`, `pip install`, and other short-output commands.
For everything else, use:
- `ctx_batch_execute(commands, queries)` — run multiple commands + search in ONE call
- `ctx_execute(language: "shell", code: "...")` — run in sandbox, only stdout enters context

### Read (for analysis)
If you are reading a file to **Edit** it → Read is correct (Edit needs content in context).
If you are reading to **analyze, explore, or summarize** → use `ctx_execute_file(path, language, code)` instead. Only your printed summary enters context. The raw file content stays in the sandbox.

### Grep (large results)
Grep results can flood context. Use `ctx_execute(language: "shell", code: "grep ...")` to run searches in sandbox. Only your printed summary enters context.

## Tool selection hierarchy

1. **GATHER**: `ctx_batch_execute(commands, queries)` — Primary tool. Runs all commands, auto-indexes output, returns search results. ONE call replaces 30+ individual calls.
2. **FOLLOW-UP**: `ctx_search(queries: ["q1", "q2", ...])` — Query indexed content. Pass ALL questions as array in ONE call.
3. **PROCESSING**: `ctx_execute(language, code)` | `ctx_execute_file(path, language, code)` — Sandbox execution. Only stdout enters context.
4. **WEB**: `ctx_fetch_and_index(url, source)` then `ctx_search(queries)` — Fetch, chunk, index, query. Raw HTML never enters context.
5. **INDEX**: `ctx_index(content, source)` — Store content in FTS5 knowledge base for later search.

## Subagent routing

When spawning subagents (Agent/Task tool), the routing block is automatically injected into their prompt. Bash-type subagents are upgraded to general-purpose so they have access to MCP tools. You do NOT need to manually instruct subagents about context-mode.

## Output constraints

- Keep responses under 500 words.
- Write artifacts (code, configs, PRDs) to FILES — never return them as inline text. Return only: file path + 1-line description.
- When indexing content, use descriptive source labels so others can `ctx_search(source: "label")` later.

## ctx commands

| Command | Action |
|---------|--------|
| `ctx stats` | Call the `ctx_stats` MCP tool and display the full output verbatim |
| `ctx doctor` | Call the `ctx_doctor` MCP tool, run the returned shell command, display as checklist |
| `ctx upgrade` | Call the `ctx_upgrade` MCP tool, run the returned shell command, display as checklist |
