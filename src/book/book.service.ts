import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Book } from '@prisma/client';
import { UpdateBookDTO } from './dto/update-book.dto';

@Injectable()
export class BookService {

  constructor(private readonly prismaService: PrismaService) { }

  async SearchBooks(query) {
    try {
      const books = await this.prismaService.book.findMany({
        where: {
          OR: [
            {
              title: {
                contains: query,
                mode: 'insensitive',
              }
            },
            {
              author: {
                contains: query,
                mode: 'insensitive',
              }
            },
            {
              isbn: {
                contains: query,
                mode: 'insensitive',
              }
            },
            {
              categoryTitle: {
                contains: query,
                mode: 'insensitive',
              }
            },
          ],
        },
      });
      return { books: books };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  async CreateBook(data: CreateBookDto) {
    try {

      const author = await this.prismaService.author.findFirst({
        where: {
          name: data.author
        }
      });

      let createdAuthor = null;

      if (author === null) {
        createdAuthor = await this.CreateAuthor(data);
      }

      const category = await this.prismaService.category.findFirst({
        where: {
          title: data.categoryTitle
        }
      });

      const shelf = await this.FindShelf(data.userId);
      const user = await this.FindVkId(data.userId);

      const book = await this.prismaService.book.create({
        data: {
          isbn: data.isbn,
          title: data.title,
          state: data.state,
          description: data.description,
          author: author ? author.name : createdAuthor.name,
          categoryTitle: category ? category.title : null,
          shelf: shelf.id,
          owner: user.vkId,
        }
      });

      return book;
    }
    catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  async updateBook(id: string, newData: UpdateBookDTO) {
    try {
      const existingBook = await this.prismaService.book.findUnique({
        where: { id: newData.id }
      });

      if (!existingBook) {
        throw new Error(`Book with id ${id} not found`);
      }

      const updatedBook = await this.prismaService.book.update({
        where: {
          id: existingBook.id
        },
        data: {
          isbn: newData.isbn,
          title: newData.title,
          state: newData.state,
          description: newData.description,
          author: newData.author,
          categoryTitle: newData.categoryTitle !== null ? newData.categoryTitle : 'Другое', // Ensure categoryTitle is not null
        }
      });

      return updatedBook;
    } catch (error) {
      throw new Error(`Failed to update book: ${error.message}`);
    }
  }


  async FindVkId(id: string) {
    return this.prismaService.user.findFirst({
      where: {
        userId: id
      }
    })
  }

  async CreateAuthor(data: CreateBookDto) {
    return await this.prismaService.author.create({
      data: {
        name: data.author
      }
    })
  };

  async FindShelf(id: string) {
    return await this.prismaService.shelf.findFirst({
      where: {
        userId: id
      }
    });
  };

  async FindBooks() {
    try {
      const response = this.prismaService.book.findMany();
      return response;
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async FindBookById(id: string) {
    try {
      const response = await this.prismaService.book.findUnique({
        where: {
          id: id
        }
      });
      return response;
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async DeleteBook(id: string) {
    try {
      const bookPhoto = await this.FindBookPhoto(id);

      if (!bookPhoto) {
        const response = await this.prismaService.book.delete({
          where: {
            id: id
          }
        })
        return response;
      }

      const deletedPhoto = await this.DeletePhoto(bookPhoto.id);
      const response = await this.prismaService.book.delete({
        where: {
          id: id
        }
      })
      return `Книга с id: ${response.id} удалена и ее фотография с id: ${deletedPhoto.id}`;
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async FindBookPhoto(id: string) {
    return this.prismaService.image.findFirst({
      where: {
        bookId: id
      }
    })
  }

  async DeletePhoto(id: string) {
    return this.prismaService.image.delete({
      where: {
        id: id
      }
    })
  }

  // - Проверить метод

  async UpdateFavToBook(userId: string, bookId: string) {
    try {
      const favorites = await this.prismaService.favourites.findFirst({
        where: {
          user: userId
        }
      });

      if (!favorites) {
        throw new HttpException('Fav not found', HttpStatus.BAD_REQUEST);
      }

      const book = await this.prismaService.book.update({
        where: {
          id: bookId,
        },
        data: {
          favourite: favorites.id
        }
      });

      return book;
    }
    catch (error) {
      console.log(error);

    }
  }

}
