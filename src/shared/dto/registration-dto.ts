import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegistrationDto {
  @IsNotEmpty()
  @IsUUID()
  coffeeShopId: string;

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

  @IsNotEmpty()
  @MaxLength(255)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 0,
  })
  password: string;
}
