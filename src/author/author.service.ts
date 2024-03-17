import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthorService {

  constructor(private readonly prismaService: PrismaService) { }

  async create(data) {
    try {
      const res = await this.prismaService.author.create({
        data: {
          name: data.name
        }
      })
      return res;
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  async findAll() {
    try {
      const data = await this.prismaService.author.findMany();
      return data;
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.prismaService.author.findUnique({
        where: {
          id: id
        }
      });
      return data;
    } 
    catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
