import { IAdministratorBaseEntity } from '../interfaces/administrator-base-entity.interface';
import { BaseEntity } from './base-entity';

export class AdministratorBaseEntity extends BaseEntity {
  name: string;
  surname: string;
  phone: string;

  constructor(params: IAdministratorBaseEntity) {
    super(params);

    this.name = params.name;
    this.surname = params.surname;
    this.phone = params.phone;
  }
}
