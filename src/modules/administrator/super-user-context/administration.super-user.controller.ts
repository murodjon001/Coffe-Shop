import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdministrationSuperUserService } from './administration.super-user.service';
import { SuperUserJwtGuard } from 'src/infrastructure/security/super-user/guards/super-user-jwt.guard';
import { RegistrationAdminDto } from './dtos/create-administrator.dto';
import { UpdatePersonalDataAdministratorDto } from './dtos/update-administrator.dto';

@UseGuards(SuperUserJwtGuard)
@Controller('super-user/administrators')
export class AdministratorSuperUserController {
  constructor(private readonly service: AdministrationSuperUserService) {}

  @Post()
  createAdmin(@Body() dto: RegistrationAdminDto) {
    return this.service.createAdministrator(dto);
  }

  @Patch(':id/personal-data-changed')
  updateAdministrator(
    @Body() dto: UpdatePersonalDataAdministratorDto,
    @Param('id') id: string,
  ) {
    return this.service.updateAdministrator(dto, id);
  }

  @Get(':id/single')
  getAdministrator(@Param('id') id: string) {
    return this.service.getAdministrator(id);
  }

  @Get(':shopId/by-shop')
  getAdministratorsByShopId(@Param('shopId') id: string) {
    return this.service.getAdministratorsByShopId(id);
  }

  @Get()
  getAllAdministrators(
    @Query('skip') skip: number,
    @Query('take') take: number,
  ) {
    return this.service.getAllAdministrators(skip || 0, take || 10);
  }
}
