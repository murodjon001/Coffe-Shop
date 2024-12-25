import { ISuperUserBaseEntity } from './super-user-base-entity.interface';

export interface ISuperUserTokenEntity extends ISuperUserBaseEntity {
  password?: string;
}
