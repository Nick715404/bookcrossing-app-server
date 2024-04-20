import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from '@prisma/client';
import { UpdateBookDTO } from './dto/update-book.dto';

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

  @Get('search')
  async searchBooks(@Query('q') query: string) {
    return this.bookService.SearchBooks(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.FindBookById(id);
  }

  @Patch('/patch')
  putBookToFav(userId: string, bookId: string) {
    return this.bookService.UpdateFavToBook(userId, bookId);
  }

  @Patch('/edit/:id')
  updateBook(@Param('id') id: string, @Body() newData: UpdateBookDTO) {
    return this.bookService.updateBook(id, newData);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.bookService.DeleteBook(id);
  }
}
