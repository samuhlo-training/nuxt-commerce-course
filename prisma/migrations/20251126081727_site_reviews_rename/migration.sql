/*
  Warnings:

  - You are about to drop the `SiteReview` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SiteReview";

-- CreateTable
CREATE TABLE "SiteReviews" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SiteReviews_pkey" PRIMARY KEY ("id")
);
