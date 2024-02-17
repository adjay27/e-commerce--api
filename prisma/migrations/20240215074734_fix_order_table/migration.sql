/*
  Warnings:

  - You are about to drop the column `status` on the `orders` table. All the data in the column will be lost.
  - You are about to alter the column `total` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - Added the required column `number` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` DROP COLUMN `status`,
    ADD COLUMN `date` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `number` VARCHAR(255) NOT NULL,
    MODIFY `total` FLOAT NOT NULL DEFAULT 0,
    MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);
