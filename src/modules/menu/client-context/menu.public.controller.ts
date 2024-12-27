import { Controller, Get, Param } from '@nestjs/common';
import { MenuPublicService } from './menu.public.service';

@Controller('public/menus')
export class MenuPublicController {
  constructor(private readonly service: MenuPublicService) {}

  @Get(':shopId/list')
  getMenusWithItemsByShopId(@Param('shopId') id: string) {
    return this.service.getMenusByShopId(id);
  }
}
