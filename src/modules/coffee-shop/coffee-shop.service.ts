import { Injectable } from '@nestjs/common';
import { CoffeeShopRepository } from './repository/coffee-shop.repository';
import { CreateCoffeeShopDto } from './dtos/create-coffee-shop.dto';

@Injectable()
export class CoffeeShopService {
  constructor(private readonly repository: CoffeeShopRepository) {}

  createCoffeeShop(dto: CreateCoffeeShopDto) {}
}
