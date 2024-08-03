import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs/promises'
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

        const rootPath = join(__dirname, "../../uploads");
        // console.log(rootPath);

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

  async updateImages(images: any, bookId: string) {
    try {
      const savedImages = [];

      for (const image of images) {
        const timeStamp = new Date().toISOString().replace(/[-:.]/g, '');
        const imagePath = `images/${timeStamp}_${image.originalname}`;
        const rootPath = join(__dirname, "../../uploads");

        savedImages.push(imagePath);
        await fs.writeFile(`${rootPath}/${imagePath}`, image.buffer);
      }

      const createdImages = await this.prismaService.image.createMany({
        data: savedImages.map((path) => ({
          path,
          bookId,
          filename: path.split('/').pop(),
        }))
      });
    }
    catch (error) {
      throw new Error(`Failed to update images: ${error.message}`);
    }
  }

  async findOne(id: string) {
    const bookImages = await this.prismaService.image.findFirst({
      where: {
        bookId: id
      }
    })
    return bookImages;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
