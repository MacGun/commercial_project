import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // NOTE : 요청이 들어오는 시점
        const startPoint: Date = new Date();
        const request = context.switchToHttp().getRequest();

        const x_real_ip = request.get('X-real-ip');
        const ip = x_real_ip ? x_real_ip : request.ip;
        const user_agent = request.get('user-agent') || '';

        const method = request.method;
        const url = request.originalUrl;

        return next.handle().pipe(
            tap(() => {
                // NOTE : 응답이 나가는 시점
                const endPoint: Date = new Date();
                const delay = endPoint.getTime() - startPoint.getTime();

                const response = context.switchToHttp().getResponse();
                const contentLength = response.get('content-length') || 0;

                console.log(
                    `${ip} - [${startPoint.toISOString()}]${method} ${url} | ${
                        response.statusCode
                    } - ${contentLength} | ${user_agent} +${delay}ms`,
                );
            }),
        );
    }
}
