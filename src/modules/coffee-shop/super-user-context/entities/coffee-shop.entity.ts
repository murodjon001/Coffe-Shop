import { CoffeeShopBaseEntity } from 'src/shared/entities/coffee-shop.base.entity';
import { ICoffeeShopBaseEntity } from 'src/shared/interfaces/coffee-shop-base-entity.interface';
import { UpdateCoffeeShopDto } from '../dtos/update-coffee-shop.dto';

export class CoffeeShopEntity extends CoffeeShopBaseEntity {
  constructor(params: ICoffeeShopBaseEntity) {
    super(params);
  }

  update(dto: UpdateCoffeeShopDto) {
    this.shopName = dto.shopName || this.shopName;
    this.phone = dto.phone || this.phone;
    this.address = dto.address || this.address;
    this.logo = dto.logo || this.logo;
    this.latitude = dto.latitude || dto.latitude;
    this.longitude = dto.longitude || dto.longitude;
  }
}
