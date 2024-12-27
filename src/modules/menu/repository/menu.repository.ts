import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { MenuEntity } from '../shared/entities/menu.entity';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { SystemError } from 'src/shared/system-error.enum';
import { MenuItemEntity } from '../shared/entities/menu-item.entity';

@Injectable()
export class MenuRepository {
  private readonly logger = new Logger(MenuRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async save(entity: MenuEntity) {
    try {
      const createdMenu = await this.prisma.menu.upsert({
        where: {
          id: entity.id,
        },
        create: {
          id: entity.id,
          createdAt: entity.createdAt,
          updatedAt: entity.updateAt,
          coffeeShopId: entity.coffeeShopId,
          season: entity.season,
        },
        update: {
          coffeeShopId: entity.coffeeShopId,
          season: entity.season,
        },
      });

      return createdMenu;
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while save',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async findById(id: string) {
    try {
      const menu = await this.prisma.menu.findUnique({
        where: {
          id,
        },
      });

      if (!menu) {
        return null;
      }

      return menu;
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while findById',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async findByCoffeeShopId(coffeeShopId: string) {
    try {
      const menus = await this.prisma.menu.findMany({
        where: {
          coffeeShopId,
        },
      });

      return menus.map((el) => new MenuEntity(el));
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while findByCoffeeShopId',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async addProductsToMenu(
    menuId: string,
    categoryId: string,
    productIds: string[],
  ) {
    try {
      const menuItem = await this.prisma.menuItem.create({
        data: {
          categoryId,
          menuId,
          products: {
            createMany: {
              data: productIds.map((el) => {
                return {
                  productId: el,
                };
              }),
            },
          },
        },
        include: {
          products: {
            include: {
              product: true,
            },
          },
        },
      });

      return new MenuItemEntity(menuItem).withProduct(
        menuItem.products.map((el) => el.product),
      );
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while addProductsToMenu',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async deleteProductToMenu(menuItemId: string, productId: string) {
    try {
      await this.prisma.menuItemsProducts.delete({
        where: {
          productId_menuItemId: {
            menuItemId,
            productId,
          },
        },
      });
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while deleteProductToMenu',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async findMenusWithItemsByShopId(coffeeShopId: string) {
    try {
      const menus = await this.prisma.menu.findMany({
        where: {
          coffeeShopId,
          isActive: true,
        },
        include: {
          menuItems: {
            include: {
              category: true,
              products: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
      });

      return menus.map((el) => new MenuEntity(el).withMenuItems(el.menuItems));
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while findByCoffeeShopId',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }
}
