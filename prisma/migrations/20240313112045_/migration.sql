-- DropForeignKey
ALTER TABLE "Shelf" DROP CONSTRAINT "Shelf_userId_fkey";

-- AddForeignKey
ALTER TABLE "Shelf" ADD CONSTRAINT "Shelf_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
