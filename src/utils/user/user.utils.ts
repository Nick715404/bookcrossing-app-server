import { CreateUserDto } from "src/user/dto/create-user.dto";

export async function CreateUser(data: CreateUserDto) {
  return await this.prismaService.user.create({
    data: {
      vkId: data.vkid,
      city: data.city,
      name: data.name,
      surName: data.surName,
    }
  });
}

export async function CreateShelf(userId: string) {
  return this.prismaService.shelf.create({
    data: {
      userId: userId,
      books: {
        create: []
      }
    }
  });
}

export async function CreateFavorites(userId: string) {
  return await this.prismaService.favourites.create({
    data: {
      user: userId,
      books: {
        create: []
      }
    }
  })
}