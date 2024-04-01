import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
  });
  app.useStaticAssets(join(__dirname, '../uploads'));
  const pathName = join(__dirname, '../uploads');
  // console.log(pathName);
  await app.listen(3100);
}
bootstrap();
