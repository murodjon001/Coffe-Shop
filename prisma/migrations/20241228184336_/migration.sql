/*
  Warnings:

  - Added the required column `orderDate` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "clientNote" TEXT,
ADD COLUMN     "orderDate" TIMESTAMP(3) NOT NULL;
