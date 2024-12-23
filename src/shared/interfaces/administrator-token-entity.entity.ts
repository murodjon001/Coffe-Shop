import { IAdministratorBaseEntity } from './administrator-base-entity.interface';

export interface IAdministratorTokenEntity extends IAdministratorBaseEntity {
  password?: string;
}
