import { ProductBaseEntity } from 'src/shared/entities/product-base.entity';
import { IProductBaseEntity } from 'src/shared/interfaces/product-base-entity.interface';

export class ProductEntity extends ProductBaseEntity {
  constructor(params: IProductBaseEntity) {
    super(params);
  }
}
