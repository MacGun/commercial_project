import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();

        const request = ctx.getRequest();
        const { path, user, body, query } = request;

        console.log(
            `error: ${exception.name} => ${exception.message}\n${request.method} ${path} time : ${
                Date.now() - request.now
            }ms\nuser : ${JSON.stringify(user)}\nbody : ${JSON.stringify(body)}\nquery : ${JSON.stringify(query)}\n`,
        );

        const intervalError = HttpStatus.INTERNAL_SERVER_ERROR;
        const httpStatus = exception instanceof HttpException ? exception.getStatus() : intervalError;
        const responseData = exception.getResponse() as Record<string, unknown>;
        const { code, message } = responseData;

        const response = ctx.getResponse<Response>();
        response.status(200).json({ result: false, code: code || httpStatus, message });
    }
}
