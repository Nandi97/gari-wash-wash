/*
  Warnings:

  - You are about to drop the column `carWashServiceId` on the `CarType` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CarType" DROP CONSTRAINT "CarType_carWashServiceId_fkey";

-- AlterTable
ALTER TABLE "CarType" DROP COLUMN "carWashServiceId";

-- CreateTable
CREATE TABLE "_CarTypeToCarWashService" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CarTypeToCarWashService_AB_unique" ON "_CarTypeToCarWashService"("A", "B");

-- CreateIndex
CREATE INDEX "_CarTypeToCarWashService_B_index" ON "_CarTypeToCarWashService"("B");

-- AddForeignKey
ALTER TABLE "_CarTypeToCarWashService" ADD CONSTRAINT "_CarTypeToCarWashService_A_fkey" FOREIGN KEY ("A") REFERENCES "CarType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarTypeToCarWashService" ADD CONSTRAINT "_CarTypeToCarWashService_B_fkey" FOREIGN KEY ("B") REFERENCES "CarWashService"("id") ON DELETE CASCADE ON UPDATE CASCADE;
