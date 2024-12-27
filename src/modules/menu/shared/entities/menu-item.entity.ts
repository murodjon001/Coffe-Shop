import { BaseEntity } from 'src/shared/entities/base-entity';
import { IMenuItemEntity } from '../interfaces/menu-item-entity.interface';
import { ProductEntity } from './product.entity';
import { IProductBaseEntity } from 'src/shared/interfaces/product-base-entity.interface';
import { ICategoryBaseEntity } from 'src/shared/interfaces/category-base-entity.interface';
import { CategoryEntity } from './category.entity';

export class MenuItemEntity extends BaseEntity {
  categoryId: string;
  menuId: string;
  category: CategoryEntity;

  products: ProductEntity[] = [];

  constructor(params: IMenuItemEntity) {
    super(params);

    this.categoryId = params.categoryId;
    this.menuId = params.menuId;
  }

  withProduct(params: IProductBaseEntity[]) {
    this.products = params.map((el) => new ProductEntity(el));

    return this;
  }

  withCategory(params: ICategoryBaseEntity) {
    this.category = new CategoryEntity(params);

    return this;
  }
}
