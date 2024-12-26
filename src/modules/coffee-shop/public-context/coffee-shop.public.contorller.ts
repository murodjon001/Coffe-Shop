import { Controller, Get } from '@nestjs/common';
import { CoffeeShopPublicService } from './coffee-shop.public.service';

@Controller('public/coffee-shops')
export class CoffeeShopPublicController {
  constructor(private readonly service: CoffeeShopPublicService) {}

  @Get()
  getAllCoffeeShops() {
    return this.service.getAllCoffeeShop();
  }
}
