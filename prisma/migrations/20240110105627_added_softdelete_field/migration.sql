-- AlterTable
ALTER TABLE "User" ADD COLUMN     "softDeletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "UserAddress" ADD COLUMN     "softDeletedAt" TIMESTAMP(3);
