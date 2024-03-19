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
      const shelf = await this.CreateShelf(user.userId)

      return { user: user, shelf: shelf }

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT)
    }
  }

  async CreateUser(data: CreateUserDto) {
    return await this.prismaService.user.create({
      data: {
        vkId: data.vkid,
        city: data.city,
        name: data.name,
        surName: data.surName,
      }
    });
  }

  async CreateShelf(userId: string) {
    return this.prismaService.shelf.create({
      data: {
        userId: userId,
        books: {
          create: []
        }
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

  async findOne(id: string) {
    try {
      const user = await this.FindCurrentUser(id);
      return user;
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };

  async FindCurrentUser(vkid: string) {
    return this.prismaService.user.findUnique({
      where: {
        vkId: vkid
      }
    });
  };

  async FindShelfByUserId(userId: string) {
    return this.prismaService.shelf.findUnique({
      where: {
        userId: userId
      }
    });
  };

  async remove(id: string) {
    try {
      const deletedShelf = await this.DeleteShelf(id);

      const deletedUser = await this.prismaService.user.delete({
        where: {
          userId: id
        }
      });

      return { user: deletedUser, shelf: deletedShelf };
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async DeleteShelf(id: string) {
    return this.prismaService.shelf.delete({
      where: {
        userId: id
      }
    });
  }
}
