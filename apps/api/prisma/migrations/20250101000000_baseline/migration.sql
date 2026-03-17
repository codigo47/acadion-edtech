-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "component_type" AS ENUM ('static', 'interactive', 'evaluation');

-- CreateEnum
CREATE TYPE "component_subtype" AS ENUM ('content', 'exercise', 'navigation');

-- CreateEnum
CREATE TYPE "course_status" AS ENUM ('draft', 'generating', 'completed', 'failed');

-- CreateEnum
CREATE TYPE "step_status" AS ENUM ('pending', 'running', 'completed', 'failed');

-- CreateEnum
CREATE TYPE "step_type" AS ENUM ('generating_index', 'generating_objectives', 'generating_intro_unit', 'generating_content_unit', 'generating_module_evaluation', 'generating_course_evaluation');

-- CreateEnum
CREATE TYPE "message_role" AS ENUM ('user', 'assistant', 'system');

-- CreateEnum
CREATE TYPE "org_role" AS ENUM ('super_admin', 'org_admin', 'editor', 'viewer', 'commenter', 'student');

-- CreateEnum
CREATE TYPE "badge_type" AS ENUM ('progress', 'level', 'excellence', 'role');

-- CreateEnum
CREATE TYPE "notification_type" AS ENUM ('enrolled', 'learning_plan_assigned', 'course_completed', 'course_failed', 'badge_earned', 'invitation');

-- CreateEnum
CREATE TYPE "assessment_type" AS ENUM ('pre', 'post');

-- CreateEnum
CREATE TYPE "invitation_status" AS ENUM ('pending', 'accepted', 'expired');

