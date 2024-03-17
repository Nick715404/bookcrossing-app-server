/*
  Warnings:

  - You are about to drop the column `book` on the `Shelf` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Shelf` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user]` on the table `Shelf` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vk_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user` to the `Shelf` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vk_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Shelf" DROP CONSTRAINT "Shelf_user_id_fkey";

-- DropIndex
DROP INDEX "Shelf_user_id_key";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "shelf" TEXT;

-- AlterTable
ALTER TABLE "Shelf" DROP COLUMN "book",
DROP COLUMN "user_id",
ADD COLUMN     "user" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "vk_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Shelf_user_key" ON "Shelf"("user");

-- CreateIndex
CREATE UNIQUE INDEX "User_vk_id_key" ON "User"("vk_id");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_shelf_fkey" FOREIGN KEY ("shelf") REFERENCES "Shelf"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shelf" ADD CONSTRAINT "Shelf_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("vk_id") ON DELETE RESTRICT ON UPDATE CASCADE;
