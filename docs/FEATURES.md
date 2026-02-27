# acadion.ai -- Feature Overview

> Last updated: 2026-02-26

---

## Implementation Status Summary

| Feature | Backend | Frontend | Status |
|---|:---:|:---:|---|
| AI Course Generation | Done | Done | **Complete** |
| LMS (Course Player) | Done | Done | **Complete** |
| Adaptive Learning | Done | Done | **Complete** |
| Organizations | Done | Done | **Complete** |
| Learning Plans | Done | Done | **Complete** |
| Badges & Gamification | Done | Done | **Complete** |
| Analytics | Done | Done | **Complete** |
| Portfolio | Done | Done | **Complete** |
| Notifications | Done | Done | **Complete** |
| Authentication | Done | Done | **Complete** |
| Blog | -- | Done | **Frontend only** (static data) |
| Onboarding | -- | Partial | **Pending** (page exists, no backend flow) |
| Email invitations | -- | -- | **Not implemented** (invites stored, no email sent) |
| Role-based access control | -- | -- | **Not implemented** (roles stored, not enforced) |

---

## Core Features

### 1. AI-Powered Course Generation -- Complete

Create complete courses through a conversational AI interface.

- **Conversational flow** -- Creators define course parameters step-by-step via chat (topic, audience, objectives, modules, units, evaluation, branding)
- **6-handler AI pipeline** -- LangChain + OpenAI generates course content through sequential handlers:
  1. **Index** -- Course structure (modules and units)
  2. **Objectives** -- Learning objectives per unit
  3. **Intro Unit** -- Introduction content
  4. **Content Units** -- Main content using Gagne's events and Bloom's taxonomy
  5. **Module Evaluations** -- Per-module assessments
  6. **Course Evaluation** -- Final comprehensive evaluation
- **Real-time progress** -- SSE streaming provides live updates during generation
- **40+ content components** -- Paragraphs, tables, galleries, exercises, multiple choice, and more
- **Configurable branding** -- Colors, fonts, and visual styling per course
- **Task-based API** -- Single endpoint (`POST /course/tasks`) dispatches 12 task types

### 2. Learning Management System (LMS) -- Complete

A full student-facing LMS, separate from the course creator.

- **Student dashboard** (`/lms`) -- Courses organized by status: in-progress, available, completed
- **Course player** (`/lms/:courseKey`) -- Unit-by-unit navigation with sidebar, progress bar, and content rendering
- **Time tracking** -- Active time per unit with focus-loss detection (pauses when tab loses focus)
- **Progress tracking** -- Per-unit completion with `CourseUnitProgress` model
- **Knowledge checks** -- In-course assessments with attempt tracking
- **Course completion** -- Score calculation, pass/fail determination

### 3. Adaptive Learning -- Complete

Personalized learning paths based on student self-assessment.

- **Pre-assessment** (`/lms/:courseKey/pre-assessment`) -- Students rate confidence per unit on a 1-5 scale
- **Adaptive routing** based on confidence score:
  - Score 5: Unit skipped (accredited)
  - Score 4: Knowledge check only
  - Score 3: Full content
  - Score 2: Content + extended exercises
  - Score 1: Reinforced content + extra exercises + extended knowledge check
- **Post-assessment** (`/lms/:courseKey/post-assessment`) -- Same questions repeated for pre/post comparison
- **Per-unit logic** -- Each unit adapts independently via `AdaptiveService.computeAdaptivePath()`

### 4. Organizations -- Complete

Multi-tenant organization structure for institutions and companies.

- **Organization management** -- Create, configure, and manage organizations
- **Member management** -- Invite by email, assign roles, remove members
- **6 role levels**: `super_admin`, `org_admin`, `editor`, `commenter`, `viewer`, `student`
- **Student groups** -- Organize students into groups within an organization
- **Org-scoped features** -- Badges, learning plans, and courses scoped to organizations

**Not implemented:**
- Role-based permission enforcement (roles are stored but all authenticated users have the same access)
- Email delivery for invitations (invite records are created but no email is sent)

### 5. Learning Plans -- Complete

Structured learning paths that organize courses into sequences.

