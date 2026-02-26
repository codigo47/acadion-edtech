# Sequence Diagrams

> Key interaction sequences in **acadion.ai** showing how the frontend, backend, database, queue, and external services communicate.

---

## 1. Authentication -- Email Login

```mermaid
sequenceDiagram
    actor User
    participant Browser as Next.js Frontend
    participant API as NestJS Backend
    participant DB as PostgreSQL

    User->>Browser: Enter email + password
    Browser->>API: POST /api/v1/auth/login
    API->>DB: Find user by email
    DB-->>API: User record
    API->>API: Validate password (bcryptjs)
    API->>API: Generate JWT token
    API-->>Browser: { accessToken, user }
    Browser->>Browser: Save token + user to localStorage
    Browser-->>User: Redirect to /dashboard
```

---

## 2. Authentication -- Google OAuth

```mermaid
sequenceDiagram
    actor User
    participant Browser as Next.js Frontend
    participant API as NestJS Backend
    participant Google as Google OAuth
    participant DB as PostgreSQL

    User->>Browser: Click "Sign in with Google"
    Browser->>API: GET /api/v1/auth/google
    API->>Google: Redirect to consent screen
    Google-->>User: Show OAuth consent
    User->>Google: Authorize
    Google->>API: GET /api/v1/auth/google/callback (code)
    API->>Google: Exchange code for tokens
    Google-->>API: Access token + user info
    API->>DB: Find or create user + Account
    DB-->>API: User record
    API->>API: Generate JWT
    API->>Browser: Redirect to /auth/callback?token=...&user=...
    Browser->>Browser: Parse token + user from URL params
    Browser->>Browser: Save to localStorage
    Browser-->>User: Redirect to /dashboard (or /onboarding if first time)
```

---

## 3. Course Creation -- AI Chat Flow

```mermaid
sequenceDiagram
    actor Creator
    participant Browser as Next.js Frontend
    participant API as NestJS Backend
    participant DB as PostgreSQL

    Creator->>Browser: Click "New Project"
    Browser->>API: POST /api/v1/course/tasks<br/>{taskName: CREATE_COURSE, userId}
    API->>DB: Create course (status: draft)
    DB-->>API: Course record
    API-->>Browser: { courseKey }
    Browser-->>Creator: Redirect to /project/:courseKey

    Creator->>Browser: Enter course topic
    Browser->>API: POST /api/v1/course/tasks<br/>{taskName: GENERATE_TITLE, courseKey, topic}
    API->>DB: Update course title
    API-->>Browser: { title }

    Creator->>Browser: Set audience
    Browser->>API: POST /api/v1/course/tasks<br/>{taskName: SET_AUDIENCE, courseKey, audience}
    API->>DB: Update course input
    API-->>Browser: Confirmation

    Note over Creator,DB: Similar calls for SET_OBJECTIVE,<br/>SET_BUILDING_METHOD, SET_MODULES,<br/>SET_UNITS, SET_EVALUATION, SET_BRANDING

    Creator->>Browser: Click "Generate"
    Browser->>API: POST /api/v1/course/tasks<br/>{taskName: GENERATE_COURSE, courseKey}
    API->>DB: Update status to "generating"
    API-->>Browser: { status: generating }
    Note over API,DB: Job enqueued to BullMQ (see next diagram)
```

---

## 4. Course Generation -- AI Pipeline (Background Job)

```mermaid
sequenceDiagram
    participant API as NestJS Backend
    participant Queue as BullMQ Worker
    participant DB as PostgreSQL
    participant AI as OpenAI (LangChain)
    participant SSE as SSE Stream

    API->>Queue: Enqueue generation job (courseKey)

    Queue->>DB: Load course data
    DB-->>Queue: Course with input

    rect rgb(240, 248, 255)
        Note over Queue,AI: Handler 1: Index
        Queue->>AI: Generate course structure
        AI-->>Queue: Structured index (modules, units)
        Queue->>DB: Save CourseStep (generating_index)
        Queue->>SSE: Emit progress event
    end

    rect rgb(240, 255, 240)
        Note over Queue,AI: Handler 2: Objectives
        Queue->>AI: Generate learning objectives
        AI-->>Queue: Objectives per unit
        Queue->>DB: Save CourseStep (generating_objectives)
        Queue->>SSE: Emit progress event
    end

    rect rgb(255, 248, 240)
        Note over Queue,AI: Handler 3: Intro Unit
        Queue->>AI: Generate introduction content
        AI-->>Queue: Intro components
        Queue->>DB: Save CourseComponents
        Queue->>DB: Save CourseStep (generating_intro_unit)
        Queue->>SSE: Emit progress event
    end

    rect rgb(248, 240, 255)
        Note over Queue,AI: Handler 4: Content Units (loop per unit)
        loop For each content unit
            Queue->>AI: Generate unit content (Gagne + Bloom)
            AI-->>Queue: Content components
            Queue->>DB: Save CourseComponents
            Queue->>SSE: Emit progress event
        end
        Queue->>DB: Save CourseStep (generating_content_unit)
    end

    rect rgb(255, 240, 245)
        Note over Queue,AI: Handler 5: Module Evaluations
        Queue->>AI: Generate module evaluations
        AI-->>Queue: Evaluation components
        Queue->>DB: Save CourseComponents
        Queue->>DB: Save CourseStep (generating_module_evaluation)
        Queue->>SSE: Emit progress event
    end

    rect rgb(245, 255, 240)
        Note over Queue,AI: Handler 6: Course Evaluation
        Queue->>AI: Generate final evaluation
        AI-->>Queue: Final evaluation components
        Queue->>DB: Save CourseComponents
        Queue->>DB: Save CourseStep (generating_course_evaluation)
        Queue->>SSE: Emit progress event
    end

    Queue->>DB: Update course status to "completed"
    Queue->>SSE: Emit completion event
```

