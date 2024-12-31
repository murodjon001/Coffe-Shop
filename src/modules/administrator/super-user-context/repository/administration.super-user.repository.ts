import { Injectable, Logger } from '@nestjs/common';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { SystemError } from 'src/shared/system-error.enum';
import { AdministratorEntity } from '../../shared/entities/administrator.entity';

@Injectable()
export class AdministrationSuperUserRepository {
  logger = new Logger(AdministrationSuperUserRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async save(entity: AdministratorEntity) {
    try {
      const administrator = await this.prisma.administrator.upsert({
        where: {
          id: entity.id,
        },
        create: {
          ...entity,
          password: entity.password.getHash,
        },
        update: {
          name: entity.name,
          surname: entity.surname,
          coffeeShopId: entity.coffeeShopId,
          email: entity.email,
          phone: entity.phone,
        },
      });

      if (!administrator) {
        return null;
      }

      return new AdministratorEntity(administrator);
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while save',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async isExistEmail(email: string, shopId: string, id?: string) {
    try {
      const where = {
        email,
        coffeeShopId: shopId,
      };

      if (id) {
        where['id'] = {
          not: id,
        };
      }

      const administrator = await this.prisma.administrator.findFirst({
        where,
        select: {
          id: true,
        },
      });

      if (!administrator) {
        return false;
      }

      return true;
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while isExistEmail',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async findById(id: string) {
    try {
      const administrator = await this.prisma.administrator.findUnique({
        where: {
          id,
        },
      });

      if (!administrator) {
        return null;
      }

      return new AdministratorEntity(administrator);
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while findById',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async findByShopId(shopId: string) {
    try {
      const administrators = await this.prisma.administrator.findMany({
        where: {
          coffeeShopId: shopId,
        },
      });

      return administrators.map((el) => new AdministratorEntity(el));
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while findById',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async findAll(skip: number, take: number) {
    try {
      const administrators = await this.prisma.administrator.findMany({
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      });

      const count = await this.prisma.administrator.count();

      return {
        data: administrators.map((el) => new AdministratorEntity(el)),
        count,
      };
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while findAll',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async delete(id: string) {
    try {
      await this.prisma.administrator.delete({
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
