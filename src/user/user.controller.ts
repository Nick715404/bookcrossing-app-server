import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('create')
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
