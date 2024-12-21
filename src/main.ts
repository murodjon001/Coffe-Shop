import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { CustomHttpExceptionFilter } from './infrastructure/interceptors/custom-http-exception.interceptor';
import { ResponseTransformerInterceptor } from './infrastructure/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //middlewares

  app.use(helmet()); // helmet protecting xss attack

  // app.enableCors(); // Enable if you need to receive requests from a 3rd party server. For example, Payme or Click

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true })); // for validate and transform request body

  app.useGlobalFilters(new CustomHttpExceptionFilter()); // This global interceptor for exception

  app.useGlobalInterceptors(new ResponseTransformerInterceptor()); // This global interceptor for responses

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
