```mermaid
flowchart LR
    subgraph Public["Public Pages (No Auth)"]
        Landing["/ Landing"]
        LoginPage["/login"]
        AuthCallback["/auth/callback"]
        Onboarding["/onboarding"]
        BlogList["/blog"]
        BlogPost["/blog/:slug"]
        About["/about"]
        Careers["/careers"]
        ComparePlans["/compare-plans"]
        Terms["/terms"]
        Privacy["/privacy"]
        Cookies["/cookies"]
        GDPR["/gdpr"]
        Mock["/mock"]
        PublicPortfolio["/p/:username"]
        PublicCourse["/p/:username/:courseKey"]
    end

    subgraph Auth["Authentication"]
        LoginPage -->|Email/Password| DashboardHome
        LoginPage -->|Google| AuthCallback
        AuthCallback --> DashboardHome
        AuthCallback -->|First time| Onboarding
        Onboarding --> DashboardHome
    end

    subgraph Dashboard["Creator Dashboard (/dashboard/*)"]
        DashboardHome["/dashboard\nMy Courses"]
        OrgsPage["/dashboard/organizations"]
        OrgDetailPage["/dashboard/organizations/:key"]
        OrgGroupsPage["/dashboard/organizations/:key/groups"]
        OrgBadgesPage["/dashboard/organizations/:key/badges"]
        OrgPlansPage["/dashboard/organizations/:key/learning-plans"]
        OrgPlanDetailPage["/dashboard/organizations/:key/\nlearning-plans/:planId"]
        PlansPage["/dashboard/learning-plans"]
        PlanDetailPage["/dashboard/learning-plans/:planId"]
        BadgesMainPage["/dashboard/badges"]
        BadgeDetailPage["/dashboard/badges/:badgeId"]
        AnalyticsMain["/dashboard/analytics"]
        CourseAnalyticsPage["/dashboard/analytics/:courseKey"]
        PortfolioSettings["/dashboard/portfolio"]
        AccountSettings["/dashboard/account"]
    end

    subgraph ProjectEditor["Course Editor (/project/*)"]
        NewProject["/project\nCreate & redirect"]
        ProjectPage["/project/:courseKey\nAI Chat + Editor"]
        PreviewPage["/preview/:courseKey\nCourse Preview"]
    end

    subgraph LMS["Student LMS (/lms/*)"]
        LMSHome["/lms\nStudent Dashboard"]
        CoursePlayerPage["/lms/:courseKey\nCourse Player"]
        PreAssessPage["/lms/:courseKey/pre-assessment"]
        PostAssessPage["/lms/:courseKey/post-assessment"]
        StudentPlanPage["/lms/plans/:planId"]
        AchievementsPage["/lms/achievements"]
        StudentAnalyticsPage["/lms/analytics"]
    end

    %% Landing connections
    Landing -->|"Get Started / Login"| LoginPage

    %% Dashboard sidebar navigation
    DashboardHome <-->|sidebar| OrgsPage
    DashboardHome <-->|sidebar| PlansPage
    DashboardHome <-->|sidebar| BadgesMainPage
    DashboardHome <-->|sidebar| AnalyticsMain
    DashboardHome <-->|sidebar| PortfolioSettings
    DashboardHome <-->|sidebar| AccountSettings

    %% Dashboard to Project Editor
    DashboardHome -->|"New Project"| NewProject
    NewProject --> ProjectPage
    DashboardHome -->|"Click course"| ProjectPage
    ProjectPage -->|"Preview"| PreviewPage
    PreviewPage -->|"Back to Editor"| ProjectPage

    %% Organization drilldowns
    OrgsPage -->|"Manage"| OrgDetailPage
    OrgDetailPage --> OrgGroupsPage
    OrgDetailPage --> OrgBadgesPage
    OrgDetailPage --> OrgPlansPage
    OrgPlansPage --> OrgPlanDetailPage

    %% Plans and Badges drilldowns
    PlansPage -->|"View"| PlanDetailPage
    BadgesMainPage -->|"View"| BadgeDetailPage
    BadgesMainPage -->|"Create"| BadgeDetailPage

    %% Analytics drilldown
    AnalyticsMain -->|"Click course"| CourseAnalyticsPage

    %% Portfolio to public
    PortfolioSettings -->|"View Portfolio"| PublicPortfolio
    PublicPortfolio --> PublicCourse

    %% Cross-area navigation
    DashboardHome <-->|"role switch"| LMSHome

    %% LMS sidebar navigation
    LMSHome <-->|sidebar| AchievementsPage
    LMSHome <-->|sidebar| StudentAnalyticsPage

    %% LMS course flow
    LMSHome -->|"Click course"| CoursePlayerPage
    LMSHome -->|"Click plan"| StudentPlanPage
    StudentPlanPage -->|"Click course"| CoursePlayerPage
    CoursePlayerPage -->|"Pre-assessment"| PreAssessPage
    PreAssessPage --> CoursePlayerPage
    CoursePlayerPage -->|"Post-assessment"| PostAssessPage
    PostAssessPage --> CoursePlayerPage

    %% Account access from LMS
    LMSHome -->|"User menu"| AccountSettings
```