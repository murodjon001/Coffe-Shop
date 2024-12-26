/*
  Warnings:

  - You are about to drop the column `menuId` on the `Category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title,coffeeShopId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[season,coffeeShopId]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "SEASON" AS ENUM ('SPRING', 'SUMMER', 'WINTER', 'FALL', 'UNIVERSAL');

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_menuId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "menuId";

-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "season" "SEASON" NOT NULL DEFAULT 'UNIVERSAL';

-- CreateTable
CREATE TABLE "MenuProducts" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT NOT NULL,
    "menuId" TEXT NOT NULL,

    CONSTRAINT "MenuProducts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MenuProductsToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MenuProductsToProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "MenuProducts_menuId_categoryId_key" ON "MenuProducts"("menuId", "categoryId");

-- CreateIndex
CREATE INDEX "_MenuProductsToProduct_B_index" ON "_MenuProductsToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Category_title_coffeeShopId_key" ON "Category"("title", "coffeeShopId");

-- CreateIndex
CREATE UNIQUE INDEX "Menu_season_coffeeShopId_key" ON "Menu"("season", "coffeeShopId");

-- AddForeignKey
ALTER TABLE "MenuProducts" ADD CONSTRAINT "MenuProducts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuProducts" ADD CONSTRAINT "MenuProducts_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuProductsToProduct" ADD CONSTRAINT "_MenuProductsToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "MenuProducts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuProductsToProduct" ADD CONSTRAINT "_MenuProductsToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
