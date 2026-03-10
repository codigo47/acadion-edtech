/*
  Warnings:

  - You are about to alter the column `sequence` on the `messages` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterEnum
ALTER TYPE "step_type" ADD VALUE 'generating_evaluation';

-- AlterTable
ALTER TABLE "messages" ALTER COLUMN "sequence" SET DEFAULT 0,
ALTER COLUMN "sequence" DROP DEFAULT,
ALTER COLUMN "sequence" SET DATA TYPE INTEGER;
DROP SEQUENCE "messages_sequence_seq";
