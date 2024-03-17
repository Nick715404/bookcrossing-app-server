/*
  Warnings:

  - You are about to drop the column `user` on the `Shelf` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Shelf` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Shelf` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Shelf" DROP CONSTRAINT "Shelf_user_fkey";

-- DropIndex
DROP INDEX "Shelf_user_key";

-- AlterTable
ALTER TABLE "Shelf" DROP COLUMN "user",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Shelf_userId_key" ON "Shelf"("userId");

-- AddForeignKey
ALTER TABLE "Shelf" ADD CONSTRAINT "Shelf_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("vk_id") ON DELETE RESTRICT ON UPDATE CASCADE;
