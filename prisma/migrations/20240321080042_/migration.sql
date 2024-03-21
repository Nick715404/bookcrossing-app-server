-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_author_fkey";

-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_category_title_fkey";

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "author" DROP NOT NULL,
ALTER COLUMN "category_title" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_category_title_fkey" FOREIGN KEY ("category_title") REFERENCES "Category"("title") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_author_fkey" FOREIGN KEY ("author") REFERENCES "Author"("name") ON DELETE SET NULL ON UPDATE CASCADE;
