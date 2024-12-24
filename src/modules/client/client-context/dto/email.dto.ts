import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class EmailDto {
  @IsNotEmpty()
  @MaxLength(255)
  @IsEmail()
  email: string;
}
