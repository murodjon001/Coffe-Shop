import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  discountPercent?: number;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  image?: string;

  @IsNotEmpty()
  @IsBoolean()
  isPurchasable: boolean;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @IsNotEmpty()
  @IsUUID()
  coffeeShopId: string;
}
