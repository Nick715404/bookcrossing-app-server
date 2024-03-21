/*
  Warnings:

  - You are about to drop the column `given_books` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `recieved_books` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sur_name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "given_books",
DROP COLUMN "recieved_books",
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "sur_name" TEXT NOT NULL;
