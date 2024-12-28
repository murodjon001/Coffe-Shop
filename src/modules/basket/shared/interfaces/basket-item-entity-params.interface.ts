import { IBaseEntity } from 'src/shared/interfaces/base-entity.interface';

export interface IBasketItemEntityParams extends IBaseEntity {
  quantity: number;
}
