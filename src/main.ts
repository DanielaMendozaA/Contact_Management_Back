import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { setupGlobalConfig } from './common/config/global-config';
import { SwaggerConfig } from './common/config/swagger.config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT') || 3006;
  const logger = new Logger('Boostrap');
  app.enableCors();
  SwaggerConfig(app)
  app.setGlobalPrefix('api/v1')
  setupGlobalConfig(app);
 
  await app.listen(PORT);
  logger.log(`Application is running on port ${PORT}`);

}
bootstrap();
