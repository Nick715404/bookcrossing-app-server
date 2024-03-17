import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {

  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateCategoryDto) {
    try {
      const category = await this.prisma.category.create({
        data: {
          title: data.title,
          imageName: data.imageName
        }
      });

      return category;
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  async findAll() {
    try {
      const category = this.prisma.category.findMany();
      return category;
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
