import { IBaseEntity } from './base-entity.interface';

export interface ICoffeeShopBaseEntity extends IBaseEntity {
  shopName: string;
  logo?: string;
  phone: string;
  address?: string;
  latitude?: number;
  longitude?: number;
}
