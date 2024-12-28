import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrderClientService } from './order-client.service';
import { ClientJwtAuthGuard } from 'src/infrastructure/security/client/guards/client.jwt.guard';
import { GetCurrentUser } from 'src/infrastructure/decorators/get-current-user.decorator';
import { ClientTokenEntity } from 'src/shared/entities/client-token.entity';
import { CreateOrderDto } from './dtos/create-order.dto';

@UseGuards(ClientJwtAuthGuard)
@Controller('client/orders')
export class OrderClientController {
  constructor(private readonly service: OrderClientService) {}

  @Get(':id/single')
  getOrderById(@Param('id') id: string) {
    return this.service.getOrderById(id);
  }

  @Get()
  findOrdersByClientId(
    @Query('skip') skip: number,
    @Query('take') take: number,
    @GetCurrentUser() client: ClientTokenEntity,
  ) {
    return this.service.findOrdersByClientId(skip, take, client.id);
  }

  @Post()
  makeOrder(
    @Body() dto: CreateOrderDto,
    @GetCurrentUser() client: ClientTokenEntity,
  ) {
    return this.service.makeOrder(client, dto);
  }
}
