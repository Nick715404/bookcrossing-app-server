import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { AuthorModule } from './author/author.module';
import { PrismaModule } from './prisma/prisma.module';
import { ImageModule } from './image/image.module';
import { CategoryModule } from './category/category.module';
import { ShelfModule } from './shelf/shelf.module';
import { FavouritesModule } from './favourites/favourites.module';

@Module({
  imports: [BookModule, ConfigModule.forRoot({ isGlobal: true }), UserModule, AuthorModule, PrismaModule, ImageModule, CategoryModule, ShelfModule, FavouritesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
