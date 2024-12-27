import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class AddProductToMenuDto {
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @IsNotEmpty()
  @IsUUID()
  menuId: string;

  @IsNotEmpty()
  @IsArray()
  productIds: string[];
}
