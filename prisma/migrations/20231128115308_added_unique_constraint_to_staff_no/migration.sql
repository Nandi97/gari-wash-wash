/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `Staff` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[staffNo]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "emailVerified";

-- CreateIndex
CREATE UNIQUE INDEX "Staff_staffNo_key" ON "Staff"("staffNo");
