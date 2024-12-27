/*
  Warnings:

  - You are about to drop the `MenuItems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MenuItemsToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MenuItems" DROP CONSTRAINT "MenuItems_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "MenuItems" DROP CONSTRAINT "MenuItems_menuId_fkey";

-- DropForeignKey
ALTER TABLE "_MenuItemsToProduct" DROP CONSTRAINT "_MenuItemsToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_MenuItemsToProduct" DROP CONSTRAINT "_MenuItemsToProduct_B_fkey";

-- DropTable
DROP TABLE "MenuItems";

-- DropTable
DROP TABLE "_MenuItemsToProduct";

-- CreateTable
CREATE TABLE "MenuItem" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT NOT NULL,
    "menuId" TEXT NOT NULL,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuItemsProducts" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" TEXT NOT NULL,
    "menuItemId" TEXT NOT NULL,

    CONSTRAINT "MenuItemsProducts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MenuItem_menuId_categoryId_key" ON "MenuItem"("menuId", "categoryId");

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItemsProducts" ADD CONSTRAINT "MenuItemsProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItemsProducts" ADD CONSTRAINT "MenuItemsProducts_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
