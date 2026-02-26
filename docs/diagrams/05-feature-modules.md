# Feature Modules

> Maps each feature module in **acadion.ai** to its backend module, frontend routes, database models, and API endpoints.

---

## Module Dependency Graph

```mermaid
flowchart TD
    AppModule["AppModule"]

    AppModule --> AuthModule
    AppModule --> UsersModule
    AppModule --> CourseModule
    AppModule --> ConversationModule
    AppModule --> QueueModule
    AppModule --> LmsModule
    AppModule --> OrganizationModule
    AppModule --> GroupModule
    AppModule --> LearningPlanModule
    AppModule --> BadgeModule
    AppModule --> AnalyticsModule
    AppModule --> PortfolioModule
    AppModule --> NotificationModule
    AppModule --> PrismaModule
    AppModule --> HealthModule

    AuthModule --> UsersModule
    AuthModule --> PrismaModule
    CourseModule --> QueueModule
    CourseModule --> ConversationModule
    CourseModule --> PrismaModule
    LmsModule --> PrismaModule
    OrganizationModule --> PrismaModule
    GroupModule --> PrismaModule
    LearningPlanModule --> PrismaModule
    BadgeModule --> NotificationModule
    BadgeModule --> PrismaModule
    AnalyticsModule --> PrismaModule
    PortfolioModule --> PrismaModule
    NotificationModule --> PrismaModule
    ConversationModule --> PrismaModule
    QueueModule --> PrismaModule
```

---

## 1. AuthModule

Authentication and authorization.

```mermaid
flowchart LR
    subgraph AuthModule
        AuthController["AuthController"]
        AuthService["AuthService"]
        LocalStrategy["LocalStrategy\n(Passport)"]
        JwtStrategy["JwtStrategy\n(Passport)"]
        GoogleStrategy["GoogleStrategy\n(Passport)"]
        JwtGuard["JwtAuthGuard"]
        LocalGuard["LocalAuthGuard"]
        GoogleGuard["GoogleAuthGuard"]
    end

    AuthController --> AuthService
    AuthService --> LocalStrategy
    AuthService --> JwtStrategy
    AuthService --> GoogleStrategy
```

| Aspect | Details |
|---|---|
| **Backend** | `src/auth/` |
| **Frontend Routes** | `/login`, `/auth/callback`, `/onboarding` |
| **DB Models** | `User`, `Account`, `Session`, `VerificationToken` |
| **API Endpoints** | `POST /auth/register`, `POST /auth/login`, `GET /auth/google`, `GET /auth/google/callback`, `GET /auth/profile`, `POST /auth/logout` |

---

## 2. CourseModule

Core course creation and AI-powered generation.

```mermaid
flowchart LR
    subgraph CourseModule
        CourseController["CourseController"]
        CourseService["CourseService"]
        CourseSSEService["CourseSSEService"]
        TaskDispatcher["Task Dispatcher\n(switch on TaskName)"]
    end

    subgraph Orchestrator["Orchestrator Pipeline"]
        IndexHandler["IndexHandler"]
        ObjectivesHandler["ObjectivesHandler"]
        IntroUnitHandler["IntroUnitHandler"]
        ContentUnitHandler["ContentUnitHandler"]
        ModuleEvalHandler["ModuleEvalHandler"]
        CourseEvalHandler["CourseEvalHandler"]
    end

    CourseController --> TaskDispatcher
    TaskDispatcher --> CourseService
    CourseService --> CourseSSEService
    CourseService --> Orchestrator

    IndexHandler --> ObjectivesHandler
    ObjectivesHandler --> IntroUnitHandler
    IntroUnitHandler --> ContentUnitHandler
    ContentUnitHandler --> ModuleEvalHandler
    ModuleEvalHandler --> CourseEvalHandler
```

| Aspect | Details |
|---|---|
| **Backend** | `src/course/`, `src/course/orchestrator/`, `src/queue/` |
| **Frontend Routes** | `/dashboard` (list), `/project` (create), `/project/[courseKey]` (editor), `/preview/[courseKey]` |
| **DB Models** | `Course`, `CourseStep`, `Component`, `CourseComponent`, `Conversation`, `Message` |
| **API Endpoints** | `POST /course/tasks` (dispatcher), `GET /course` (list), `GET /course/:key`, `GET /course/:key/components`, `SSE /course/:key/events` |
| **Task Names** | `CREATE_COURSE`, `GENERATE_TITLE`, `SET_AUDIENCE`, `SET_OBJECTIVE`, `SET_BUILDING_METHOD`, `SET_MODULES`, `SET_UNITS`, `GET_EXERCISE_TYPES`, `SET_EVALUATION`, `SET_EVALUATION_DETAILS`, `SET_BRANDING`, `GENERATE_COURSE` |

