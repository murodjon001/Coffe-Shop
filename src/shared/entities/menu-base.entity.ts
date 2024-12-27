import { IMenuBaseEntity } from '../interfaces/menu-base-entity.interface';
import { TMenuSeason } from '../types/menu-season.type';
import { BaseEntity } from './base-entity';

export class MenuBaseEntity extends BaseEntity {
  season: TMenuSeason;
  coffeeShopId: string;

  constructor(params: IMenuBaseEntity) {
    super(params);

    this.season = params.season;
    this.coffeeShopId = params.coffeeShopId;
  }
}
