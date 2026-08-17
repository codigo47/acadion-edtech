# Acadion — AI-Native EdTech Platform

Acadion is a full-stack EdTech platform where **anyone can turn an idea into a complete, pedagogically-structured online course in minutes** — and then actually teach it.

Instead of a blank editor, the creator has a guided conversation with the system (topic → audience → learning objectives → structure → assessment → branding). From that, an AI pipeline generates the full course: modules, units, introductions, 40+ types of content blocks, exercises, per-module quizzes and a final evaluation — all built on instructional-design foundations (Bloom's taxonomy, Gagné's nine events of instruction). The whole generation streams back to the browser in real time.

The second half of the product is the **LMS**: students enroll, take an adaptive diagnostic assessment, and get a personalized path through the course — units they already master are credited and skipped, weak areas get reinforced content and extra practice. Progress, active time-on-task and results are tracked and surfaced in analytics dashboards for both students and organization admins.

It is built as a real multi-tenant SaaS: organizations, role-based permissions, groups, learning plans, badges, notifications, email invitations, and a public portfolio page (`/p/{username}`) where creators can showcase and share their courses.

> This repository is a personal/professional project built to production standards. It is showcased here as an engineering portfolio piece.

---

## Highlights

| Area | What was built |
|---|---|
| **AI generation** | 6-stage LangChain + OpenAI pipeline with Zod-validated structured output, running as background jobs |
| **Real-time UX** | Server-Sent Events stream generation progress step-by-step to the frontend |
| **Async architecture** | BullMQ + Redis job queue; long-running AI work never blocks the HTTP layer |
| **Adaptive learning** | Per-unit diagnostic scoring (1–5) that branches each student into skip / check-only / standard / extended / deep paths |
| **Multi-tenancy** | Organizations, cumulative role permissions (`super_admin`, `org_admin`, `editor`, `commenter`, `viewer`, `student`), groups, invitations |
| **Analytics** | Enrollment, completion and pass rates, average scores, per-unit time tracking, tab-focus loss detection during exercises |
| **Auth** | JWT with a global guard + Google OAuth (SSO), bcrypt password hashing |
| **Infra** | Dockerfiles for both apps, Kustomize base/dev/prod overlays, ArgoCD application manifest |
| **Guardrails** | Two-stage validation on all chat input: deterministic rules (injection, PII redaction, size limits) then an LLM-as-judge on DeepSeek |
| **Evals** | Labelled dataset + scoring harness measuring pass rate, false positives/negatives and p95 latency, wired into the test suite |
| **Testing** | Jest across backend (`*.spec.ts`) and frontend (`@testing-library/react`) |

---

## Tech Stack

### Frontend — `apps/web`
- **Next.js 16** (App Router) + **React 19** + **TypeScript 5**
- **Tailwind CSS v4** for styling
- **TanStack React Query v5** for server state and caching
- **Framer Motion** for animation, **Recharts** for analytics charts, **tsParticles** for landing visuals
- **PostHog** for product analytics
- **Jest** + **Testing Library** for unit/component tests

### Backend — `apps/api`
- **NestJS 11** + **TypeScript**
- **PostgreSQL 16** with **Prisma 7** (`@prisma/adapter-pg`)
- **BullMQ** + **Redis 7** for the generation job queue
- **LangChain 1.x** + **OpenAI** with **Zod** schemas for structured, type-safe LLM output
- **Passport.js** — JWT, local and Google OAuth 2.0 strategies
- **AWS SES** for transactional email (invitations, notifications)
- **class-validator** / **class-transformer** with a global validation pipe
- Pluggable storage layer (`STORAGE_PROVIDER`) for image uploads

### Infrastructure
- **Docker** / **docker-compose** for local Postgres + Redis
- **Kubernetes** manifests with **Kustomize** overlays (`k8s/base`, `k8s/overlays/{dev,prod}`)
- **ArgoCD** for GitOps deployment (`argocd/argocd-app.yaml`)

---

## Architecture

```
source/
├── apps/
│   ├── web/          # Next.js 16 frontend (port 8000)
│   │   ├── app/          # App Router pages: /dashboard, /lms, /project, /p/[username]
│   │   ├── app/components/
│   │   └── lib/          # api-client, React Query hooks (use-auth, use-course, use-course-sse)
│   └── api/          # NestJS backend (port 8001, prefix /api/v1)
│       ├── src/auth/         # guards, strategies, DTOs
│       ├── src/course/       # course domain + AI orchestrator
│       ├── src/lms/          # enrollment, progress, adaptive paths
│       ├── src/organization/ # multi-tenancy, groups, invitations
│       ├── src/analytics/    # metrics for students and admins
│       ├── src/queue/        # BullMQ producers/consumers
│       └── prisma/           # schema + migrations
├── k8s/              # Kustomize manifests
├── argocd/           # GitOps application
└── docs/             # architecture diagrams, ER model, user journeys
```

