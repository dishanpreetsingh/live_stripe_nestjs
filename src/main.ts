import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
  .setTitle('Stripe With Nestjs')
  .setDescription('Stripe With Nestjs')
  .setVersion('1.0')
  .addBearerAuth(
    {
      description: 'Default JWT Authorization',
      type: 'http',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
    'defaultBearerAuth',
  )
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document,{
  swaggerOptions: { defaultModelsExpandDepth: -1 },
});
app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
