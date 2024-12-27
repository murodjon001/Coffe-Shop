import { MenuBaseEntity } from 'src/shared/entities/menu-base.entity';
import { IMenuBaseEntity } from 'src/shared/interfaces/menu-base-entity.interface';
import { MenuItemEntity } from './menu-item.entity';
import { IPrismaMenuProduct } from '../interfaces/prisma-menu-product.interface';

export class MenuEntity extends MenuBaseEntity {
  menuItems: MenuItemEntity[];

  constructor(params: IMenuBaseEntity) {
    super(params);
  }

  withMenuItems(params: IPrismaMenuProduct[]) {
    this.menuItems = params.map((el) =>
      new MenuItemEntity(el)
        .withProduct(el.products.map((el) => el.product))
        .withCategory(el.category),
    );

    return this;
  }
}
