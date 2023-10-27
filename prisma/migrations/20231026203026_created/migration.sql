/*
  Warnings:

  - You are about to drop the column `services` on the `CarWash` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CarWash" DROP COLUMN "services";

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarWashService" (
    "id" TEXT NOT NULL,
    "carWashId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "CarWashService_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CarWashService" ADD CONSTRAINT "CarWashService_carWashId_fkey" FOREIGN KEY ("carWashId") REFERENCES "CarWash"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarWashService" ADD CONSTRAINT "CarWashService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
