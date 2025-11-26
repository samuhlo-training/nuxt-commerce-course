/*
  Warnings:

  - You are about to drop the column `profileUrl` on the `SiteReview` table. All the data in the column will be lost.
  - Added the required column `profileImage` to the `SiteReview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SiteReview" DROP COLUMN "profileUrl",
ADD COLUMN     "profileImage" TEXT NOT NULL;
