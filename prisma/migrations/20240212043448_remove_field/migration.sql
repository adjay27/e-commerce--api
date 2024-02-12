/*
  Warnings:

  - You are about to drop the column `field` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `field`,
    MODIFY `description` TEXT NOT NULL;
