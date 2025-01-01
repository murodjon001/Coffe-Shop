import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductAdministrationService } from './product.administration.service';
import { AdministratorJwtGuard } from 'src/infrastructure/security/administrator/guards/administrator-jwt.guard';
import { CreateProductDto } from './dtos/create-product.dto';

@UseGuards(AdministratorJwtGuard)
@Controller('administration/products')
export class ProductAdministrationController {
  constructor(private readonly service: ProductAdministrationService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.service.createProduct(dto);
  }

  //TODO: [Business debt] implement updateProduct method

  @Get(':id/single')
  getProduct(@Param('id') id: string) {
    return this.service.getProductById(id);
  }

  @Get(':shopId/by-shop')
  getProductByShop(
    @Param('shopId') shopId: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ) {
    return this.service.getProductByShopId(shopId, skip || 0, take || 10);
  }

  @Delete(':id/removed')
  deleteProduct(@Param('id') id: string) {
    return this.service.deleteProduct(id);
  }
}
