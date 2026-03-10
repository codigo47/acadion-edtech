/*
  Warnings:

  - You are about to drop the column `content` on the `course_steps` table. All the data in the column will be lost.
  - You are about to drop the column `index` on the `course_steps` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `course_steps` table. All the data in the column will be lost.
  - Added the required column `type` to the `course_steps` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "step_type" AS ENUM ('generating_title', 'generating_index', 'generating_content', 'generating_image', 'calling_third_party');

-- AlterTable
ALTER TABLE "course_steps" DROP COLUMN "content",
DROP COLUMN "index",
DROP COLUMN "title",
ADD COLUMN     "type" "step_type" NOT NULL;

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "topic" TEXT,
ALTER COLUMN "title" DROP NOT NULL;
