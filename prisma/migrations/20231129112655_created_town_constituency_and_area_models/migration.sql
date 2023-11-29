-- AlterTable
ALTER TABLE "CarWash" ADD COLUMN     "areaId" TEXT;

-- CreateTable
CREATE TABLE "Town" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Town_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Constituency" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "townId" TEXT,

    CONSTRAINT "Constituency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Area" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "constituencyId" TEXT,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Town_name_key" ON "Town"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Constituency_name_key" ON "Constituency"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Area_name_key" ON "Area"("name");

-- AddForeignKey
ALTER TABLE "Constituency" ADD CONSTRAINT "Constituency_townId_fkey" FOREIGN KEY ("townId") REFERENCES "Town"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_constituencyId_fkey" FOREIGN KEY ("constituencyId") REFERENCES "Constituency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarWash" ADD CONSTRAINT "CarWash_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE SET NULL ON UPDATE CASCADE;
