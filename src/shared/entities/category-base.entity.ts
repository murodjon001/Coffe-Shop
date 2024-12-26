import { ICategoryBaseEntity } from '../interfaces/category-base-entity.interface';
import { BaseEntity } from './base-entity';

export class CategoryBaseEntity extends BaseEntity {
  title: string;
  image?: string;
  isActive: boolean;
  menuId: string;
  coffeeShopId: string;

  constructor(params: ICategoryBaseEntity) {
    super(params);

    this.title = params.title;
    this.image = params.image;
    this.menuId = params.menuId;
    this.coffeeShopId = params.coffeeShopId;
  }
}
