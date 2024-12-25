import { IBaseEntity } from './base-entity.interface';

export interface ISuperUserBaseEntity extends IBaseEntity {
  name: string;
  surname: string;
  phone: string;
}
