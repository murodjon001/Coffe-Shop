import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SuperUserJwtGuard } from 'src/infrastructure/security/super-user/guards/super-user-jwt.guard';
import { CoffeeShopService } from './coffee-shop.service';
import { CreateCoffeeShopDto } from './dtos/create-coffee-shop.dto';
import { UpdateCoffeeShopDto } from './dtos/update-coffee-shop.dto';

@UseGuards(SuperUserJwtGuard)
@Controller('super-user/coffee-shops')
export class CoffeeShopController {
  constructor(private readonly service: CoffeeShopService) {}

  @Post()
  createCoffeeShop(@Body() dto: CreateCoffeeShopDto) {
    return this.service.createCoffeeShop(dto);
  }

  @Patch(':id/updated')
  updateCoffeeShop(@Body() dto: UpdateCoffeeShopDto, @Param('id') id: string) {
    return this.service.updateCoffeeShop(id, dto);
  }

  @Get(':id/single')
  getCoffeeShop(@Param('id') id: string) {
    return this.service.getCoffeeShop(id);
  }
}
