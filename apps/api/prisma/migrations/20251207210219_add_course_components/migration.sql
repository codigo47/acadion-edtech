-- CreateTable
CREATE TABLE "course_components" (
    "id" SERIAL NOT NULL,
    "course_id" INTEGER NOT NULL,
    "component_id" INTEGER NOT NULL,
    "module" INTEGER NOT NULL,
    "unit" INTEGER NOT NULL,
    "sequence" INTEGER NOT NULL,
    "data" JSONB,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "course_components_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "course_components" ADD CONSTRAINT "course_components_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_components" ADD CONSTRAINT "course_components_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "components"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_components" ADD CONSTRAINT "course_components_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
