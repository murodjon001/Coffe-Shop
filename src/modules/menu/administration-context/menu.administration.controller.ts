import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MenuAdministrationService } from './menu.administration.service';
import { CreateMenuDto } from './dtos/create-menu.dto';
import { AdministratorJwtGuard } from 'src/infrastructure/security/administrator/guards/administrator-jwt.guard';
import { AddProductToMenuDto } from './dtos/add-product-to-menu.dto';

@UseGuards(AdministratorJwtGuard)
@Controller('administration/menus')
export class MenuAdministrationController {
  constructor(private readonly service: MenuAdministrationService) {}

  @Post()
  createMenu(@Body() dto: CreateMenuDto) {
    return this.service.create(dto);
  }

  @Get(':id/single')
  getMenuById(@Param('id') id: string) {
    return this.service.getMenuById(id);
  }

  @Get(':shopId/by-shop')
  getMenusByShopId(@Param('shopId') shopId: string) {
    return this.service.getMenusByShopId(shopId);
  }

  @Post('products')
  addProductsToMenu(@Body() dto: AddProductToMenuDto) {
    return this.service.addProductsToMenu(dto);
  }
}
