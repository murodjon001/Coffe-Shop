import { IBaseEntity } from './base-entity.interface';

export interface IProductBaseEntity extends IBaseEntity {
  title: string;
  price: number;
  discountPercent?: number;
  description?: string;
  image?: string;
  isPurchasable: boolean;
  categoryId: string;
  coffeeShopId: string;
}
