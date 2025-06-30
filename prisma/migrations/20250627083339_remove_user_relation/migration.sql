/*
  Warnings:

  - You are about to drop the column `userId` on the `Borrow` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Borrow" DROP CONSTRAINT "Borrow_userId_fkey";

-- AlterTable
ALTER TABLE "Borrow" DROP COLUMN "userId";
