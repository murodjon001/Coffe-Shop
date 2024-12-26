import { IsOptional, IsString, MaxLength } from 'class-validator';
import { RegistrationDto } from 'src/shared/dto/registration-dto';

export class RegistrationClientDto extends RegistrationDto {
  @IsOptional()
  @IsString()
  @MaxLength(500)
  avatar: string;
}
