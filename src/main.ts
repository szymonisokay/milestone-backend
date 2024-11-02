import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: [configService.get('app.frontendDomain')!],
    credentials: true,
  });

  app.use(cookieParser());

  await app.listen(configService.get('app.port') ?? 8000);
}
bootstrap();
