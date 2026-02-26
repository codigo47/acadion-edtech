# C4 Architecture Diagrams

> System architecture for **acadion.ai** presented using the C4 model (Context, Container, Component).

---

## Level 1 -- System Context

Shows acadion.ai and its external dependencies from the highest level.

```mermaid
C4Context
    title System Context - acadion.ai

    Person(creator, "Creator / Instructor", "Creates AI-powered courses, manages organizations and learning plans")
    Person(student, "Student / Learner", "Takes courses, completes assessments, earns badges")

    System(acadion, "acadion.ai", "AI-powered educational content creation and LMS platform")

    System_Ext(openai, "OpenAI API", "LLM for course content generation via LangChain")
    System_Ext(google, "Google OAuth", "SSO authentication provider")
    System_Ext(browser, "Web Browser", "Next.js frontend served to users")

    Rel(creator, acadion, "Creates courses, manages orgs", "HTTPS")
    Rel(student, acadion, "Takes courses, tracks progress", "HTTPS")
    Rel(acadion, openai, "Generates content", "HTTPS/REST")
    Rel(acadion, google, "Authenticates users", "OAuth 2.0")
    Rel(browser, acadion, "SPA requests", "HTTPS/REST + SSE")
```

---

## Level 2 -- Container Diagram

Shows the major deployable units and their interactions.

```mermaid
C4Container
    title Container Diagram - acadion.ai

    Person(creator, "Creator", "")
    Person(student, "Student", "")

    System_Boundary(acadion, "acadion.ai Platform") {
        Container(frontend, "Web App", "Next.js 16, React 19, TailwindCSS v4", "SPA with App Router, serves creator dashboard, course editor, LMS, and public portfolio")
        Container(backend, "API Server", "NestJS 11, TypeScript", "REST API with JWT auth, task dispatcher, SSE streaming, and AI orchestration")
        Container(queue, "Job Queue", "BullMQ + Redis", "Processes long-running AI course generation jobs asynchronously")
        ContainerDb(db, "Database", "PostgreSQL", "Stores users, courses, enrollments, organizations, badges, portfolios, and all domain data")
        ContainerDb(redis, "Redis", "Redis", "Job queue backend and caching layer")
    }

    System_Ext(openai, "OpenAI API", "")
    System_Ext(google, "Google OAuth", "")

    Rel(creator, frontend, "Uses", "HTTPS")
    Rel(student, frontend, "Uses", "HTTPS")
    Rel(frontend, backend, "API calls", "HTTPS/REST + SSE")
    Rel(backend, db, "Reads/Writes", "Prisma ORM")
    Rel(backend, queue, "Enqueues jobs", "BullMQ")
    Rel(queue, redis, "Backed by", "Redis protocol")
    Rel(queue, db, "Updates course data", "Prisma ORM")
    Rel(queue, openai, "Generates content", "HTTPS/REST")
    Rel(backend, google, "OAuth flow", "HTTPS")
```

---

## Level 3 -- Component Diagram (Backend)

Shows the NestJS modules that make up the backend API server.

```mermaid
C4Component
    title Component Diagram - Backend API (NestJS)

    Container_Boundary(api, "API Server") {
        Component(auth, "AuthModule", "Passport.js, JWT + Google", "Registration, login, OAuth callback, token validation")
        Component(users, "UsersModule", "", "User CRUD and profile management")
        Component(course, "CourseModule", "Task dispatcher", "Course CRUD, task-based API, SSE streaming")
        Component(orchestrator, "Orchestrator", "LangChain + OpenAI", "6-handler AI generation pipeline")
        Component(queue_mod, "QueueModule", "BullMQ", "Job queue for async course generation")
        Component(lms, "LmsModule", "", "Student dashboard, enrollment, progress tracking, adaptive learning")
        Component(org, "OrganizationModule", "", "Org CRUD, member management, role assignment")
        Component(group, "GroupModule", "", "Student groups within organizations")
        Component(lp, "LearningPlanModule", "", "Learning plan CRUD, course ordering, user assignment")
        Component(badge, "BadgeModule", "", "Badge CRUD, conditions, manual/auto awarding")
        Component(analytics, "AnalyticsModule", "", "Course, org, and student analytics")
        Component(portfolio, "PortfolioModule", "", "Portfolio settings, public profile, visit tracking")
        Component(notification, "NotificationModule", "", "In-app notifications with read tracking")
        Component(conversation, "ConversationModule", "", "AI chat conversations during course creation")
        Component(prisma, "PrismaModule", "Prisma ORM", "Database access layer")
        Component(health, "HealthModule", "", "Health check endpoint")
    }

    Rel(auth, users, "Validates/creates users")
    Rel(course, orchestrator, "Triggers generation")
    Rel(course, queue_mod, "Enqueues jobs")
    Rel(course, conversation, "Manages chat")
    Rel(lms, analytics, "Provides data")
    Rel(badge, notification, "Sends badge_earned")
    Rel(lp, org, "Scoped to org")
    Rel(badge, org, "Scoped to org")
    Rel(group, org, "Scoped to org")
```

