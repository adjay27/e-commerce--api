/*
  Warnings:

  - The primary key for the `order_items` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `order_items` table. All the data in the column will be lost.
  - Added the required column `total_price` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order_items` DROP FOREIGN KEY `order_items_ibfk_1`;

-- DropForeignKey
ALTER TABLE `order_items` DROP FOREIGN KEY `order_items_ibfk_2`;

-- AlterTable
ALTER TABLE `order_items` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `total`,
    ADD COLUMN `total_price` DOUBLE NOT NULL,
    ALTER COLUMN `quantity` DROP DEFAULT,
    MODIFY `price` DOUBLE NOT NULL,
    MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD PRIMARY KEY (`order_id`, `product_id`);

-- AlterTable
ALTER TABLE `orders` ADD COLUMN `user_id` INTEGER NOT NULL,
    MODIFY `total` DOUBLE NOT NULL,
    MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
