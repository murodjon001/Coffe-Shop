import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { CustomHttpException } from '../errors/custom-http-exception';

@Catch(CustomHttpException)
export class CustomHttpExceptionFilter implements ExceptionFilter {
  catch(exception: CustomHttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status || 403,
      message: exception?.message,
      errorCode: exception?.errorCode,
    });
  }
}
