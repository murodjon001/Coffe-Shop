import { IBaseEntity } from 'src/shared/interfaces/base-entity.interface';
import { TOrderStatus } from '../types/order-status.type';

export interface IOrderEntity extends IBaseEntity {
  orderDate: Date;
  clientNote?: string;

  clientId: string;
  coffeeShopId: string;
  orderStatus: TOrderStatus;
}
