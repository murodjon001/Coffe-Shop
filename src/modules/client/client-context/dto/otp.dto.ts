import { IsNotEmpty, IsNumber, Max } from 'class-validator';
import { EmailDto } from './email.dto';

export class OtpDto extends EmailDto {
  @IsNotEmpty()
  @Max(9999999999)
  @IsNumber()
  otp: number;
}
