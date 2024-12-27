import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { CategoryEntity } from '../entities/category.entity';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { SystemError } from 'src/shared/system-error.enum';

@Injectable()
export class CategoryRepository {
  private readonly logger = new Logger(CategoryEntity.name);

  constructor(private readonly prisma: PrismaService) {}

  async save(entity: CategoryEntity) {
    try {
      const createdCategory = await this.prisma.category.upsert({
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

      return new CategoryEntity(createdCategory);
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while save',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async getCategoryById(id: string) {
    try {
      const category = await this.prisma.category.findUnique({
        where: {
          id,
        },
      });

      if (!category) {
        return null;
      }

      return new CategoryEntity(category);
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while getCategoryById',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async getCategoryByShopId(coffeeShopId: string) {
    try {
      const categories = await this.prisma.category.findMany({
        where: {
          coffeeShopId,
        },
      });

      return categories.map((el) => new CategoryEntity(el));
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while getCategoryById',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async delete(id: string) {
    try {
      await this.prisma.category.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while delete',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }
}
