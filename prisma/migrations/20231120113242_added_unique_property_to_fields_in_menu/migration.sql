/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[icon]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[listOrder]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Menu_name_key" ON "Menu"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Menu_url_key" ON "Menu"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Menu_icon_key" ON "Menu"("icon");

-- CreateIndex
CREATE UNIQUE INDEX "Menu_listOrder_key" ON "Menu"("listOrder");
