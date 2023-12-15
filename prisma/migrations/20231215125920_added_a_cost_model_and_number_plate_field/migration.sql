/*
  Warnings:

  - You are about to drop the column `cost` on the `CarWashService` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CarWashService" DROP COLUMN "cost";

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "numberPlate" TEXT;

-- CreateTable
CREATE TABLE "CarTypeCost" (
    "id" TEXT NOT NULL,
    "carTypeId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "carWashServiceId" TEXT,

    CONSTRAINT "CarTypeCost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CarTypeCost" ADD CONSTRAINT "CarTypeCost_carTypeId_fkey" FOREIGN KEY ("carTypeId") REFERENCES "CarType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarTypeCost" ADD CONSTRAINT "CarTypeCost_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarTypeCost" ADD CONSTRAINT "CarTypeCost_carWashServiceId_fkey" FOREIGN KEY ("carWashServiceId") REFERENCES "CarWashService"("id") ON DELETE SET NULL ON UPDATE CASCADE;