- **Plan creation** -- Name, description, image, estimated duration, optional badge reward
- **Course ordering** -- Add courses to plans with configurable order and required/optional flags
- **Hierarchy** -- Parent/child plan relationships
- **Correlative mode** -- Optional sequential course completion requirement
- **User assignment** -- Assign plans to individual students or groups with optional deadlines
- **Student view** (`/lms/plans/:planId`) -- Visual progress through plan courses

### 6. Badges and Gamification -- Complete

Achievement system to motivate and recognize student progress.

- **4 badge types**: `progress`, `level`, `excellence`, `role`
- **6 condition types**: `course_completed`, `score_above`, `plan_completed`, `completed_in_time`, `first_in_org`, `manual`
- **Automatic awarding** -- `evaluateAndGrantBadges()` runs on course completion, evaluates all matching conditions
- **Manual awarding** -- Admins can award badges directly to students via `POST /badges/:id/award`
- **Student achievements** (`/lms/achievements`) -- View earned badges and locked badges with unlock hints
- **Creator management** (`/dashboard/badges`) -- 3-step creation wizard, detail page with edit/award/activate
- **Dashboard preview** (`/dashboard`) -- Achievements section shows earned and locked badges
- **Notifications** -- Automatic `badge_earned` notification on award

### 7. Analytics and Metrics -- Complete

Comprehensive analytics at organization, course, and student levels.

- **Organization analytics** -- Total courses, enrolled students, average completion
- **Course analytics** (`/dashboard/analytics/:courseKey`) -- Enrollment counts, completion rates, pass rates, average scores, unit-level breakdown
- **Student analytics** (`/lms/analytics`) -- Personal learning stats: enrolled, completed, average score, total time, per-course breakdown, recent activity
- **Portfolio analytics** -- Visit count, countries, course opens
- **Time tracking** -- Active time per unit with focus-loss detection
- **Knowledge check results** -- Per-attempt tracking with correct/incorrect answers

### 8. Portfolio -- Complete

Public-facing portfolio for creators to showcase their courses.

- **Public URL** -- `/p/:username` with SSR and SEO metadata
- **Customizable profile** -- Title, bio, tagline, portrait image, cover image, social links
- **Theme selection** -- Visual themes for the public portfolio
- **Skills and languages** -- Configurable skill and language tags
- **Course showcase** -- Select which courses are visible publicly
- **Executable portfolio** -- Visitors can navigate courses from `/p/:username/:courseKey`
- **Visit tracking** -- Country-level analytics on portfolio visits
- **Contact form** -- Public contact message submission
- **Privacy toggle** -- Public/private visibility control (returns 404 when private)

### 9. Notifications -- Complete

In-app notification system for important events.

- **6 notification types**: `enrolled`, `learning_plan_assigned`, `course_completed`, `course_failed`, `badge_earned`, `invitation`
- **Notification bell** -- Icon with unread count in both dashboard and LMS navbars
- **Mark as read** -- Individual and bulk read marking
- **Color-coded** -- Different visual styles per notification type
- **Triggered by**: course completion, badge award, learning plan assignment, enrollment

### 10. Authentication -- Complete

Flexible authentication supporting email and social login.

- **Email/password** -- Registration and login with bcrypt password hashing
- **Google OAuth** -- SSO via Google with automatic account linking
- **JWT tokens** -- Stateless authentication with tokens stored in localStorage
- **Global JWT guard** -- Protected routes enforced via `JwtAuthGuard`
- **Username** -- Unique username per user (used for portfolio URL)

### 11. Blog -- Frontend Only

Static blog pages with hardcoded content.

- **Blog listing** (`/blog`) -- Grid of blog posts
- **Blog detail** (`/blog/:slug`) -- Individual post with SEO metadata
- **Data source**: Static `data.ts` file, no backend CMS

### 12. Public Pages -- Complete

Marketing and legal pages.

- **Landing page** (`/`) -- Feature showcase, hero section
- **About** (`/about`), **Careers** (`/careers`), **Compare Plans** (`/compare-plans`)
- **Legal**: Terms, Privacy, Cookies, GDPR

---

