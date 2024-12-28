import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { ProductEntity } from '../shared/entities/product.entity';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { SystemError } from 'src/shared/system-error.enum';

@Injectable()
export class ProductRepository {
  private readonly logger = new Logger(ProductRepository.name);

  constructor(private readonly prisma: PrismaService) {}
  async save(entity: ProductEntity) {
    try {
      const savedProduct = await this.prisma.product.upsert({
        where: {
          id: entity.id,
        },
        create: {
          ...entity,
        },
        update: { ...entity },
      });

      return new ProductEntity(savedProduct);
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
      const product = await this.prisma.product.findUnique({
        where: {
          id,
        },
      });

      return new ProductEntity(product);
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while findById',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async findByShopId(shopId: string, skip: number, take: number) {
    try {
      const products = await this.prisma.product.findMany({
        where: {
          coffeeShopId: shopId,
        },
        skip,
        take,
      });

      return products.map((el) => new ProductEntity(el));
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while findByShopId',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async delete(id: string) {
    try {
      await this.prisma.product.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while findByShopId',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }
}
