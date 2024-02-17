-- AlterTable
ALTER TABLE `orders` ADD COLUMN `payment_status` ENUM('PAID', 'PENDING') NOT NULL DEFAULT 'PENDING';
