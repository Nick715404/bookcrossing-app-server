/*
  Warnings:

  - Made the column `author` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_author_fkey";

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "author" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_author_fkey" FOREIGN KEY ("author") REFERENCES "Author"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
