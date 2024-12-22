import { IBaseEntity } from '../interfaces/base-entity.interface';
import { uuid } from '../utils/uuid';

export class BaseEntity {
  id: string;
  createdAt: Date;
  updateAt: Date;

  constructor(params: IBaseEntity) {
    this.id = params.id || uuid();
    this.createdAt = params.createdAt || new Date();
    this.updateAt = params.updateAt || new Date();
  }
}
