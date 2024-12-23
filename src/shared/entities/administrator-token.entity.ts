import { IAdministratorTokenEntity } from '../interfaces/administrator-token-entity.entity';
import { PasswordVo } from '../value-objects/password';
import { AdministratorBaseEntity } from './administrator-base.entity';

export class AdministratorTokenEntity extends AdministratorBaseEntity {
  password?: PasswordVo;

  constructor(params: IAdministratorTokenEntity) {
    super(params);

    if (params.password) {
      this.password = PasswordVo.fromHash(params.password);
    } else {
      this.password = undefined;
    }
  }
}
