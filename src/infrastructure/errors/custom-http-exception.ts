import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomHttpException extends HttpException {
  errorCode: string;
  httpStatus: number;
  constructor(message: string, errorCode: string, httpStatus?: number) {
    super(message, httpStatus || HttpStatus.BAD_REQUEST);
    this.errorCode = errorCode;
  }

  toString() {
    return `Error Code: ${this.errorCode}, Message: ${this.message}`;
  }
}
