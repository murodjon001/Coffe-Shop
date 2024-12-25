/*
  Warnings:

  - A unique constraint covering the columns `[coffeeShopId,email]` on the table `Administrator` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[coffeeShopId,email]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Administrator_email_key";

-- DropIndex
DROP INDEX "Client_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "Administrator_coffeeShopId_email_key" ON "Administrator"("coffeeShopId", "email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_coffeeShopId_email_key" ON "Client"("coffeeShopId", "email");
