import { Module } from '@nestjs/common';
import { ShelfService } from './shelf.service';
import { ShelfController } from './shelf.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ShelfController],
  providers: [ShelfService],
  imports: [PrismaModule]
})
export class ShelfModule {}
