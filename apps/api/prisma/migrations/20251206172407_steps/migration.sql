-- CreateEnum
CREATE TYPE "step_status" AS ENUM ('pending', 'running', 'completed', 'failed');

-- CreateTable
CREATE TABLE "course_steps" (
    "id" SERIAL NOT NULL,
    "course_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "content" TEXT,
    "status" "step_status" NOT NULL DEFAULT 'pending',
    "payload" JSONB,
    "error" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "course_steps_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "course_steps" ADD CONSTRAINT "course_steps_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
