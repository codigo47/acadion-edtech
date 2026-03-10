/*
  Warnings:

  - You are about to drop the column `data` on the `courses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "courses" DROP COLUMN "data",
ADD COLUMN     "input" JSONB,
ADD COLUMN     "output" JSONB;
