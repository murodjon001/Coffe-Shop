import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class MakeOrderDto {
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  orderDate = new Date();

  @IsOptional()
  @IsString()
  @MaxLength(500)
  clientNote?: string;

  @IsNotEmpty()
  @IsUUID()
  basketId: string;
}
