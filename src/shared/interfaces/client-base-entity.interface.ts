import { IBaseEntity } from './base-entity.interface';

export interface IClientBaseEntity extends IBaseEntity {
  name: string;
  surname: string;
  phone: string;
  email: string;
  avatar?: string;
  isConfirmed: boolean;
}
