import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './utils/response.interceptor';
import { HttpExceptionFilter } from './utils/http.filter';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as session from 'express-session'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      validateCustomDecorators: false,
    }),
  );
  // app.enableVersioning({
  //   type: VersioningType.URI
  // })
  app.use(session({ secret: "aqi", rolling: true, name: "aqi.sid", cookie: { maxAge: 99999 } }))
  await app.listen(3000);
}
bootstrap();
