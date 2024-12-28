import { Injectable } from '@nestjs/common';
import { OrderClientRepository } from './repository/order-client.repository';
import { CreateOrderDto } from './dtos/create-order.dto';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { SystemError } from 'src/shared/system-error.enum';
import { ClientTokenEntity } from 'src/shared/entities/client-token.entity';
import { OrderEntity } from '../shared/entities/order.entity';

@Injectable()
export class OrderClientService {
  constructor(private readonly repository: OrderClientRepository) {}

  async getOrderById(id: string) {
    const order = await this.repository.getOrderById(id);

    if (!order) {
      throw new CustomHttpException(
        'Order not found',
        SystemError.NOT_FOUND,
        404,
      );
    }

    return order;
  }

  async findOrdersByClientId(skip: number, take: number, clientId: string) {
    const orders = await this.repository.findOrdersByClientId(
      skip,
      take,
      clientId,
    );

    return orders;
  }

  async makeOrder(client: ClientTokenEntity, dto: CreateOrderDto) {
    await this.validateBasket(dto.basketId);

    const order = this.createEntity(dto, client);

    const createdOrder = await this.repository.createOrder(order, dto.basketId);

    //TODO: [Business debt] implement event emitter and send message to client by email

    return createdOrder;
  }

  private createEntity(dto: CreateOrderDto, client: ClientTokenEntity) {
    return new OrderEntity({
      clientId: client.id,
      coffeeShopId: dto.coffeeShopId,
      orderDate: dto.orderDate,
      orderStatus: 'PENDING',
      clientNote: dto.clientNote,
    });
  }

  private async validateBasket(id: string) {
    const basketItem = await this.repository.validateBasket(id);

    if (!basketItem) {
      throw new CustomHttpException(
        'Basket item is empty',
        SystemError.CONFLICT,
        409,
      );
    }
  }
}
