import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  @IsString()
  @MaxLength(500)
  clientNote?: string;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  orderDate = new Date();

  @IsNotEmpty()
  @IsUUID()
  basketId: string;

  @IsNotEmpty()
  @IsUUID()
  coffeeShopId: string;
}
