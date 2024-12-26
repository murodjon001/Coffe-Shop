import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdatePersonalDataAdministratorDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  surname: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  @MinLength(7)
  phone: string;
}
