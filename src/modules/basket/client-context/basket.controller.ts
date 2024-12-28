import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { ClientJwtAuthGuard } from 'src/infrastructure/security/client/guards/client.jwt.guard';
import { GetCurrentUser } from 'src/infrastructure/decorators/get-current-user.decorator';
import { AddBasketDto } from './dtos/add-basket.dto';
import { ClientTokenEntity } from 'src/shared/entities/client-token.entity';

@UseGuards(ClientJwtAuthGuard)
@Controller('client/baskets')
export class BasketController {
  constructor(private readonly service: BasketService) {}

  @Get()
  getBasket(@GetCurrentUser() client: ClientTokenEntity) {
    return this.service.getBasket(client.id);
  }

  @Put(':id/items')
  setProductInBasket(@Param('id') id: string, @Body() dto: AddBasketDto) {
    return this.service.setProductInBasket(id, dto);
  }

  @Delete(':id/:productId/removed')
  deleteItems(@Param('id') id: string, @Param('productId') productId: string) {
    return this.service.deleteBasketItem(id, productId);
  }
}
