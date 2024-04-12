import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './book/book.interceptor';
import { loggerMiddleware } from './logger.middleware';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerMiddleware);
  // app.use(new LoggingInterceptor()); /* Global level interceptor(write interceptor func) */
  await app.listen(3000);
}
bootstrap();