---

## 3. LmsModule

Student-facing learning management system.

```mermaid
flowchart LR
    subgraph LmsModule
        LmsController["LmsController"]
        LmsService["LmsService"]
        AdaptiveService["AdaptiveService"]
    end

    LmsController --> LmsService
    LmsController --> AdaptiveService
```

| Aspect | Details |
|---|---|
| **Backend** | `src/lms/` |
| **Frontend Routes** | `/lms` (dashboard), `/lms/[courseKey]` (player), `/lms/[courseKey]/pre-assessment`, `/lms/[courseKey]/post-assessment`, `/lms/plans/[planId]`, `/lms/achievements`, `/lms/analytics` |
| **DB Models** | `Enrollment`, `CourseUnitProgress`, `KnowledgeCheckAttempt`, `AdaptiveAssessment` |
| **API Endpoints** | `GET /lms/dashboard`, `GET /lms/courses/:key`, `POST /lms/courses/:key/enroll`, `PATCH /lms/courses/:key/progress`, `POST /lms/courses/:key/complete`, `POST /lms/courses/:key/knowledge-check`, `POST /lms/courses/:key/admin-enroll`, `POST /lms/courses/:key/re-enroll/:userId`, `GET /lms/courses/:key/pre-assessment`, `POST /lms/courses/:key/pre-assessment`, `GET /lms/courses/:key/post-assessment`, `POST /lms/courses/:key/post-assessment` |

---

## 4. OrganizationModule

Multi-tenant organization management.

```mermaid
flowchart LR
    subgraph OrganizationModule
        OrgController["OrganizationController"]
        OrgService["OrganizationService"]
    end

    OrgController --> OrgService
```

| Aspect | Details |
|---|---|
| **Backend** | `src/organization/` |
| **Frontend Routes** | `/dashboard/organizations`, `/dashboard/organizations/[key]`, `/dashboard/organizations/[key]/groups`, `/dashboard/organizations/[key]/badges`, `/dashboard/organizations/[key]/learning-plans`, `/dashboard/organizations/[key]/learning-plans/[planId]` |
| **DB Models** | `Organization`, `UserOrganization` |
| **API Endpoints** | `POST /organizations`, `GET /organizations`, `GET /organizations/:key`, `POST /organizations/:key/members`, `PATCH /organizations/:key/members/:userId/role`, `DELETE /organizations/:key/members/:userId` |

---

## 5. GroupModule

Student groups within organizations.

| Aspect | Details |
|---|---|
| **Backend** | `src/group/` |
| **Frontend Routes** | `/dashboard/organizations/[key]/groups` |
| **DB Models** | `Group`, `UserGroup` |

---

## 6. LearningPlanModule

Structured learning paths with ordered courses.

```mermaid
flowchart LR
    subgraph LearningPlanModule
        LPController["LearningPlanController"]
        LPService["LearningPlanService"]
    end

    LPController --> LPService
```

| Aspect | Details |
|---|---|
| **Backend** | `src/learning-plan/` |
| **Frontend Routes** | `/dashboard/learning-plans`, `/dashboard/learning-plans/[planId]`, `/dashboard/organizations/[key]/learning-plans`, `/dashboard/organizations/[key]/learning-plans/[planId]`, `/lms/plans/[planId]` |
| **DB Models** | `LearningPlan`, `LearningPlanCourse`, `UserLearningPlan` |

---

## 7. BadgeModule

Gamification badges and achievements.

```mermaid
flowchart LR
    subgraph BadgeModule
        BadgeController["BadgeController"]
        BadgeService["BadgeService"]
    end

    BadgeController --> BadgeService
    BadgeService -->|"badge_earned"| NotificationModule
```

| Aspect | Details |
|---|---|
| **Backend** | `src/badge/` |
| **Frontend Routes** | `/dashboard/badges`, `/dashboard/badges/[badgeId]`, `/dashboard/organizations/[key]/badges`, `/lms/achievements` |
| **DB Models** | `Badge`, `UserBadge` |
| **API Endpoints** | `GET /badges/me`, `GET /badges/my`, `GET /badges/org/:orgKey`, `GET /badges/:id`, `POST /badges/org/:orgKey`, `PATCH /badges/:id`, `DELETE /badges/:id`, `POST /badges/:id/duplicate`, `POST /badges/:id/award` |
| **Badge Types** | `progress`, `level`, `excellence`, `role` |

