import {
  Body,
  Controller,
  Param,
  Query,
  Patch,
  UseGuards,
  Get,
} from '@nestjs/common';
import { OrderAdministrationService } from './order.administration.service';
import { AdministratorJwtGuard } from 'src/infrastructure/security/administrator/guards/administrator-jwt.guard';
import { UpdateOrderDto } from './dtos/update-order.dto';

@UseGuards(AdministratorJwtGuard)
@Controller('administration/orders')
export class OrderAdministrationController {
  constructor(private readonly service: OrderAdministrationService) {}

  @Get(':clientId/by-client')
  findOrders(
    @Param('clientId') clientId: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ) {
    return this.service.findOrderByClientId(clientId, skip, take);
  }

  @Patch(':id/changed')
  updateOrder(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return this.service.updateOrder(id, dto);
  }
}
