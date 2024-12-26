import { ICoffeeShopBaseEntity } from '../interfaces/coffee-shop-base-entity.interface';
import { BaseEntity } from './base-entity';

export class CoffeeShopBaseEntity extends BaseEntity {
  shopName: string;
  logo?: string;
  phone: string;
  address?: string;
  latitude?: number;
  longitude?: number;

  constructor(params: ICoffeeShopBaseEntity) {
    super(params);

    this.shopName = params.shopName;
    this.logo = params.logo;
    this.phone = params.phone;
    this.address = params.address;
    this.latitude = params.latitude;
    this.longitude = params.longitude;
  }
}