## Known Gaps and TODOs

| Area | Gap | Impact |
|---|---|---|
| RBAC | Roles are stored per org member but not enforced on API endpoints | Any authenticated user can access any endpoint |
| Email | No email service configured (invitations, password reset, notifications) | Invitations are stored as records but users aren't notified |
| Onboarding | `/onboarding` page exists but flow is incomplete | New users don't go through guided org creation |
| Blog CMS | Blog content is hardcoded in `web/app/blog/data.ts` | No dynamic content management |
| Payment/Plans | `/compare-plans` page exists but no payment integration | Pricing is display-only |
| Course editing | No post-generation content editing (UI buttons exist but are non-functional, no backend endpoints) | Generated content is read-only; the editor toolbar (edit, delete, duplicate, add, AI) has no onClick handlers and no backend support |
| Learning plan badge trigger | `plan_completed` event is defined but not triggered when a plan is completed | Badges with `plan_completed` condition won't auto-award |

---

## Architecture Quick Reference

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | Next.js 16, React 19, Tailwind CSS v4 | SPA + SSR web application |
| State Management | React Query (@tanstack/react-query) | Server state caching and sync |
| Backend | NestJS 11, TypeScript | Modular REST API server |
| Database | PostgreSQL, Prisma ORM | Relational data storage |
| Job Queue | BullMQ, Redis | Async AI generation processing |
| AI | LangChain, OpenAI | Structured content generation |
| Auth | Passport.js, JWT, Google OAuth | Authentication and authorization |
| Real-time | Server-Sent Events (SSE) | Progress streaming during generation |

---

## Backend Modules

| Module | Path | Purpose |
|---|---|---|
| AuthModule | `src/auth/` | Authentication and authorization |
| UsersModule | `src/users/` | User CRUD and profiles |
| CourseModule | `src/course/` | Course creation, task API, SSE |
| ConversationModule | `src/conversation/` | AI chat conversations |
| QueueModule | `src/queue/` | BullMQ job processing |
| LmsModule | `src/lms/` | Student LMS and adaptive learning |
| OrganizationModule | `src/organization/` | Organization management |
| GroupModule | `src/group/` | Student groups |
| LearningPlanModule | `src/learning-plan/` | Learning plan management |
| BadgeModule | `src/badge/` | Badge management and awarding |
| AnalyticsModule | `src/analytics/` | Analytics and metrics |
| PortfolioModule | `src/portfolio/` | Public portfolio |
| NotificationModule | `src/notification/` | In-app notifications |
| PrismaModule | `src/prisma/` | Database access layer |
| HealthModule | `src/health/` | Health check endpoint |

---

## Frontend Route Structure

| Area | Base Path | Description |
|---|---|---|
| Public | `/` | Landing, blog, about, careers, legal pages |
| Auth | `/login`, `/auth/callback`, `/onboarding` | Authentication flow |
| Creator Dashboard | `/dashboard/*` | Course list, organizations, plans, badges, analytics, portfolio, account |
| Course Editor | `/project/[courseKey]` | AI chat interface for course creation |
| Course Preview | `/preview/[courseKey]` | Student-view preview |
| Student LMS | `/lms/*` | Course player, assessments, achievements, analytics, plans |
| Public Portfolio | `/p/[username]` | Public portfolio with SSR |

---

## Database Schema Summary

The database contains **24 models** organized across 9 domains:

- **Auth**: User, Account, Session, VerificationToken
- **Organizations**: Organization, UserOrganization, Group, UserGroup
- **Courses**: Course, CourseStep, Component, CourseComponent
- **Conversations**: Conversation, Message
- **LMS**: Enrollment, CourseUnitProgress, KnowledgeCheckAttempt, AdaptiveAssessment
- **Learning Plans**: LearningPlan, LearningPlanCourse, UserLearningPlan
- **Badges**: Badge, UserBadge
- **Portfolio**: Portfolio, PortfolioImage, PortfolioVideo, PortfolioVisit, PortfolioContactMessage, PortfolioCourse
- **Notifications**: Notification

See [diagrams/01-database-er.md](./diagrams/01-database-er.md) for the complete ER diagram.
