/*
  Warnings:

  - The `status` column on the `Booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `paymentStatus` column on the `Booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `bookingLeadTime` column on the `CarWash` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `duration` column on the `CarWashService` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `duration` on the `Service` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "status",
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "paymentStatus",
ADD COLUMN     "paymentStatus" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "CarWash" DROP COLUMN "bookingLeadTime",
ADD COLUMN     "bookingLeadTime" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "CarWashService" DROP COLUMN "duration",
ADD COLUMN     "duration" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "duration";
