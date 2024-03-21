import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs/promises'
import { uploadsDir } from 'utils/absolute-path';
const { join } = require("path");


@Injectable()
export class ImageService {
  constructor(private readonly prismaService: PrismaService) { }

  async load(images: any, bookId: string) {
    try {
      const savedImages = [];

      for (const image of images) {
        const timeStamp = new Date().toISOString().replace(/[-:.]/g, '');
        const imagePath = `images/${timeStamp}_${image.originalname}`;

        const rootPath = join(__dirname, "../../../uploads");

        savedImages.push(imagePath);
        await fs.writeFile(`${rootPath}/${imagePath}`, image.buffer);
      }

      const book = await this.prismaService.book.findUnique({
        where: {
          id: bookId
        }
      })

      if (!book) {
        throw new Error('Книга не найдена');
      }

      const createdImages = await this.prismaService.image.createMany({
        data: savedImages.map((path) => ({
          path,
          bookId,
          filename: path.split('/').pop(),
        }))
      });

      return createdImages;
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  findAll() {
    return `This action returns all image`;
  }

  async findOne(id: string) {
    const userImages = await this.prismaService.image.findMany({
      where: {
        bookId: id
      }
    })
    return userImages;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
