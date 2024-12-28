import { ProductEntity } from './product.entity';
import { IPrismaOrderProduct } from '../interfaces/prisma-order-product.interface';
import { BaseEntity } from 'src/shared/entities/base-entity';
import { IProductBaseEntity } from 'src/shared/interfaces/product-base-entity.interface';

export class OrderProductEntity extends BaseEntity {
  quantity: number;

  product: ProductEntity;

  constructor(params: IPrismaOrderProduct) {
    super(params);
  }

  withProduct(params: IProductBaseEntity) {
    this.product = new ProductEntity(params);

    return this;
  }
}
