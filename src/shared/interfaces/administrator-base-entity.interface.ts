import { IBaseEntity } from './base-entity.interface';

export interface IAdministratorBaseEntity extends IBaseEntity {
  name: string;
  surname: string;
  phone: string;
  email: string;
  coffeeShopId: string;
}
