/*
  Warnings:

  - Added the required column `userId` to the `lessons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lessons` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `lessons_userId_idx` ON `lessons`(`userId`);
