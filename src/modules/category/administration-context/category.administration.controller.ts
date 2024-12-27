import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoryAdministrationService } from './category.administration.service';
import { SaveCategoryDto } from './dtos/save.category.dto';

@Controller('administration/categories')
export class CategoryAdministrationController {
  constructor(private readonly service: CategoryAdministrationService) {}

  @Post()
  createCategory(@Body() dto: SaveCategoryDto) {
    return this.service.create(dto);
  }

  //TODO:[Business debt] should implement updateCategory

  @Get(':id/single')
  getCategoryById(@Param('id') id: string) {
    return this.service.getCategoryById(id);
  }

  @Get(':shopId/by-shop')
  getCategoryByShopId(@Param('shopId') id: string) {
    return this.service.getCategoryByShopId(id);
  }

  @Delete(':id/removed')
  deleteCategory(@Param('id') id: string) {
    return this.service.deleteCategory(id);
  }
}