-- CreateTable
CREATE TABLE "components" (
    "id" SERIAL NOT NULL,
    "key" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "properties" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" INTEGER NOT NULL DEFAULT 1,
    "internalName" TEXT NOT NULL,
    "type" "component_type" NOT NULL DEFAULT 'static',
    "subtype" "component_subtype" NOT NULL DEFAULT 'content',
    "group_key" TEXT,

    CONSTRAINT "components_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_components" (
    "id" SERIAL NOT NULL,
    "course_id" INTEGER NOT NULL,
    "component_id" INTEGER NOT NULL,
    "module" INTEGER NOT NULL,
    "unit" INTEGER NOT NULL,
    "sequence" INTEGER NOT NULL,
    "data" JSONB,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "course_components_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" SERIAL NOT NULL,
    "key" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_organizations" (
    "user_id" UUID NOT NULL,
    "org_id" INTEGER NOT NULL,
    "role" "org_role" NOT NULL DEFAULT 'student',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_organizations_pkey" PRIMARY KEY ("user_id","org_id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" SERIAL NOT NULL,
    "key" UUID NOT NULL,
    "title" TEXT,
    "org_id" INTEGER,
    "user_id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),
    "input" JSONB,
    "output" JSONB,
    "status" "course_status" NOT NULL DEFAULT 'draft',
    "estimated_minutes" INTEGER,
    "is_adaptive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_steps" (
    "id" SERIAL NOT NULL,
    "course_id" INTEGER NOT NULL,
    "status" "step_status" NOT NULL DEFAULT 'pending',
    "payload" JSONB,
    "error" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "step_type" NOT NULL,
    "completion_tokens" INTEGER,
    "prompt_tokens" INTEGER,

    CONSTRAINT "course_steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversations" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "title" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_archived" BOOLEAN NOT NULL DEFAULT false,
    "course_id" INTEGER,

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" UUID NOT NULL,
    "conversation_id" UUID NOT NULL,
    "role" "message_role" NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sequence" INTEGER NOT NULL DEFAULT 0,
    "model_name" TEXT,
    "tokens_used" INTEGER,
    "metadata" JSONB,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "username" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" UUID NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "key" UUID NOT NULL,
    "org_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_groups" (
    "user_id" UUID NOT NULL,
    "group_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_groups_pkey" PRIMARY KEY ("user_id","group_id")
);

-- CreateTable
CREATE TABLE "learning_plans" (
    "id" SERIAL NOT NULL,
    "key" UUID NOT NULL,
    "org_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "badge_image" TEXT,
    "badge_name" TEXT,
    "estimated_days" INTEGER,
    "is_correlative" BOOLEAN NOT NULL DEFAULT false,
    "is_optional" BOOLEAN NOT NULL DEFAULT false,
    "parent_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "learning_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learning_plan_courses" (
    "learning_plan_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "required" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "learning_plan_courses_pkey" PRIMARY KEY ("learning_plan_id","course_id")
);

-- CreateTable
CREATE TABLE "users_learning_plans" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "learning_plan_id" INTEGER NOT NULL,
    "enrolled_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadline" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "users_learning_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enrollments" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "course_id" INTEGER NOT NULL,
    "enrolled_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "started_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "passed" BOOLEAN,
    "score" DOUBLE PRECISION,
    "attempts" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "enrollments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_unit_progress" (
    "id" SERIAL NOT NULL,
    "enrollment_id" INTEGER NOT NULL,
    "unit_code" TEXT NOT NULL,
    "completed_at" TIMESTAMP(3),
    "time_spent_seconds" INTEGER NOT NULL DEFAULT 0,
    "focus_loss_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "course_unit_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "knowledge_check_attempts" (
    "id" SERIAL NOT NULL,
    "enrollment_id" INTEGER NOT NULL,
    "unit_code" TEXT NOT NULL,
    "question_index" INTEGER NOT NULL,
    "answer" JSONB NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "attempt_number" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "knowledge_check_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adaptive_assessments" (
    "id" SERIAL NOT NULL,
    "enrollment_id" INTEGER NOT NULL,
    "type" "assessment_type" NOT NULL,
    "unit_code" TEXT NOT NULL,
    "confidence_score" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "adaptive_assessments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "badges" (
    "id" SERIAL NOT NULL,
    "key" UUID NOT NULL,
    "org_id" INTEGER,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "type" "badge_type" NOT NULL,
    "condition_type" TEXT NOT NULL,
    "condition_value" JSONB,
    "target_id" INTEGER,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "badges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_badges" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "badge_id" INTEGER NOT NULL,
    "earned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_badges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "type" "notification_type" NOT NULL,
    "data" JSONB NOT NULL,
    "read_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolios" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "title" TEXT,
    "bio" TEXT,
    "tagline" TEXT,
    "portrait_image" TEXT,
    "cover_image" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "theme" TEXT DEFAULT 'corporate_professional',
    "skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "languages" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "social_linkedin" TEXT,
    "social_twitter" TEXT,
    "social_instagram" TEXT,
    "social_custom" JSONB,
    "is_public" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "portfolios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio_images" (
    "id" SERIAL NOT NULL,
    "portfolio_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "portfolio_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio_videos" (
    "id" SERIAL NOT NULL,
    "portfolio_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "portfolio_videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio_visits" (
    "id" SERIAL NOT NULL,
    "portfolio_id" INTEGER NOT NULL,
    "country" TEXT,
    "course_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "portfolio_visits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio_contact_messages" (
    "id" SERIAL NOT NULL,
    "portfolio_id" INTEGER NOT NULL,
    "sender_name" TEXT NOT NULL,
    "sender_email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "portfolio_contact_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio_courses" (
    "portfolio_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "portfolio_courses_pkey" PRIMARY KEY ("portfolio_id","course_id")
);

-- CreateTable
CREATE TABLE "invitations" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "role" "org_role" NOT NULL,
    "org_id" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "status" "invitation_status" NOT NULL DEFAULT 'pending',
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invitations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_slug_key" ON "organizations"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "users_learning_plans_user_id_learning_plan_id_key" ON "users_learning_plans"("user_id", "learning_plan_id");

-- CreateIndex
CREATE UNIQUE INDEX "enrollments_user_id_course_id_key" ON "enrollments"("user_id", "course_id");

-- CreateIndex
CREATE UNIQUE INDEX "course_unit_progress_enrollment_id_unit_code_key" ON "course_unit_progress"("enrollment_id", "unit_code");

-- CreateIndex
CREATE UNIQUE INDEX "users_badges_user_id_badge_id_key" ON "users_badges"("user_id", "badge_id");

-- CreateIndex
CREATE UNIQUE INDEX "portfolios_user_id_key" ON "portfolios"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "invitations_token_key" ON "invitations"("token");

-- AddForeignKey
ALTER TABLE "course_components" ADD CONSTRAINT "course_components_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "components"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_components" ADD CONSTRAINT "course_components_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_components" ADD CONSTRAINT "course_components_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_organizations" ADD CONSTRAINT "users_organizations_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_organizations" ADD CONSTRAINT "users_organizations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_steps" ADD CONSTRAINT "course_steps_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_groups" ADD CONSTRAINT "users_groups_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_groups" ADD CONSTRAINT "users_groups_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_plans" ADD CONSTRAINT "learning_plans_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "learning_plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_plans" ADD CONSTRAINT "learning_plans_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_plan_courses" ADD CONSTRAINT "learning_plan_courses_learning_plan_id_fkey" FOREIGN KEY ("learning_plan_id") REFERENCES "learning_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_plan_courses" ADD CONSTRAINT "learning_plan_courses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_learning_plans" ADD CONSTRAINT "users_learning_plans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_learning_plans" ADD CONSTRAINT "users_learning_plans_learning_plan_id_fkey" FOREIGN KEY ("learning_plan_id") REFERENCES "learning_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_unit_progress" ADD CONSTRAINT "course_unit_progress_enrollment_id_fkey" FOREIGN KEY ("enrollment_id") REFERENCES "enrollments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knowledge_check_attempts" ADD CONSTRAINT "knowledge_check_attempts_enrollment_id_fkey" FOREIGN KEY ("enrollment_id") REFERENCES "enrollments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adaptive_assessments" ADD CONSTRAINT "adaptive_assessments_enrollment_id_fkey" FOREIGN KEY ("enrollment_id") REFERENCES "enrollments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "badges" ADD CONSTRAINT "badges_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_badges" ADD CONSTRAINT "users_badges_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_badges" ADD CONSTRAINT "users_badges_badge_id_fkey" FOREIGN KEY ("badge_id") REFERENCES "badges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio_images" ADD CONSTRAINT "portfolio_images_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "portfolios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio_videos" ADD CONSTRAINT "portfolio_videos_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "portfolios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio_visits" ADD CONSTRAINT "portfolio_visits_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "portfolios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio_contact_messages" ADD CONSTRAINT "portfolio_contact_messages_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "portfolios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio_courses" ADD CONSTRAINT "portfolio_courses_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "portfolios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio_courses" ADD CONSTRAINT "portfolio_courses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

