/*
  Warnings:

  - You are about to drop the `MenuProducts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MenuProductsToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MenuProducts" DROP CONSTRAINT "MenuProducts_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "MenuProducts" DROP CONSTRAINT "MenuProducts_menuId_fkey";

-- DropForeignKey
ALTER TABLE "_MenuProductsToProduct" DROP CONSTRAINT "_MenuProductsToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_MenuProductsToProduct" DROP CONSTRAINT "_MenuProductsToProduct_B_fkey";

-- DropTable
DROP TABLE "MenuProducts";

-- DropTable
DROP TABLE "_MenuProductsToProduct";

-- CreateTable
CREATE TABLE "MenuItems" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT NOT NULL,
    "menuId" TEXT NOT NULL,

    CONSTRAINT "MenuItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MenuItemsToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MenuItemsToProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "MenuItems_menuId_categoryId_key" ON "MenuItems"("menuId", "categoryId");

-- CreateIndex
CREATE INDEX "_MenuItemsToProduct_B_index" ON "_MenuItemsToProduct"("B");

-- AddForeignKey
ALTER TABLE "MenuItems" ADD CONSTRAINT "MenuItems_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItems" ADD CONSTRAINT "MenuItems_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuItemsToProduct" ADD CONSTRAINT "_MenuItemsToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "MenuItems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuItemsToProduct" ADD CONSTRAINT "_MenuItemsToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
