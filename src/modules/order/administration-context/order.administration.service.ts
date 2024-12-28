import { Injectable } from '@nestjs/common';
import { OrderAdministrationRepository } from './repository/administration-repository';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { SystemError } from 'src/shared/system-error.enum';

@Injectable()
export class OrderAdministrationService {
  constructor(private readonly repository: OrderAdministrationRepository) {}

  async findOrderByClientId(clientId: string, skip: number, take: number) {
    const data = await this.repository.getOrdersByClientId(
      skip,
      take,
      clientId,
    );

    return data;
  }

  async updateOrder(id: string, dto: UpdateOrderDto) {
    const order = await this.validateOrder(id);

    order.update(dto);

    return await this.repository.updateOrder(order);
  }

  private async validateOrder(id: string) {
    const order = this.repository.getOrderById(id);

    if (!order) {
      throw new CustomHttpException(
        'Order not found',
        SystemError.NOT_FOUND,
        404,
      );
    }

    return order;
  }
}
