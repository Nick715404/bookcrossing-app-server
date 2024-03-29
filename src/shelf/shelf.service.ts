import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddBookToShelfDto } from './dto/add-book-to-shelf.dto';
import { GetShelf } from 'src/utils/shelf/shelf.utils';

@Injectable()
export class ShelfService {

  constructor(private readonly prisma: PrismaService) { }

  async findOne(id: string) {
    try {
      const shelf = await this.prisma.shelf.findUnique({
        where: {
          userId: id
        }
      });

      const booksOnShelf = await this.prisma.book.findMany({
        where: {
          shelf: shelf.id
        }
      })

      return { info: shelf, books: booksOnShelf };
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };

}
