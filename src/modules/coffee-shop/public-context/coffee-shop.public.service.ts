import { Injectable } from '@nestjs/common';
import { CoffeeShopRepository } from '../repository/coffee-shop.repository';

@Injectable()
export class CoffeeShopService {
  constructor(private readonly repository: CoffeeShopRepository) {}
}
