import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imageService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageService.remove(+id);
  }
}
