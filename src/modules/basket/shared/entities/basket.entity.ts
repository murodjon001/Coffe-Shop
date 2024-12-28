import { BasketItemEntity } from './basket-item.entity';
import { IBasketEntityParams } from '../interfaces/basket-entity-params.interface';
import { IPrismaBasketItem } from '../interfaces/prisma-basket-item.interface';
import { BaseEntity } from 'src/shared/entities/base-entity';

export class BasketEntity extends BaseEntity {
  clientId: string;

  basketItems: BasketItemEntity[] = [];

  constructor(params: IBasketEntityParams) {
    super(params);

    this.clientId = params.clientId;
  }

  withBasketItems(params: IPrismaBasketItem[]) {
    if (!params?.length) return this;

    this.basketItems = params.map((el) => {
      return new BasketItemEntity(el).withProduct(el.product);
    });

    return this;
  }
}
