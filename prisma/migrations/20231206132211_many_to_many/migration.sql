/*
  Warnings:

  - Added the required column `bookingTime` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CarWashService" DROP CONSTRAINT "CarWashService_carTypeId_fkey";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "bookingTime" TIMESTAMP(3) NOT NULL;

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
