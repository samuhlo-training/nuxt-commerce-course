/*
  Warnings:

  - You are about to drop the `SiteReviews` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `ProductReview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ProductReview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductReview" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "SiteReviews";

-- CreateTable
CREATE TABLE "SiteReview" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SiteReview_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductReview" ADD CONSTRAINT "ProductReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
