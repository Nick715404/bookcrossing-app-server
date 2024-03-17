/*
  Warnings:

  - You are about to drop the column `categoryTitle` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `releaseDate` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `imageName` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `bookId` on the `Image` table. All the data in the column will be lost.
  - Added the required column `category_title` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_name` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `book_id` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_categoryTitle_fkey";

-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_bookId_fkey";

-- DropIndex
DROP INDEX "Book_author_key";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "categoryTitle",
DROP COLUMN "ownerId",
DROP COLUMN "releaseDate",
ADD COLUMN     "category_title" TEXT NOT NULL,
ADD COLUMN     "owner" TEXT,
ADD COLUMN     "release_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "imageName",
ADD COLUMN     "image_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "bookId",
ADD COLUMN     "book_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_category_title_fkey" FOREIGN KEY ("category_title") REFERENCES "Category"("title") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
