import { BaseEntity } from 'src/shared/entities/base-entity';
import { IProductBaseEntity } from 'src/shared/interfaces/product-base-entity.interface';

export class ProductEntity extends BaseEntity {
  constructor(params: IProductBaseEntity) {
    super(params);
  }
}
