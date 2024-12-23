import { ClientBaseEntity } from 'src/shared/entities/client-base.entity';
import { IClientEntity } from '../interfaces/client-entity';
import { PasswordVo } from 'src/shared/value-objects/password';

export class ClientEntity extends ClientBaseEntity {
  password?: PasswordVo;

  constructor(params: IClientEntity) {
    super(params);

    if (params.password) {
      this.password = params.password;
    }
  }
}
