/*
  Warnings:

  - You are about to drop the column `authorId` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `genreId` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `publisher` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `Shelf` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `givenBooks` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `recievdBooks` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `regDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Genre` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Author` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[author]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Shelf` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryTitle` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `state` on the `Book` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `bookId` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Shelf` table without a default value. This is not possible if the table is not empty.
  - Added the required column `given_books` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recieved_books` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `user_id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "State" AS ENUM ('good', 'well', 'bad');

-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_genreId_fkey";

-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_imageId_fkey";

-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Shelf" DROP CONSTRAINT "Shelf_userID_fkey";

-- DropIndex
DROP INDEX "Book_authorId_key";

-- DropIndex
DROP INDEX "Book_imageId_key";

-- DropIndex
DROP INDEX "Shelf_userID_key";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "authorId",
DROP COLUMN "genreId",
DROP COLUMN "imageId",
DROP COLUMN "publisher",
ADD COLUMN     "author" TEXT,
ADD COLUMN     "categoryTitle" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ALTER COLUMN "ownerId" DROP NOT NULL,
DROP COLUMN "state",
ADD COLUMN     "state" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "bookId" TEXT NOT NULL,
ADD COLUMN     "filename" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Shelf" DROP COLUMN "userID",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "givenBooks",
DROP COLUMN "recievdBooks",
DROP COLUMN "regDate",
DROP COLUMN "userId",
ADD COLUMN     "given_books" INTEGER NOT NULL,
ADD COLUMN     "recieved_books" INTEGER NOT NULL,
ADD COLUMN     "reg_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");

-- DropTable
DROP TABLE "Genre";

-- DropEnum
DROP TYPE "Quality";

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageName" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_title_key" ON "Category"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Author_name_key" ON "Author"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Book_author_key" ON "Book"("author");

-- CreateIndex
CREATE UNIQUE INDEX "Shelf_user_id_key" ON "Shelf"("user_id");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_categoryTitle_fkey" FOREIGN KEY ("categoryTitle") REFERENCES "Category"("title") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_author_fkey" FOREIGN KEY ("author") REFERENCES "Author"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shelf" ADD CONSTRAINT "Shelf_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
