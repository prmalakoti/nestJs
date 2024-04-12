import { Injectable } from '@nestjs/common';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor {
    intercept(context, next) {
        console.log('Interceptor Before...', context.ExecutionContextHost);

        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap(() => console.log(`Interceptor After... ${Date.now() - now}ms`)),
            );
    }
}