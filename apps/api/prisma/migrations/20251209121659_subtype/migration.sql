-- CreateEnum
CREATE TYPE "component_subtype" AS ENUM ('content', 'exercise', 'navigation');

-- AlterTable
ALTER TABLE "components" ADD COLUMN     "subtype" "component_subtype" NOT NULL DEFAULT 'content';
