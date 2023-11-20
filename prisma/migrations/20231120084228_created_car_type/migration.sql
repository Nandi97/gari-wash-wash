/*
  Warnings:

  - Added the required column `carTypeId` to the `CarWashService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CarWashService" ADD COLUMN     "carTypeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CarType" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "CarType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CarWashService" ADD CONSTRAINT "CarWashService_carTypeId_fkey" FOREIGN KEY ("carTypeId") REFERENCES "CarType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
