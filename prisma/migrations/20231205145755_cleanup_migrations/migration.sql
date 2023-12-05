/*
  Warnings:

  - You are about to drop the column `firstName` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `bookingId` on the `Service` table. All the data in the column will be lost.
  - Added the required column `name` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_bookingId_fkey";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "bookingId";

-- CreateTable
CREATE TABLE "BookingService" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "BookingService_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookingService" ADD CONSTRAINT "BookingService_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingService" ADD CONSTRAINT "BookingService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "CarWashService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
