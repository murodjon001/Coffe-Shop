import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegistrationClientDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  surname: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @MinLength(7)
  phone: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  avatar: string;

  @IsNotEmpty()
  @MaxLength(255)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
  })
  password: string;
}
