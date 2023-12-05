/*
  Warnings:

  - You are about to drop the column `location` on the `CarWash` table. All the data in the column will be lost.
  - Added the required column `landmark` to the `CarWash` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CarWash" DROP COLUMN "location",
ADD COLUMN     "bookingLeadTime" TIMESTAMP(3),
ADD COLUMN     "landmark" TEXT NOT NULL,
ALTER COLUMN "branch" SET DEFAULT 'main';

-- AlterTable
ALTER TABLE "CarWashService" ADD COLUMN     "bookingAvailability" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "duration" TEXT;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "bookingId" TEXT,
ADD COLUMN     "duration" TEXT;

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "carWashId" TEXT NOT NULL,
    "carTypeId" TEXT NOT NULL,
    "bookingDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "totalCost" DOUBLE PRECISION,
    "paymentStatus" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_phoneNumber_key" ON "Customer"("phoneNumber");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_carWashId_fkey" FOREIGN KEY ("carWashId") REFERENCES "CarWash"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_carTypeId_fkey" FOREIGN KEY ("carTypeId") REFERENCES "CarType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
