import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdministratorJwtGuard } from 'src/infrastructure/security/administrator/guards/administrator-jwt.guard';
import { ClientAdministrationService } from './client.administration.service';

@UseGuards(AdministratorJwtGuard)
@Controller('administration/clients')
export class ClientAdministrationController {
  constructor(private readonly service: ClientAdministrationService) {}

  @Get(':shopId/list')
  getAllClients(
    @Query('skip') skip: number,
    @Query('take') take: number,
    @Param('shopId') shopId: string,
  ) {
    return this.service.getAllClients(skip || 0, take || 10, shopId);
  }

  @Get(':id/single')
  getClientById(@Param('id') id: string) {
    return this.service.getClientById(id);
  }

  @Delete(':id/removed')
  deleteClient(@Param('id') id: string) {
    return this.service.deleteClient(id);
  }
}
