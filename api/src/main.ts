import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { environment } from './environments';

async function bootstrap() {
  const app: NestFastifyApplication =
    await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({ bodyLimit: 5242880 }),
    );

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api');

  if (environment.appCors) {
    app.enableCors({ maxAge: 600 });
  }

  const options: DocumentBuilder = new DocumentBuilder()
    .setTitle('Welcome')
    .setDescription('The welcome app API description')
    .setVersion('0.1')
    .addBearerAuth();
  const document: OpenAPIObject = SwaggerModule.createDocument(
    app,
    options.build(),
  );
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(environment.port, '0.0.0.0', () =>
    Logger.log(`API started at port [${environment.port}]`, 'NestApplication'),
  );
}
bootstrap();
