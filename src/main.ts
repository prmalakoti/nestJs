import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './book/book.guard';
import { LoggingInterceptor } from './book/book.interceptor';
import { loggerMiddleware } from './logger.middleware';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerMiddleware);
  //app.useGlobalInterceptors(new LoggingInterceptor()); /* Global level interceptor(write interceptor func) */
  //app.useGlobalGuards(new AuthGuard()) /* Global level auth guard */
  await app.listen(3000);
}
bootstrap();
