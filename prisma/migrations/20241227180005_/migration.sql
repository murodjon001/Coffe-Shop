/*
  Warnings:

  - A unique constraint covering the columns `[productId,menuItemId]` on the table `MenuItemsProducts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MenuItemsProducts_productId_menuItemId_key" ON "MenuItemsProducts"("productId", "menuItemId");
