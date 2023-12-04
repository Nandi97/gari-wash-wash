/*
  Warnings:

  - You are about to drop the column `mapsLink` on the `CarWash` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CarWash" DROP COLUMN "mapsLink",
ADD COLUMN     "lat" DOUBLE PRECISION,
ADD COLUMN     "long" DOUBLE PRECISION;
