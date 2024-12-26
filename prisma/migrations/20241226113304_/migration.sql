/*
  Warnings:

  - A unique constraint covering the columns `[shopName]` on the table `CoffeeShop` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CoffeeShop_shopName_key" ON "CoffeeShop"("shopName");
