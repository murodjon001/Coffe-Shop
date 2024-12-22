-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "isConfirmed" BOOLEAN NOT NULL DEFAULT false;
