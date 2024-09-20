import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as fs from 'fs';

async function bootstrap() {
	console.log(process.env.SSL_KEY_PATH);
	console.log(process.env.SSL_CERT_PATH);

	const httpsOptions = {
		key: fs.readFileSync(`${process.env.SSL_KEY_PATH}`),
		cert: fs.readFileSync(`${process.env.SSL_CERT_PATH}`),
	};

	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		httpsOptions,
	});

	app.setGlobalPrefix('api');
	app.enableCors({
		origin: '*',
	});
	app.useStaticAssets(join(__dirname, '../uploads'));
	await app.listen(3100);
}
bootstrap();
