-- CreateTable
CREATE TABLE "components" (
    "id" SERIAL NOT NULL,
    "key" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "properties" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "components_pkey" PRIMARY KEY ("id")
);
