import { IClientBaseEntity } from '../interfaces/client-base-entity.interface';
import { BaseEntity } from './base-entity';

export class ClientBaseEntity extends BaseEntity {
  name: string;
  surname: string;
  phone: string;
  email: string;
  avatar?: string;
  isConfirmed: boolean;
  coffeeShopId: string;

  constructor(params: IClientBaseEntity) {
    super(params);

    this.name = params.name;
    this.surname = params.surname;
    this.email = params.email;
    this.avatar = params.avatar;
    this.isConfirmed = params.isConfirmed;
    this.phone = params.phone;
    this.coffeeShopId = params.coffeeShopId;
  }
}
