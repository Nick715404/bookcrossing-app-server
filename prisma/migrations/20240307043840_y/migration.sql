-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_favourite_fkey";

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "favourite" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_favourite_fkey" FOREIGN KEY ("favourite") REFERENCES "Favourites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
