import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

  constructor(private readonly prismaService: PrismaService) { }

  async create(data: CreateUserDto) {
    try {
      const user = await this.CreateUser(data)
      const shelf = await this.CreateShelf(data, user.userId)

      return {user: user, shelf: shelf}
      
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT)
    }
  }

  async CreateUser(data: CreateUserDto){
    return await this.prismaService.user.create({
      data: {
        vkId: data.vkid,
        givenBooks: data.givenBooks,
        recievdBooks: data.recievdBooks,
        city: data.city,
      }
    });
  }

  async CreateShelf(data: CreateUserDto, userId:string){
    return this.prismaService.shelf.create({
      data: {
        userId: userId
      }
    });
  }


  async findAll() {
    try {
      const users = await this.prismaService.user.findMany();
      return users;
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
