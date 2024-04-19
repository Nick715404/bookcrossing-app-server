-- CreateTable
CREATE TABLE `User` (
    `user_id` VARCHAR(191) NOT NULL,
    `vk_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `sur_name` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NULL,
    `city` VARCHAR(191) NOT NULL,
    `reg_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_vk_id_key`(`vk_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Book` (
    `id` VARCHAR(191) NOT NULL,
    `category_title` VARCHAR(191) NULL,
    `author` VARCHAR(191) NULL,
    `owner` INTEGER NULL,
    `isbn` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `favourite` VARCHAR(191) NULL,
    `shelf` VARCHAR(191) NULL,
    `release_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `image_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Category_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Author` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Author_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shelf` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Shelf_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `filename` VARCHAR(191) NOT NULL,
    `book_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Favourites` (
    `id` VARCHAR(191) NOT NULL,
    `user` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Favourites_user_key`(`user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_category_title_fkey` FOREIGN KEY (`category_title`) REFERENCES `Category`(`title`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_author_fkey` FOREIGN KEY (`author`) REFERENCES `Author`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_owner_fkey` FOREIGN KEY (`owner`) REFERENCES `User`(`vk_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_favourite_fkey` FOREIGN KEY (`favourite`) REFERENCES `Favourites`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_shelf_fkey` FOREIGN KEY (`shelf`) REFERENCES `Shelf`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shelf` ADD CONSTRAINT `Shelf_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favourites` ADD CONSTRAINT `Favourites_user_fkey` FOREIGN KEY (`user`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