---

## Level 3 -- Component Diagram (Frontend)

Shows the major areas of the Next.js frontend application.

```mermaid
C4Component
    title Component Diagram - Frontend (Next.js)

    Container_Boundary(web, "Web Application") {
        Component(public_pages, "Public Pages", "Next.js App Router", "Landing, blog, about, careers, compare-plans, legal pages")
        Component(auth_pages, "Auth Pages", "Login, Register, OAuth callback, Onboarding", "Authentication flow with JWT storage")
        Component(dashboard, "Creator Dashboard", "/dashboard/*", "Course list, organizations, learning plans, badges, analytics, portfolio, account")
        Component(editor, "Course Editor", "/project/[courseKey]", "AI chat interface for course creation with real-time SSE progress")
        Component(preview, "Course Preview", "/preview/[courseKey]", "Student-view preview of generated courses")
        Component(lms_ui, "Student LMS", "/lms/*", "Course player, progress tracking, assessments, achievements, analytics")
        Component(portfolio_public, "Public Portfolio", "/p/[username]", "SSR public portfolio with SEO metadata")
        Component(api_client, "API Client", "lib/api-client.ts", "Centralized fetch wrapper with JWT injection")
        Component(hooks, "React Query Hooks", "lib/hooks/*", "useAuth, useCourse, useCourseSse, useOrganizations, useBadges, useAnalytics, useNotifications")
        Component(providers, "Providers", "QueryClientProvider, AuthProvider", "React context and server state management")
        Component(blocks, "Block Components", "app/components/blocks", "40+ reusable content block renderers shared between editor and LMS")
    }

    Rel(dashboard, api_client, "Uses")
    Rel(editor, api_client, "Uses")
    Rel(lms_ui, api_client, "Uses")
    Rel(api_client, hooks, "Wrapped by")
    Rel(editor, blocks, "Renders content")
    Rel(lms_ui, blocks, "Renders content")
    Rel(preview, blocks, "Renders content")
```

---

## Infrastructure Overview

```mermaid
flowchart LR
    subgraph Client
        Browser["Web Browser"]
    end

    subgraph Frontend["Frontend (Next.js 16)"]
        NextServer["Next.js Server\nport 8000"]
    end

    subgraph Backend["Backend (NestJS 11)"]
        NestServer["NestJS Server\nport 8001\n/api/v1/*"]
    end

    subgraph Workers["Background Workers"]
        BullWorker["BullMQ Worker\nCourse Orchestrator"]
    end

    subgraph Data["Data Stores"]
        PG[("PostgreSQL\nPrisma ORM")]
        RD[("Redis\nBullMQ queues")]
    end

    subgraph External["External Services"]
        OpenAI["OpenAI API\nGPT via LangChain"]
        GoogleOAuth["Google OAuth 2.0"]
    end

    Browser -->|HTTPS| NextServer
    NextServer -->|REST + SSE| NestServer
    NestServer -->|Prisma| PG
    NestServer -->|Enqueue| RD
    BullWorker -->|Dequeue| RD
    BullWorker -->|Write results| PG
    BullWorker -->|LLM calls| OpenAI
    NestServer -->|OAuth| GoogleOAuth
```

---

## Key Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Frontend framework | Next.js 16 with App Router | SSR for public pages (portfolio, SEO), SPA for dashboard |
| Backend framework | NestJS 11 | Modular architecture, TypeScript-native, decorator-based |
| Database ORM | Prisma | Type-safe queries, schema-as-code, easy migrations |
| Job queue | BullMQ + Redis | Reliable async processing for long AI generation jobs |
| AI integration | LangChain + OpenAI | Structured output with Zod schemas, composable chains |
| Real-time updates | SSE (Server-Sent Events) | Simpler than WebSockets for unidirectional progress streaming |
| Authentication | JWT + Google OAuth | Stateless auth with optional SSO |
| State management | React Query | Server-state caching, background refetching, optimistic updates |
| Styling | Tailwind CSS v4 | Utility-first, rapid UI development |
