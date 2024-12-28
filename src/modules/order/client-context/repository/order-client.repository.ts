import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { OrderEntity } from '../../shared/entities/order.entity';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { SystemError } from 'src/shared/system-error.enum';
import { ClientEntity } from '../../shared/entities/client.entity';

@Injectable()
export class OrderClientRepository {
  private logger = new Logger(OrderClientRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async getOrderById(id: string) {
    try {
      const order = await this.prisma.order.findUnique({
        where: {
          id,
        },
        include: {
          orderProducts: {
            include: {
              product: true,
            },
          },
          client: true,
        },
      });

      if (!order) return null;

      return new OrderEntity(order)
        .withClient(order.client)
        .withOrderProduct(order.orderProducts);
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while getOrderById',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async findOrdersByClientId(skip: number, take: number, clientId: string) {
    try {
      const orders = await this.prisma.order.findMany({
        where: {
          clientId,
        },
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
        skip: skip,
        take: take,
      });

      const total = await this.prisma.order.count({ where: { clientId } });

      return {
        data: orders.map((el) => {
          return new OrderEntity(el)
            .withClient(el.client)
            .withOrderProduct(el.orderProducts);
        }),
        total,
      };
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while findOrdersByClientId',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async getClient(clientId: string) {
    const client = await this.prisma.client.findFirst({
      where: {
        id: clientId,
      },
    });

    if (!client) {
      return null;
    }

    return new ClientEntity(client);
  }

  async createOrder(entity: OrderEntity, basketId: string) {
    try {
      const products = await this.prisma.basketItem.findMany({
        where: {
          basketId,
        },
        select: {
          productId: true,
          quantity: true,
        },
      });

      const order = await this.prisma.$transaction(async (tx) => {
        const order = await tx.order.create({
          data: {
            orderDate: entity.orderDate,
            clientId: entity.clientId,
            clientNote: entity.clientNote,
            orderStatus: 'PENDING',
            orderProducts: {
              createMany: {
                data: products.map((el) => {
                  return {
                    productId: el.productId,
                    quantity: el.quantity,
                  };
                }),
              },
            },
            coffeeShopId: entity.coffeeShopId,
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

        await tx.basketItem.deleteMany({
          where: {
            basketId: basketId,
          },
        });

        return order;
      });

      return new OrderEntity(order)
        .withClient(order.client)
        .withOrderProduct(order.orderProducts);
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while createOrder',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async validateBasket(id: string) {
    try {
      const basketItem = await this.prisma.basketItem.findFirst({
        where: {
          basketId: id,
        },
      });

      if (!basketItem) return false;

      return true;
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while validateBasket',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }
}
