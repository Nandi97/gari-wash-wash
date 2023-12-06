/*
  Warnings:

  - You are about to drop the column `carTypeId` on the `CarWashService` table. All the data in the column will be lost.
  - You are about to drop the `_CarTypeToCarWashService` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CarTypeToCarWashService" DROP CONSTRAINT "_CarTypeToCarWashService_A_fkey";

-- DropForeignKey
ALTER TABLE "_CarTypeToCarWashService" DROP CONSTRAINT "_CarTypeToCarWashService_B_fkey";

-- AlterTable
ALTER TABLE "CarType" ADD COLUMN     "carWashServiceId" TEXT;

-- AlterTable
ALTER TABLE "CarWashService" DROP COLUMN "carTypeId";

-- DropTable
DROP TABLE "_CarTypeToCarWashService";

-- AddForeignKey
ALTER TABLE "CarType" ADD CONSTRAINT "CarType_carWashServiceId_fkey" FOREIGN KEY ("carWashServiceId") REFERENCES "CarWashService"("id") ON DELETE SET NULL ON UPDATE CASCADE;
