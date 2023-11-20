/*
  Warnings:

  - Added the required column `logo` to the `CarWash` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `CarWash` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CarWash" ADD COLUMN     "logo" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roleId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
