import { UpdatePersonalDataDto } from 'src/modules/client/client-context/dto/update-personal-data.dto';
import { IClientBaseEntity } from '../interfaces/client-base-entity.interface';
import { BaseEntity } from './base-entity';

export class ClientBaseEntity extends BaseEntity {
  name: string;
  surname: string;
  phone: string;
  email: string;
  avatar?: string;
  isConfirmed: boolean;

  constructor(params: IClientBaseEntity) {
    super(params);

    this.name = params.name;
    this.surname = params.surname;
    this.email = params.email;
    this.avatar = params.avatar;
    this.isConfirmed = params.isConfirmed;
  }
}
