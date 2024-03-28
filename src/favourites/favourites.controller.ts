import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { PutBookToFav } from './dto/putBookToFav.dto';

@Controller('favorites')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) { }

  @Post('put')
  putBookFav(@Body() data: PutBookToFav<string>) {
    return this.favouritesService.PutBookInFav(data);
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.favouritesService.findOne(id);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.favouritesService.remove(id);
  }
}
