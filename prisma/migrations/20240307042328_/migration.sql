/*
  Warnings:

  - Added the required column `favourite` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "favourite" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "given_books" DROP NOT NULL,
ALTER COLUMN "recieved_books" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Favourites" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,

    CONSTRAINT "Favourites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favourites_user_key" ON "Favourites"("user");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_favourite_fkey" FOREIGN KEY ("favourite") REFERENCES "Favourites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favourites" ADD CONSTRAINT "Favourites_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
