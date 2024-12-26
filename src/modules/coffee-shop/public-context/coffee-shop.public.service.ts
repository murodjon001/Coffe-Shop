import { Injectable } from '@nestjs/common';
import { CoffeeShopRepository } from '../repository/coffee-shop.repository';

@Injectable()
export class CoffeeShopPublicService {
  constructor(private readonly repository: CoffeeShopRepository) {}

  async getAllCoffeeShop() {
    return await this.repository.findAll();
  }
}
