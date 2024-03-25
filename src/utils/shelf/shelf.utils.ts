export async function GetShelf(userId: string) {
  return this.prisma.shelf.findUnique({
    where: {
      userId: userId
    }
  })
};