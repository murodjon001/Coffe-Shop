import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { CoffeeShopEntity } from '../entities/coffee-shop.entity';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { SystemError } from 'src/shared/system-error.enum';

@Injectable()
export class CoffeeShopRepository {
  private readonly logger = new Logger(CoffeeShopRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async save(entity: CoffeeShopEntity) {
    try {
      const createdCoffeeShop = await this.prisma.coffeeShop.upsert({
        where: {
          id: entity.id,
        },
        create: {
          ...entity,
        },
        update: {
          ...entity,
        },
      });

      return new CoffeeShopEntity(createdCoffeeShop);
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
      const coffeeShop = await this.prisma.coffeeShop.findUnique({
        where: {
          id,
        },
      });

      return new CoffeeShopEntity(coffeeShop);
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while findById',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async findAll() {
    try {
      const coffeeShops = await this.prisma.coffeeShop.findMany();

      return coffeeShops.map((el) => new CoffeeShopEntity(el));
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while findAll',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async isExistNameOrPhone(name: string, phone: string, id?: string) {
    try {
      const where = {
        OR: [{ shopName: name }, { phone }],
      };

      if (id) {
        where['id'] = {
          not: id,
        };
      }

      const coffeeShop = await this.prisma.coffeeShop.findFirst({
        where,
      });

      if (!coffeeShop) {
        return false;
      }

      return true;
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while isExistNameOrPhone',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }
}
