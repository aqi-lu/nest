import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './utils/response.interceptor';
import { HttpExceptionFilter } from './utils/http.filter';
import { ValidationPipe } from '@nestjs/common';
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
  app.use(session({ secret: "aqi", rolling: true, name: "aqi.sid", cookie: { maxAge: 999999 } }))
  await app.listen(3000);
}
bootstrap();
