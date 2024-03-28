export async function GetFavFromUser(id: string) {
  return await this.prismaService.favourites.findFirst({
    where: {
      user: id
    }
  });
};