import { ISuperUserBaseEntity } from '../interfaces/super-user-base-entity.interface';
import { BaseEntity } from './base-entity';

export class SuperUserBaseEntity extends BaseEntity {
  name: string;
  surname: string;
  phone: string;

  constructor(params: ISuperUserBaseEntity) {
    super(params);

    this.name = params.name;
    this.surname = params.surname;
    this.phone = params.phone;
  }
}
