import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
<<<<<<< HEAD
=======
import { ValidationPipe } from '@nestjs/common';
>>>>>>> 743b11d50e10de0d8abcac4b1ae09b420b60a52e

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

<<<<<<< HEAD
  app.enableCors({
    origin: 'http://localhost:5173', // Vite 
=======
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.setGlobalPrefix('api'); 

  app.enableCors({
    origin: 'http://localhost:5173', 
>>>>>>> 743b11d50e10de0d8abcac4b1ae09b420b60a52e
    credentials: true,
  });

  await app.listen(3000);
}
<<<<<<< HEAD
bootstrap();
=======
bootstrap();
>>>>>>> 743b11d50e10de0d8abcac4b1ae09b420b60a52e
