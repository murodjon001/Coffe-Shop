import { CoffeeShopBaseEntity } from 'src/shared/entities/coffee-shop.base.entity';
import { ICoffeeShopBaseEntity } from 'src/shared/interfaces/coffee-shop-base-entity.interface';

export class CoffeeShopEntity extends CoffeeShopBaseEntity {
  constructor(params: ICoffeeShopBaseEntity) {
    super(params);
  }
}