### Course generation pipeline

1. The creator drives a chat-style flow that dispatches to a single task endpoint:
   `POST /api/v1/course/tasks` with `{ taskName, ...taskData }` (`TaskName` enum: `CREATE_COURSE`, `SET_AUDIENCE`, `SET_MODULES`, `GENERATE_COURSE`, …).
2. `GENERATE_COURSE` enqueues a BullMQ job — the request returns immediately.
3. The orchestrator processor runs six handlers sequentially, each extending `BaseHandler`:

   | Handler | Output |
   |---|---|
   | `index.handler` | Course structure (modules + units) |
   | `objectives.handler` | Learning objectives |
   | `intro-unit.handler` | Introduction unit |
   | `content-unit.handler` | Content units (Gagné / Bloom aligned) |
   | `module-evaluation.handler` | Per-module assessments |
   | `course-evaluation.handler` | Final evaluation |

4. Each handler calls the LLM with a Zod schema, so every response is validated before it touches the database.
5. `CourseStep` rows track per-step status, and an SSE channel broadcasts progress to the browser live.

### Guardrails & evals on chat input

Everything the user types into the course-creation chat box (`topic`, `audience`, `objective`, `restrictions`, `guidelines`) is untrusted text that ends up concatenated into generation prompts. It passes through a two-stage guardrail before it reaches any model provider, enforced server-side in a Nest pipe on `POST /course/tasks` — a client-side check would be trivially bypassable.

```
apps/api/src/guardrails/
├── chat-input-guardrail.pipe.ts   # edge enforcement on the task endpoint
├── guardrails.service.ts          # stage 1 → stage 2 orchestration
├── rules/                         # stage 1: deterministic, offline, µs-scale
│   ├── length.rule.ts               # empty / oversized → block
│   ├── prompt-injection.rule.ts     # known override phrasings → block
│   └── pii.rule.ts                  # emails, cards, phones → redact
├── judge/deepseek-judge.service.ts # stage 2: LLM-as-judge (DeepSeek)
└── evals/                         # dataset + scoring harness + tests
```

**Why two stages.** Regexes catch the obvious attacks for free and never flake; they cannot judge whether "the use of chemical weapons in WWI" is a history course or a harm request. The judge handles the semantic call, and only runs on input stage 1 already accepted — so a rejected prompt never costs a model call.

**Why DeepSeek as judge.** The generation pipeline runs on OpenAI. Using a different provider for the judge means it does not inherit the generator's blind spots. It is reached through the OpenAI-compatible API, so no extra SDK.

**Design decisions worth noting:** PII is redacted rather than blocked (an honest mistake is not an attack); the judge is told to allow when uncertain, because over-blocking legitimate course topics is a worse product failure than a borderline prompt reaching the next layer; the judge fails open by default so a provider outage cannot take down course creation, and that is configurable.

**Evals.** A 5-case dataset (`evals/datasets/chat-input.dataset.ts`), each case covering a distinct failure mode: true negative, injection, PII leak, resource abuse, and over-blocking. The harness scores pass rate, false positives, false negatives and p95 latency.

```bash
npm test              # includes deterministic evals — offline, no API key, no flake
npm run test:evals    # evals only; judge evals run when DEEPSEEK_API_KEY is set
```

The deterministic evals gate every build. The judge evals self-skip without a key and assert *agreement with the labelled dataset above a floor* (`EVAL_MIN_PASS_RATE`) rather than exact output — a probabilistic component tested as one, so a prompt or model change that degrades classification fails the build instead of shipping silently.

### Data model (Prisma)

~30 models, including `User`, `Organization`, `UserOrganization`, `Group`, `Course`, `CourseStep`, `CourseComponent`, `Enrollment`, `CourseUnitProgress`, `AdaptiveAssessment`, `KnowledgeCheckAttempt`, `LearningPlan`, `Badge`, `Notification`, `Portfolio`, `Conversation`, `Message`.

---

## Running Locally

### Prerequisites
- Node.js 20+
- Docker (for PostgreSQL and Redis)
- An OpenAI API key

### 1. Start the infrastructure

```bash
cd apps/api
docker compose up -d       # PostgreSQL 16 on :5588, Redis 7 on :6379
```

### 2. Backend

```bash
cd apps/api
npm install
cp .env.example .env       # then fill in the values (see below)
npx prisma generate
npx prisma migrate dev
npm run start:dev          # http://localhost:8001/api/v1
```

### 3. Frontend

```bash
cd apps/web
npm install
cp .env.example .env.local
npm run dev                # http://localhost:8000
```

