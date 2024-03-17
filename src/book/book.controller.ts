import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Post('create')
  create(@Body() data: CreateBookDto) {
    return this.bookService.CreateBook(data);
  }

  @Get('all')
  findAll() {
    return this.bookService.FindBooks();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.FindBookById(id);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.bookService.DeleteBook(id);
  }
}
