/*
  Warnings:

  - You are about to alter the column `price` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - Added the required column `field` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `field` TEXT NOT NULL,
    MODIFY `price` DOUBLE NOT NULL;
