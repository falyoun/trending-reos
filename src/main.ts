import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerDocsInterface } from './configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('port');

  const swaggerDocs = configService.get<SwaggerDocsInterface>('swaggerDocs');
  const config = new DocumentBuilder()
    .setTitle(swaggerDocs.title)
    .setDescription(swaggerDocs.description)
    .setVersion(swaggerDocs.version)
    .addTag(swaggerDocs.tag)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(port, () => {
    console.log(`Server is up & listening on port ${port}`);
  });
}
(async () => {
  try {
    await bootstrap();
  } catch (e) {
    console.error(
      'Error while bootstrapping the main application [main.ts]: ',
      e,
    );
  }
})();
