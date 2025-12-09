/*
  Warnings:

  - The values [evaluation] on the enum `component_type` will be removed. If these variants are still used in the database, this will fail.
  - The values [generating_unit] on the enum `step_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "component_type_new" AS ENUM ('static', 'interactive');
ALTER TABLE "public"."components" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "components" ALTER COLUMN "type" TYPE "component_type_new" USING ("type"::text::"component_type_new");
ALTER TYPE "component_type" RENAME TO "component_type_old";
ALTER TYPE "component_type_new" RENAME TO "component_type";
DROP TYPE "public"."component_type_old";
ALTER TABLE "components" ALTER COLUMN "type" SET DEFAULT 'static';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "step_type_new" AS ENUM ('generating_title', 'generating_objectives', 'generating_index', 'generating_content', 'generating_course', 'generating_intro_unit', 'generating_content_unit', 'generating_module_evaluation', 'generating_course_evaluation', 'generating_image', 'generating_evaluation', 'calling_third_party');
ALTER TABLE "course_steps" ALTER COLUMN "type" TYPE "step_type_new" USING ("type"::text::"step_type_new");
ALTER TYPE "step_type" RENAME TO "step_type_old";
ALTER TYPE "step_type_new" RENAME TO "step_type";
DROP TYPE "public"."step_type_old";
COMMIT;