---

## 5. SSE -- Real-Time Progress Streaming

```mermaid
sequenceDiagram
    actor Creator
    participant Browser as Next.js Frontend
    participant API as NestJS Backend
    participant Queue as BullMQ Worker

    Creator->>Browser: Trigger course generation
    Browser->>API: GET /api/v1/course/:key/events (SSE)
    Note over Browser,API: SSE connection kept open

    loop During generation
        Queue->>API: Emit SSE event (via CourseSSEService)
        API-->>Browser: SSE event: { type, data, progress }
        Browser-->>Creator: Update UI progress bar
    end

    Queue->>API: Emit completion event
    API-->>Browser: SSE event: { type: "completed" }
    Browser-->>Creator: Show completed course
```

---

## 6. LMS -- Student Course Flow

```mermaid
sequenceDiagram
    actor Student
    participant Browser as Next.js Frontend
    participant API as NestJS Backend
    participant DB as PostgreSQL

    Student->>Browser: Open /lms
    Browser->>API: GET /api/v1/lms/dashboard
    API->>DB: Query enrollments + learning plans
    DB-->>API: Dashboard data
    API-->>Browser: { courses, learningPlans }
    Browser-->>Student: Show student dashboard

    Student->>Browser: Click course card
    Browser->>API: GET /api/v1/lms/courses/:key
    API->>DB: Load course content + enrollment
    DB-->>API: Course components + progress
    API-->>Browser: { course, enrollment, components, progress }

    opt Adaptive course with pre-assessment
        Browser->>API: GET /api/v1/lms/courses/:key/pre-assessment
        API-->>Browser: Assessment questions
        Student->>Browser: Rate confidence per unit (1-5)
        Browser->>API: POST /api/v1/lms/courses/:key/pre-assessment
        API->>DB: Save AdaptiveAssessment records
        API-->>Browser: Adaptive route per unit
    end

    loop For each unit
        Student->>Browser: Read content, complete exercises
        Browser->>API: PATCH /api/v1/lms/courses/:key/progress<br/>{unitCode, timeSpentSeconds, completed}
        API->>DB: Upsert CourseUnitProgress
        API-->>Browser: Updated progress
    end

    Student->>Browser: Click "Finish Course"
    Browser->>API: POST /api/v1/lms/courses/:key/complete<br/>{score, passed}
    API->>DB: Update enrollment (completedAt, score, passed)
    API-->>Browser: Completion result
```

---

## 7. Badge Award Flow

```mermaid
sequenceDiagram
    participant System as Backend Service
    participant BadgeSvc as BadgeService
    participant NotifSvc as NotificationModule
    participant DB as PostgreSQL
    actor Student

    System->>BadgeSvc: Check badge conditions<br/>(on course complete / manual award)
    BadgeSvc->>DB: Query Badge conditions
    DB-->>BadgeSvc: Badge definition (type, conditionType, targetId)

    alt Condition met
        BadgeSvc->>DB: Create UserBadge record
        BadgeSvc->>NotifSvc: Create notification (badge_earned)
        NotifSvc->>DB: Insert Notification
        DB-->>Student: Badge visible in /lms/achievements
    else Condition not met
        BadgeSvc-->>System: No badge awarded
    end
```

---

## 8. Organization Member Invitation

```mermaid
sequenceDiagram
    actor Admin
    participant Browser as Next.js Frontend
    participant API as NestJS Backend
    participant DB as PostgreSQL

    Admin->>Browser: Enter email to invite
    Browser->>API: POST /api/v1/organizations/:key/members<br/>{email, role}
    API->>DB: Find user by email
    alt User exists
        DB-->>API: User found
        API->>DB: Create UserOrganization (userId, orgId, role)
    else User not found
        DB-->>API: No user
        API->>DB: Create invitation record
        API-->>Browser: User will be added on registration
    end
    API-->>Browser: Member added/invited
    Browser-->>Admin: Update member list
```
