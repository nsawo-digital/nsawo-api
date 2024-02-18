import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //validation pipes for validation through dto's
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
}
bootstrap();
