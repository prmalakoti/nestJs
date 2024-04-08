import { Module } from '@nestjs/common';
import { MiddlewareConsumer, NestModule } from '@nestjs/common/interfaces';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AuthMiddleware } from './auth.middleware';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    /* API rate limit */
    ThrottlerModule.forRoot([{
      ttl: 60000, // ms
      limit: 10, // number of calls
    }]),
    BookModule],
  controllers: [],
  providers: [
    /* API rate limit object*/
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware) // if you have multiple midddleware add in apply
      .forRoutes('book'); // if you have multiple routes add into forRoutes
  }
}
