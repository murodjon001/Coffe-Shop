import { IProductBaseEntity } from '../interfaces/product-base-entity.interface';
import { BaseEntity } from './base-entity';

export class ProductBaseEntity extends BaseEntity {
  title: string;
  price: number;
  discountPercent?: number;
  description?: string;
  image?: string;
  isPurchasable: boolean;
  categoryId: string;
  coffeeShopId: string;

  constructor(params: IProductBaseEntity) {
    super(params);

    this.title = params.title;
    this.price = params.price;
    this.discountPercent = params.discountPercent;
    this.description = params.description;
    this.image = params.image;
    this.isPurchasable = params.isPurchasable;
    this.categoryId = params.categoryId;
    this.coffeeShopId = params.coffeeShopId;
  }
}
