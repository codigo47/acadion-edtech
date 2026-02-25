-- CreateEnum
CREATE TYPE "org_role" AS ENUM ('super_admin', 'org_admin', 'editor', 'viewer', 'commenter', 'student');

-- CreateEnum
CREATE TYPE "badge_type" AS ENUM ('progress', 'level', 'excellence', 'role');

-- CreateEnum
CREATE TYPE "notification_type" AS ENUM ('enrolled', 'learning_plan_assigned', 'course_completed', 'course_failed', 'badge_earned', 'invitation');

-- AlterTable users: add username
ALTER TABLE "users" ADD COLUMN "username" TEXT;
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AlterTable users_organizations: add role
ALTER TABLE "users_organizations" ADD COLUMN "role" "org_role" NOT NULL DEFAULT 'student';

-- CreateTable groups
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "key" UUID NOT NULL DEFAULT gen_random_uuid(),
    "org_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable users_groups
CREATE TABLE "users_groups" (
    "user_id" UUID NOT NULL,
    "group_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_groups_pkey" PRIMARY KEY ("user_id","group_id")
);

-- CreateTable learning_plans
CREATE TABLE "learning_plans" (
    "id" SERIAL NOT NULL,
    "key" UUID NOT NULL DEFAULT gen_random_uuid(),
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

-- CreateTable learning_plan_courses
CREATE TABLE "learning_plan_courses" (
    "learning_plan_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "required" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "learning_plan_courses_pkey" PRIMARY KEY ("learning_plan_id","course_id")
);

-- CreateTable users_learning_plans
CREATE TABLE "users_learning_plans" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "learning_plan_id" INTEGER NOT NULL,
    "enrolled_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadline" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    CONSTRAINT "users_learning_plans_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "users_learning_plans_user_id_learning_plan_id_key" ON "users_learning_plans"("user_id", "learning_plan_id");

-- CreateTable enrollments
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

CREATE UNIQUE INDEX "enrollments_user_id_course_id_key" ON "enrollments"("user_id", "course_id");

-- CreateTable badges
CREATE TABLE "badges" (
    "id" SERIAL NOT NULL,
    "key" UUID NOT NULL DEFAULT gen_random_uuid(),
    "org_id" INTEGER,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "type" "badge_type" NOT NULL,
    "condition_type" TEXT NOT NULL,
    "condition_value" JSONB,
    "target_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "badges_pkey" PRIMARY KEY ("id")
);

-- CreateTable users_badges
CREATE TABLE "users_badges" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "badge_id" INTEGER NOT NULL,
    "earned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_badges_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "users_badges_user_id_badge_id_key" ON "users_badges"("user_id", "badge_id");

-- CreateTable notifications
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "type" "notification_type" NOT NULL,
    "data" JSONB NOT NULL,
    "read_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable portfolios
CREATE TABLE "portfolios" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "title" TEXT,
    "bio" TEXT,
    "is_public" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "portfolios_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "portfolios_user_id_key" ON "portfolios"("user_id");

-- CreateTable portfolio_courses
CREATE TABLE "portfolio_courses" (
    "portfolio_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "portfolio_courses_pkey" PRIMARY KEY ("portfolio_id","course_id")
);

-- AddForeignKey groups -> organizations
ALTER TABLE "groups" ADD CONSTRAINT "groups_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey users_groups -> users
ALTER TABLE "users_groups" ADD CONSTRAINT "users_groups_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey users_groups -> groups
ALTER TABLE "users_groups" ADD CONSTRAINT "users_groups_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey learning_plans -> organizations
ALTER TABLE "learning_plans" ADD CONSTRAINT "learning_plans_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey learning_plans -> learning_plans (self)
ALTER TABLE "learning_plans" ADD CONSTRAINT "learning_plans_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "learning_plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey learning_plan_courses -> learning_plans
ALTER TABLE "learning_plan_courses" ADD CONSTRAINT "learning_plan_courses_learning_plan_id_fkey" FOREIGN KEY ("learning_plan_id") REFERENCES "learning_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey learning_plan_courses -> courses
ALTER TABLE "learning_plan_courses" ADD CONSTRAINT "learning_plan_courses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey users_learning_plans -> users
ALTER TABLE "users_learning_plans" ADD CONSTRAINT "users_learning_plans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey users_learning_plans -> learning_plans
ALTER TABLE "users_learning_plans" ADD CONSTRAINT "users_learning_plans_learning_plan_id_fkey" FOREIGN KEY ("learning_plan_id") REFERENCES "learning_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey enrollments -> users
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey enrollments -> courses
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey badges -> organizations
ALTER TABLE "badges" ADD CONSTRAINT "badges_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey users_badges -> users
ALTER TABLE "users_badges" ADD CONSTRAINT "users_badges_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey users_badges -> badges
ALTER TABLE "users_badges" ADD CONSTRAINT "users_badges_badge_id_fkey" FOREIGN KEY ("badge_id") REFERENCES "badges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey notifications -> users
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey portfolios -> users
ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey portfolio_courses -> portfolios
ALTER TABLE "portfolio_courses" ADD CONSTRAINT "portfolio_courses_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "portfolios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey portfolio_courses -> courses
ALTER TABLE "portfolio_courses" ADD CONSTRAINT "portfolio_courses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
