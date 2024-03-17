import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { json } from 'stream/consumers';

@Injectable()
export class BookService {

  // На фронтенде делать проверку правильности записи Имени автора
  // Указать правильный формат <Фамилия ИО>
  // Если нет подходящего жанра, то добаалять в жанр "другое"
  // Продумать логику фильтрации, по накладкам

  constructor(private readonly prismaService: PrismaService) { }

  async CreateBook(data: CreateBookDto) {
    try {

      const author = await this.prismaService.author.findFirst({
        where: {
          name: data.bookAuthor
        }
      });

      if (author === null) {
        const createAuthor = async () => {
          const createdAuthor = await this.prismaService.author.create({
            data: {
              name: data.bookAuthor
            }
          })
          return createdAuthor;
        }
        createAuthor();
      }

      console.log(author);

      const category = await this.prismaService.category.findFirst({
        where: {
          title: data.bookCategory
        }
      });

      const book = await this.prismaService.book.create({
        data: {
          isbn: data.bookIsbn,
          title: data.bookTitle,
          state: data.bookQuality,
          description: data.bookDesr,
          author: author ? author.name : 'функция создания не сработало',
          categoryTitle: category ? category.title : null,
          // shelf: user.shelf.id,
        }
      });

      return book;
    }
    catch (error) {
      console.log('Error to create new book');
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

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
      const response = await this.prismaService.book.delete({
        where: {
          id: id
        }
      })
      return `Книга с id: ${response.id} удален`;
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

}
