import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShelfService } from './shelf.service';
import { AddBookToShelfDto } from './dto/add-book-to-shelf.dto';

@Controller('shelf')
export class ShelfController {
  constructor(private readonly shelfService: ShelfService) { }

  @Get('find/:id')
  addBookToShelf(@Param('id') id: string) {
    return this.shelfService.findOne(id);
  }

}
