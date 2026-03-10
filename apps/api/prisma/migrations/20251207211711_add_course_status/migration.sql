-- CreateEnum
CREATE TYPE "course_status" AS ENUM ('draft', 'generating', 'completed', 'failed');

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "status" "course_status" NOT NULL DEFAULT 'draft';
