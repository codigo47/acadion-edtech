# User Journeys

> Documents the user roles, journeys, and navigation flows for **acadion.ai**.

The platform serves two primary user roles -- **Creator/Instructor** and **Student/Learner** -- each with distinct dashboards and workflows. This document provides an overview and links to detailed diagrams.

---

## Detailed Diagrams

Each sub-diagram is maintained in its own file for readability:

| File | Description |
|---|---|
| [03a-user-roles.md](./03a-user-roles.md) | Route map organized by user role (Visitor, Creator, Student) |
| [03b-creator-journey.md](./03b-creator-journey.md) | Mermaid journey chart for the Creator/Instructor experience |
| [03c-creator-flow.md](./03c-creator-flow.md) | Detailed flowchart of the Creator workflow and navigation |
| [03d-student-journey.md](./03d-student-journey.md) | Mermaid journey chart for the Student/Learner experience |
| [03e-student-flow.md](./03e-student-flow.md) | Detailed flowchart of the Student workflow and navigation |
| [03f-auth-flow.md](./03f-auth-flow.md) | Authentication flowchart (login, register, OAuth, token lifecycle) |
| [03g-navigation-map.md](./03g-navigation-map.md) | Complete navigation map across all application areas |

---

## User Roles Overview

```mermaid
flowchart TB
    subgraph Roles["acadion.ai User Roles"]
        direction LR
        Visitor["Visitor\n(Unauthenticated)"]
        Creator["Creator / Instructor"]
        Student["Student / Learner"]
    end

    Visitor -->|Register / Login| Creator
    Visitor -->|Register / Login| Student
    Creator <-->|"Role switch"| Student

    subgraph VisitorAccess["Visitor Access"]
        Landing["/ Landing"]
        Login["/login"]
        Blog["/blog"]
        About["/about"]
        Legal["/terms, /privacy, /cookies, /gdpr"]
        PublicPortfolio["/p/:username Public Portfolio"]
    end

    subgraph CreatorAccess["Creator Access"]
        Dashboard["/dashboard -- My Courses"]
        Editor["/project/:courseKey -- Course Editor"]
        Orgs["/dashboard/organizations"]
        Plans["/dashboard/learning-plans"]
        Badges["/dashboard/badges"]
        Analytics["/dashboard/analytics"]
        Portfolio["/dashboard/portfolio"]
    end

    subgraph StudentAccess["Student Access"]
        LMS["/lms -- Student Dashboard"]
        CoursePlayer["/lms/:courseKey -- Course Player"]
        Achievements["/lms/achievements"]
        StudentAnalytics["/lms/analytics"]
    end

    Visitor --> VisitorAccess
    Creator --> CreatorAccess
    Student --> StudentAccess
```

---

## Organization Roles

Within an organization, users are assigned one of the following roles (cumulative permissions):

```mermaid
flowchart LR
    super_admin["super_admin\n(Full control)"]
    org_admin["org_admin\n(Manage members, settings)"]
    editor["editor\n(Edit courses)"]
    commenter["commenter\n(Comment on courses)"]
    viewer["viewer\n(View courses)"]
    student["student\n(Take courses)"]

    super_admin --> org_admin --> editor --> commenter --> viewer --> student
```

---

## High-Level Creator Journey

```mermaid
journey
    title Creator / Instructor Journey
    section Authentication
      Visit landing page: 3: Visitor
      Navigate to login: 3: Visitor
      Sign in (email or Google): 5: Creator
      First-time onboarding (create org): 4: Creator
    section Course Creation
      View course dashboard: 5: Creator
      Click New Project: 5: Creator
      Conversational AI flow (topic, audience, objectives): 5: Creator
      Configure modules, units, evaluation, branding: 4: Creator
      Trigger AI generation (SSE progress): 5: Creator
    section Organization Management
      Create organizations: 4: Creator
      Invite members and assign roles: 4: Creator
      Create student groups: 4: Creator
    section Badges and Learning Plans
      Create achievement badges: 5: Creator
      Create learning plans with ordered courses: 5: Creator
      Assign plans to students or groups: 4: Creator
    section Analytics and Portfolio
      View org-level and course-level analytics: 5: Creator
      Configure public portfolio: 5: Creator
```

---

## High-Level Student Journey

```mermaid
journey
    title Student / Learner Journey
    section Authentication
      Visit login page: 3: Student
      Sign in (email or Google): 5: Student
    section LMS Dashboard
      View enrolled courses: 5: Student
      See learning plans with progress: 5: Student
    section Taking a Course
      Complete pre-assessment: 4: Student
      Navigate units and read content: 5: Student
      Complete post-assessment: 4: Student
      View score and pass/fail: 5: Student
    section Achievements
      View earned badges: 5: Student
      View locked badges with hints: 4: Student
      View personal analytics: 5: Student
```
