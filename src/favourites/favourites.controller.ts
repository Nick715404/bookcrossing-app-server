import { FavouritesService } from './favourites.service';
import { PutBookToFav } from './dto/putBookToFav.dto';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RemoveBookFromFavDTO } from './dto/removeBookFromFav.dto';

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

  @Post('delete')
  remove(@Body() data: RemoveBookFromFavDTO) {
    return this.favouritesService.remove(data);
  }
}
