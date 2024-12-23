import { IClientBaseEntity } from 'src/shared/interfaces/client-base-entity.interface';
import { PasswordVo } from 'src/shared/value-objects/password';

export interface IClientEntity extends IClientBaseEntity {
  password?: PasswordVo;
}
