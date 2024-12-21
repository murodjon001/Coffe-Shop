import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseTransformerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        if (typeof response === 'object' && response !== null) {
          return {
            data: response,
            statusCode: context.switchToHttp().getResponse().statusCode,
            message: 'Success',
          };
        }
        return {
          data: response,
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: 'Success',
        };
      }),
    );
  }
}
