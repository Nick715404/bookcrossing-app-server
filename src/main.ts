import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as fs from 'fs';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	app.setGlobalPrefix('api');
	app.enableCors({
		origin: '*',
	});
	app.useStaticAssets(join(__dirname, '../uploads'));
	await app.listen(3100);
}
bootstrap();
