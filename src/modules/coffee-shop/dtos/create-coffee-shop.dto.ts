import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateCoffeeShopDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  shopName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @MinLength(7)
  phone: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  logo: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  address: string;

  @IsOptional()
  @IsNumber()
  @Max(90)
  @Min(-90)
  latitude: string;

  @IsOptional()
  @IsNumber()
  @Max(180)
  @Min(-180)
  longitude: string;
}
