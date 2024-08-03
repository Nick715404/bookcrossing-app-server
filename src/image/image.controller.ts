import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ImageService } from './image.service';
import { FilesInterceptor } from '@nestjs/platform-express/multer';

@Controller('image')
export class ImageController {

  constructor(private readonly imageService: ImageService) { }

  @Post('load')
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @UploadedFiles() images: any,
    @Body('book-id') bookId: string
  ) {
    return this.imageService.load(images, bookId);
  }

  @Get()
  findAll() {
    return this.imageService.findAll();
  }

  @Get(':id/images')
  findOne(@Param('id') id: string) {
    return this.imageService.findOne(id);
  }

  @Patch('update/:bookId')
  @UseInterceptors(FilesInterceptor('images'))
  async updateImages(
    @UploadedFiles() images: any,
    @Param('bookId') bookId: string,
  ) {
    if (!images || images.length === 0) {
      console.log('error');
    }

    try {
      return await this.imageService.updateImages(images, bookId);
    } catch (error) {
      console.log('error');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageService.remove(+id);
  }
}
