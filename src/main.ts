import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  console.log('JWT_SECRET:', process.env.JWT_SECRET);
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
