/*
  Warnings:

  - You are about to drop the column `deleted` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `UserAddress` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "deleted",
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "UserAddress" DROP COLUMN "deleted",
ADD COLUMN     "deletedAt" TIMESTAMP(3);
