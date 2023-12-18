/*
  Warnings:

  - You are about to drop the column `numberPlate` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "numberPlate";

-- CreateTable
CREATE TABLE "CustomerCarDetails" (
    "id" TEXT NOT NULL,
    "numberPlate" TEXT,
    "carTypeId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "customerId" TEXT,

    CONSTRAINT "CustomerCarDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CustomerCarDetails" ADD CONSTRAINT "CustomerCarDetails_carTypeId_fkey" FOREIGN KEY ("carTypeId") REFERENCES "CarType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerCarDetails" ADD CONSTRAINT "CustomerCarDetails_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
