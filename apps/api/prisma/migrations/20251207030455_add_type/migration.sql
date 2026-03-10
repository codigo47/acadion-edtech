-- CreateEnum
CREATE TYPE "component_type" AS ENUM ('static', 'interactive', 'evaluation');

-- AlterTable
ALTER TABLE "components" ADD COLUMN     "type" "component_type" NOT NULL DEFAULT 'static';
