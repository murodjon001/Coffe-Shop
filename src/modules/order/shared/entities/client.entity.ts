import { ClientBaseEntity } from 'src/shared/entities/client-base.entity';
import { IClientBaseEntity } from 'src/shared/interfaces/client-base-entity.interface';

export class ClientEntity extends ClientBaseEntity {
  constructor(params: IClientBaseEntity) {
    super(params);
  }
}
