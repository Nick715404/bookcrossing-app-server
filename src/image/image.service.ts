import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs/promises'

@Injectable()
export class ImageService {
  constructor(private readonly prismaService: PrismaService) { }

  async load(images: any, bookId: string) {
    try {
      const savedImages = [];

      for (const image of images) {
        const timeStamp = new Date().toISOString().replace(/[-:.]/g, '');
        const imagePath = `images/${timeStamp}_${image.originalname}`;

        savedImages.push(imagePath);
        await fs.writeFile(`${__dirname}/../uploads${imagePath}`, image.buffer);
      }

      const book = await this.prismaService.book.findUnique({
        where: {
          id: bookId
        }
      })

      if (!book) {
        throw new Error('Юзер не найден');
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
      throw new HttpException('Ошибка в сервисе', HttpStatus.CONFLICT);
    }
  }

  findAll() {
    return `This action returns all image`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