### 4. Tests

```bash
cd apps/api && npm test    # Jest (*.spec.ts)
cd apps/web && npm test    # Jest + Testing Library (*.test.tsx)
```

### Production builds

```bash
cd apps/api && npm run build && npm run start:prod
cd apps/web && npm run build && npm start
```

---

## Environment Variables

### `apps/api/.env`

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (e.g. `postgresql://postgres:postgres@localhost:5588/cursos`) |
| `PORT` | API port (default `8001`) |
| `REDIS_HOST` | Redis host for BullMQ (e.g. `localhost`) |
| `REDIS_PORT` | Redis port (e.g. `6379`) |
| `JWT_SECRET` | Secret used to sign JWTs |
| `JWT_EXPIRES_IN` | Token lifetime (e.g. `7d`) |
| `OPENAI_API_KEY` | OpenAI key used by the LangChain pipeline |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `GOOGLE_CALLBACK_URL` | OAuth callback, e.g. `http://localhost:8001/api/v1/auth/google/callback` |
| `FRONTEND_URL` | Frontend origin — used for CORS and OAuth redirects (`http://localhost:8000`) |
| `AWS_SES_REGION` | AWS region for SES |
| `AWS_SES_ACCESS_KEY_ID` | SES access key |
| `AWS_SES_SECRET_ACCESS_KEY` | SES secret key |
| `AWS_SES_FROM_EMAIL` | Verified sender address |
| `STORAGE_PROVIDER` | Image storage backend (defaults to `local`) |
| `DEEPSEEK_API_KEY` | DeepSeek key for the LLM-as-judge guardrail. Leave empty to run deterministic-only |
| `DEEPSEEK_BASE_URL` | DeepSeek endpoint (`https://api.deepseek.com`) |
| `DEEPSEEK_JUDGE_MODEL` | Judge model (`deepseek-chat`) |
| `GUARDRAILS_ENABLED` | Master switch for the guardrail chain (default `true`) |
| `GUARDRAILS_JUDGE_ENABLED` | Enables stage 2; requires `DEEPSEEK_API_KEY` (default `false`) |
| `GUARDRAILS_MAX_INPUT_CHARS` | Per-field limit on free text (default `2000`) |
| `GUARDRAILS_JUDGE_FAIL_OPEN` | Allow input when the judge is unreachable (default `true`) |
| `EVAL_MIN_PASS_RATE` | Floor for judge/dataset agreement in the evals (default `0.8`) |

> Email (SES) and Google OAuth are optional for local development — email/password auth works without them. So is DeepSeek: without a key the guardrails run their deterministic layer and the judge evals skip.

### `apps/web/.env.local`

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend base URL including the prefix (`http://localhost:8001/api/v1`) |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog project key (optional) |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog host (optional) |
| `NEXT_PUBLIC_POSTHOG_ENV` | Environment label for analytics (optional) |

---

## Feature Overview

**Course creation**
Conversational course builder · 6-stage AI pipeline · live SSE progress · visual editor with component preview · 40+ content block types · configurable exercise types · custom branding (colors, typography).

**LMS**
Student dashboard sorted by progress · full course player with unit sidebar and locking · active time tracking that pauses on tab blur · unit-by-unit completion · course completion with score and pass/fail.

**Adaptive learning**
Mandatory pre-assessment (self-confidence 1–5 per topic) · five differentiated paths per unit (credited / knowledge-check only / standard / extended / deep) · post-assessment repeating the same questions for a before-and-after comparison.

**Organizations & collaboration**
Orgs with associated courses · email invitations with registration validation · member table with editable roles · groups · per-org badge and learning-plan management.

**Engagement**
Badge system (`progress`, `level`, `excellence`, `role`) with automatic notifications · in-app notification bell with unread counts · learning plans with progress bars.

**Public portfolio**
SSR portfolio at `/p/{username}` with SEO metadata, configurable themes, selectable visible courses, public/private toggle, visit tracking and a contact form.

**Analytics**
Per-course enrollment, completion and pass rates, average scores · per-unit average time · organization-level rollups · separate admin and student dashboards.

See [`FEATURES.md`](./FEATURES.md) for the detailed, up-to-date feature status and [`docs/diagrams/`](./docs/diagrams) for the ER model, architecture and user-journey diagrams.

---

## Conventions

- **Files:** kebab-case (`user-auth.guard.ts`) · **Classes:** PascalCase · **Methods/vars:** camelCase · **Constants:** `UPPER_SNAKE_CASE`
- Backend tests as `*.spec.ts`, frontend tests as `*.test.tsx`
- All DTOs validated automatically through the global NestJS validation pipe

---

## License

Proprietary — all rights reserved. Available for review as a portfolio project.
