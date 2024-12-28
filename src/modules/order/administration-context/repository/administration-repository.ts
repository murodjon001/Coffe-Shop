import { Injectable, Logger } from '@nestjs/common';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { OrderEntity } from '../../shared/entities/order.entity';
import { SystemError } from 'src/shared/system-error.enum';

@Injectable()
export class OrderAdministrationRepository {
  private readonly logger = new Logger(OrderAdministrationRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async getOrdersByClientId(skip: number, take: number, clientId: string) {
    try {
      const orders = await this.prisma.order.findMany({
        where: { clientId },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          client: true,
          orderProducts: {
            include: {
              product: true,
            },
          },
        },
        skip,
        take,
      });

      const total = await this.prisma.order.count({ where: { clientId } });

      return {
        total,
        data: orders.map((el) => {
          return new OrderEntity(el)
            .withClient(el.client)
            .withOrderProduct(el.orderProducts);
        }),
      };
    } catch (error) {
      this.logger.error(error);

      throw new CustomHttpException(
        'Internal Server Error',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async updateOrder(entity: OrderEntity) {
    try {
      const updatedOrder = await this.prisma.order.update({
        where: {
          id: entity.id,
        },
        data: {
          orderStatus: entity.orderStatus,
          clientNote: entity.clientNote,
        },
        include: {
          client: true,
          orderProducts: {
            include: {
              product: true,
            },
          },
        },
      });

      return new OrderEntity(updatedOrder)
        .withClient(updatedOrder.client)
        .withOrderProduct(updatedOrder.orderProducts);
    } catch (error) {
      this.logger.error(error);

      throw new CustomHttpException(
        'Internal Server Error',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async getOrderById(id: string) {
    try {
      const order = await this.prisma.order.findUnique({
        where: {
          id,
        },
        include: {
          client: true,
          orderProducts: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!order) {
        return null;
      }

      return new OrderEntity(order)
        .withClient(order.client)
        .withOrderProduct(order.orderProducts);
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Internal Server Error',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }
}
