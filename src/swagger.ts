import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { ConfigService } from '@nestjs/config';

export function setupSwagger(app: INestApplication) {
  const configService = app.get(ConfigService);

  const username = configService.get<string>('SWAGGER_USERNAME');
  const password = configService.get<string>('SWAGGER_PASSWORD');

  if (!username || !password) {
    throw new Error(
      'Swagger username or password is not set in environment variables.',
    );
  }

  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('API documentation with authentication')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use(
    '/api-docs',
    basicAuth({
      users: {
        [username]: password,
      },
      challenge: true,
    }),
  );

  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });
}
