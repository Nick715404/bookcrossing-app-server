import { CreateBookDto } from "src/book/dto/create-book.dto"

export async function FindShelfForBook(userId: string) {
  return await this.prismaService.shelf.findUnique({
    where: {
      userId: userId
    }
  })
}

export async function CreateAuthor(data: CreateBookDto) {
  return await this.prismaService.author.create({
    data: {
      name: data.author
    }
  })
};