/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `CarWash` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[path]` on the table `CarWash` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CarWash" ADD COLUMN     "branch" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" TEXT,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "CarWash_name_key" ON "CarWash"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CarWash_path_key" ON "CarWash"("path");
