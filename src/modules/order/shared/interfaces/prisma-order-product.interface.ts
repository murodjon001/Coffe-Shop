import { IBaseEntity } from 'src/shared/interfaces/base-entity.interface';
import { IProductBaseEntity } from 'src/shared/interfaces/product-base-entity.interface';

export interface IPrismaOrderProduct extends IBaseEntity {
  quantity: number;

  product: IProductBaseEntity;
}
