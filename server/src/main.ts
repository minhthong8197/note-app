import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as env from 'dotenv';

async function bootstrap() {
  env.config()
  const PORT = process.env.PORT || 2048
  const app = await NestFactory.create(AppModule)
  await app.listen(PORT)

  console.log(`--- http://localhost:${PORT}/graphql ---`)
}
bootstrap();
