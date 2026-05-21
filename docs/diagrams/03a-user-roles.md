```mermaid
flowchart TB
    subgraph Visitor["Visitor (Unauthenticated)"]
        Landing["/  Landing Page"]
        Login["/login  Login / Register"]
        Blog["/blog  Blog"]
        Legal["/terms, /privacy,\n/cookies, /gdpr"]
        About["/about  About"]
        Careers["/careers  Careers"]
        ComparePlans["/compare-plans"]
        PublicPortfolio["/p/:username  Public Portfolio"]
        PublicCourse["/p/:username/:courseKey\nPublic Course View"]
    end

    subgraph Creator["Creator / Instructor"]
        Dashboard["/dashboard  My Courses"]
        ProjectEditor["/project/:courseKey\nCourse Editor + AI Chat"]
        Preview["/preview/:courseKey\nCourse Preview"]
        NewProject["/project  Create New Course"]
        Organizations["/dashboard/organizations"]
        OrgDetail["/dashboard/organizations/:key\nManage Members"]
        OrgGroups["/dashboard/organizations/:key/groups\nStudent Groups"]
        OrgBadges["/dashboard/organizations/:key/badges"]
        OrgPlans["/dashboard/organizations/:key/learning-plans"]
        OrgPlanDetail["/dashboard/organizations/:key/\nlearning-plans/:planId"]
        LearningPlans["/dashboard/learning-plans"]
        PlanDetail["/dashboard/learning-plans/:planId"]
        Badges["/dashboard/badges"]
        BadgeDetail["/dashboard/badges/:badgeId"]
        Analytics["/dashboard/analytics"]
        CourseAnalytics["/dashboard/analytics/:courseKey"]
        Portfolio["/dashboard/portfolio"]
        Account["/dashboard/account"]
    end

    subgraph Student["Student / Learner"]
        LMS["/lms  My Enrolled Courses"]
        CoursePlayer["/lms/:courseKey\nCourse Player"]
        PreAssessment["/lms/:courseKey/pre-assessment"]
        PostAssessment["/lms/:courseKey/post-assessment"]
        Achievements["/lms/achievements\nBadges Earned & Locked"]
        StudentAnalytics["/lms/analytics\nLearning Progress"]
        StudentPlan["/lms/plans/:planId\nLearning Plan Progress"]
    end

    Login -->|Authenticate| Dashboard
    Login -->|Authenticate| LMS
    Dashboard <-->|"Creator Dashboard" link| LMS
```