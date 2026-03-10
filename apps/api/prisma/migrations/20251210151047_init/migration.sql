/*
  Warnings:

  - The values [generating_title,generating_content,generating_course,generating_image,generating_evaluation,calling_third_party] on the enum `step_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "component_type" ADD VALUE 'evaluation';

-- AlterEnum
BEGIN;
CREATE TYPE "step_type_new" AS ENUM ('generating_index', 'generating_objectives', 'generating_intro_unit', 'generating_content_unit', 'generating_module_evaluation', 'generating_course_evaluation');
ALTER TABLE "course_steps" ALTER COLUMN "type" TYPE "step_type_new" USING ("type"::text::"step_type_new");
ALTER TYPE "step_type" RENAME TO "step_type_old";
ALTER TYPE "step_type_new" RENAME TO "step_type";
DROP TYPE "public"."step_type_old";
COMMIT;

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "completed_at" TIMESTAMP(3);
