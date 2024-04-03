import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetFavFromUser } from 'src/utils/fav/fav.utils';
import { PutBookToFav } from './dto/putBookToFav.dto';

@Injectable()
export class FavouritesService {

  constructor(private readonly prismaService: PrismaService) { }

  async findOne(id: string) {
    try {
      const favorites = await this.GetFavFromUser(id);
      const favBooks = await this.GetFavBooks(favorites.id);

      return { info: favorites, books: favBooks };
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async GetFavFromUser(id: string) {
    return await this.prismaService.favourites.findFirst({
      where: {
        user: id
      }
    });
  };

  async GetFavBooks(favId: string) {
    return await this.prismaService.book.findMany({
      where: {
        favourite: favId
      }
    })
  }

  async PutBookInFav(data: PutBookToFav<string>) {
    try {
      const book = await this.FindBookById(data.bookId);

      if (!book) {
        throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
      }

      let favorites = await this.prismaService.favourites.findUnique({
        where: { user: data.userId }
      });

      if (!favorites) {
        favorites = await this.prismaService.favourites.create({
          data: {
            user: data.userId,
            books: { create: [] }
          }
        });
      };

      const updatedBook = await this.UpdateFavKeyFromBook(data.bookId, favorites.id);

      const updatedFavourites = await this.prismaService.favourites.update({
        where: { user: data.userId },
        data: {
          books: { connect: { id: data.bookId } }
        }
      });

      return updatedBook;
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  async FindBookById(id: string) {
    return await this.prismaService.book.findFirst({
      where: { id: id }
    })
  };

  async UpdateFavKeyFromBook(bookId: string, favId: any) {
    return await this.prismaService.book.update({
      where: {
        id: bookId,
      },
      data: {
        favourite: favId
      }
    });
  }

  remove(id: string) {
    return `This action removes a #${id} favourite`;
  }
}