---

## 8. AnalyticsModule

Metrics and analytics for courses, organizations, and students.

```mermaid
flowchart LR
    subgraph AnalyticsModule
        AnalyticsController["AnalyticsController"]
        AnalyticsService["AnalyticsService"]
    end

    AnalyticsController --> AnalyticsService
```

| Aspect | Details |
|---|---|
| **Backend** | `src/analytics/` |
| **Frontend Routes** | `/dashboard/analytics`, `/dashboard/analytics/[courseKey]`, `/lms/analytics` |
| **API Endpoints** | `GET /analytics/course/:key`, `GET /analytics/course/:key/users`, `GET /analytics/org/:orgKey`, `GET /analytics/me` |

---

## 9. PortfolioModule

Public-facing user portfolio.

```mermaid
flowchart LR
    subgraph PortfolioModule
        PortfolioController["PortfolioController"]
        PortfolioService["PortfolioService"]
    end

    PortfolioController --> PortfolioService
```

| Aspect | Details |
|---|---|
| **Backend** | `src/portfolio/` |
| **Frontend Routes** | `/dashboard/portfolio` (settings), `/p/[username]` (public), `/p/[username]/[courseKey]` (public course view) |
| **DB Models** | `Portfolio`, `PortfolioImage`, `PortfolioVideo`, `PortfolioVisit`, `PortfolioContactMessage`, `PortfolioCourse` |

---

## 10. NotificationModule

In-app notification system.

| Aspect | Details |
|---|---|
| **Backend** | `src/notification/` |
| **Frontend** | `NotificationBell` component in dashboard navbar |
| **DB Models** | `Notification` |
| **Notification Types** | `enrolled`, `learning_plan_assigned`, `course_completed`, `course_failed`, `badge_earned`, `invitation` |

---

## 11. ConversationModule

AI chat conversations during course creation.

| Aspect | Details |
|---|---|
| **Backend** | `src/conversation/` |
| **DB Models** | `Conversation`, `Message` |
| **Message Roles** | `user`, `assistant`, `system` |

---

## Frontend Route Map

```mermaid
flowchart TD
    subgraph PublicRoutes["Public (No Auth)"]
        R_landing["/ Landing"]
        R_login["/login"]
        R_blog["/blog"]
        R_about["/about"]
        R_careers["/careers"]
        R_compare["/compare-plans"]
        R_legal["/terms /privacy /cookies /gdpr"]
        R_portfolio_pub["/p/:username"]
        R_portfolio_course["/p/:username/:courseKey"]
    end

    subgraph DashboardRoutes["Creator Dashboard"]
        R_dashboard["/dashboard"]
        R_orgs["/dashboard/organizations"]
        R_org_detail["/dashboard/organizations/:key"]
        R_org_groups["/dashboard/organizations/:key/groups"]
        R_org_badges["/dashboard/organizations/:key/badges"]
        R_org_plans["/dashboard/organizations/:key/learning-plans"]
        R_org_plan_detail["/dashboard/organizations/:key/learning-plans/:planId"]
        R_plans["/dashboard/learning-plans"]
        R_plan_detail["/dashboard/learning-plans/:planId"]
        R_badges["/dashboard/badges"]
        R_badge_detail["/dashboard/badges/:badgeId"]
        R_analytics["/dashboard/analytics"]
        R_analytics_course["/dashboard/analytics/:courseKey"]
        R_portfolio_settings["/dashboard/portfolio"]
        R_account["/dashboard/account"]
    end

    subgraph EditorRoutes["Course Editor"]
        R_new_project["/project"]
        R_editor["/project/:courseKey"]
        R_preview["/preview/:courseKey"]
    end

    subgraph LmsRoutes["Student LMS"]
        R_lms["/lms"]
        R_lms_course["/lms/:courseKey"]
        R_lms_pre["/lms/:courseKey/pre-assessment"]
        R_lms_post["/lms/:courseKey/post-assessment"]
        R_lms_plan["/lms/plans/:planId"]
        R_lms_achievements["/lms/achievements"]
        R_lms_analytics["/lms/analytics"]
    end
```
