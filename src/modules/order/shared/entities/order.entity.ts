import { BaseEntity } from 'src/shared/entities/base-entity';
import { TOrderStatus } from '../types/order-status.type';
import { ClientEntity } from './client.entity';
import { IOrderEntity } from '../interfaces/order-entity.interface';
import { IClientBaseEntity } from 'src/shared/interfaces/client-base-entity.interface';
import { OrderProductEntity } from './order-product.entity';
import { IPrismaOrderProduct } from '../interfaces/prisma-order-product.interface';
import { UpdateOrderDto } from '../../administration-context/dtos/update-order.dto';

export class OrderEntity extends BaseEntity {
  orderDate: Date;
  clientNote?: string;

  clientId: string;
  coffeeShopId: string;
  orderStatus: TOrderStatus;

  client: ClientEntity;
  orderProduct: OrderProductEntity[] = [];

  constructor(params: IOrderEntity) {
    super(params);

    this.orderStatus = params.orderStatus;

    this.orderDate = params.orderDate;
    this.clientNote = params.clientNote;
    this.clientId = params.clientId;
    this.coffeeShopId = params.coffeeShopId;
  }

  withClient(params?: IClientBaseEntity) {
    if (params) {
      this.client = new ClientEntity(params);
    }

    return this;
  }

  withOrderProduct(params: IPrismaOrderProduct[]) {
    if (params.length) {
      this.orderProduct = params.map((el) =>
        new OrderProductEntity(el).withProduct(el.product),
      );
    }

    return this;
  }

  update(dto: UpdateOrderDto) {
    this.orderStatus = dto.orderStatus || this.orderStatus;
  }
}
