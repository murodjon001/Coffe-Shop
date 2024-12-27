import { TMenuSeason } from '../types/menu-season.type';
import { IBaseEntity } from './base-entity.interface';

export interface IMenuBaseEntity extends IBaseEntity {
  season: TMenuSeason;
  coffeeShopId: string;
}
