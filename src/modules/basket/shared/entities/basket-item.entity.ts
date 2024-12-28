import { BaseEntity } from 'src/shared/entities/base-entity';
import { ProductEntity } from './product.entity';
import { IBasketItemEntityParams } from '../interfaces/basket-item-entity-params.interface';
import { IProductBaseEntity } from 'src/shared/interfaces/product-base-entity.interface';

export class BasketItemEntity extends BaseEntity {
  product: ProductEntity;

  basketId: string;
  quantity: number;

  constructor(params: IBasketItemEntityParams) {
    super(params);

    this.quantity = params.quantity;
  }

  withProduct(params?: IProductBaseEntity) {
    if (!params) return this;

    this.product = new ProductEntity(params);

    return this;
  }
}
