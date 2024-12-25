import { ISuperUserTokenEntity } from '../interfaces/super-user-token-entity.entity';
import { PasswordVo } from '../value-objects/password';
import { SuperUserBaseEntity } from './super-user-base.entity';

export class SuperUserTokenEntity extends SuperUserBaseEntity {
  password?: PasswordVo;

  constructor(params: ISuperUserTokenEntity) {
    super(params);

    if (params.password) {
      this.password = PasswordVo.fromHash(params.password);
    } else {
      this.password = undefined;
    }
  }
}
