import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule, {});
    app.setGlobalPrefix('api');
    app.use(cookieParser());

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    // app.useGlobalFilters(new AllExceptionsFilter());
    // app.useGlobalPipes(new CustomValidationPipe())

    app.enableCors({
      origin: (origin, callback) => {
        const allowedOrigins = [
          'http://localhost:5173',
          'http://localhost:3001',
          'http://localhost:3011',
          'http://167.71.195.218:3001',
          'https://167.71.195.218:3001',
          'https://sabidjanov.uz',
          'https://mebel-house.vercel.app',
        ];
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new BadRequestException('Not allowed by CORS'));
        }
      },
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });

    const config = new DocumentBuilder()
      .setTitle('Sanoat Portali')
      .addBearerAuth()
      .setDescription('Sanoat Portali REST API')
      .setVersion('1.0.0')
      .addTag('NESTJS, validation, swagger, guard, sequelize, pg, mailer, otp')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(PORT, () => {
      console.log(`Server started at ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
