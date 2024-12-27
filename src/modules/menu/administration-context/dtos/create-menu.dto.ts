import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { TMenuSeason } from 'src/shared/types/menu-season.type';

export class CreateMenuDto {
  @IsNotEmpty()
  @IsEnum(['SPRING', 'SUMMER', 'WINTER', 'FALL', 'UNIVERSAL'], {
    message: 'Menu season must be either SPRING SUMMER WINTER FALL UNIVERSAL',
  })
  season: TMenuSeason;

  @IsNotEmpty()
  @IsUUID()
  coffeeShopId: string;
}
