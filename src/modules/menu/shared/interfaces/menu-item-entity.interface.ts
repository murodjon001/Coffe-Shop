import { IBaseEntity } from 'src/shared/interfaces/base-entity.interface';

export interface IMenuItemEntity extends IBaseEntity {
  categoryId: string;
  menuId: string;
}
