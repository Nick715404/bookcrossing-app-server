import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
      return shelf;
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

}
