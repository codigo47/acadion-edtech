import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as express from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend
  app.enableCors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:8000',
      'https://fb60-181-44-119-58.ngrok-free.app',
      'http://192.168.0.9:8000',
    ],
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // API prefix with version
  app.setGlobalPrefix('api/v1');

  // Serve uploaded files statically
  app.use('/api/v1/uploads', express.static(join(process.cwd(), 'uploads')));

  await app.listen(process.env.PORT ?? 8001);
}
void bootstrap();
