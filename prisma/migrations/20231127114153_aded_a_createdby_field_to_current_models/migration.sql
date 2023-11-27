-- AlterTable
ALTER TABLE "CarWash" ADD COLUMN     "createdById" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdById" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarWash" ADD CONSTRAINT "CarWash_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
