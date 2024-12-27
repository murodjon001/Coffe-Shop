import { Injectable } from '@nestjs/common';
import { MenuRepository } from '../repository/menu.repository';
import { CreateMenuDto } from './dtos/create-menu.dto';
import { MenuEntity } from '../shared/entities/menu.entity';
import { AddProductToMenuDto } from './dtos/add-product-to-menu.dto';

@Injectable()
export class MenuAdministrationService {
  constructor(private readonly repository: MenuRepository) {}

  async create(dto: CreateMenuDto) {
    //TODO:[Technical debt] implement private method checkMenuIsAlreadyExist. Note: Because I missed the deadline

    const menu = this.createEntity(dto);

    return await this.repository.save(menu);
  }

  //TODO: [Technical debt] implement method updateMenu. Note: Because I missed the deadline

  async getMenuById(id: string) {
    //TODO: [Technical debt] implement if check menu is found. Note: Because I missed the deadline

    return await this.repository.findById(id);
  }

  async getMenusByShopId(shopId: string) {
    await this.repository.findByCoffeeShopId(shopId);
  }

  async addProductsToMenu(dto: AddProductToMenuDto) {
    //TODO: [Technical debt] implement method checkProductsIsExist. Note Because I missed the deadline
    //TODO: [Technical debt] implement method checkCategoryIsExist. Note Because I missed the deadline

    return this.repository.addProductsToMenu(
      dto.menuId,
      dto.categoryId,
      dto.productIds,
    ); //technical debt: long parameter anti pattern
  }

  async deleteProductToMenu(menuItemId: string, productId: string) {
    await this.repository.deleteProductToMenu(menuItemId, productId);
  }

  // TODO: [Technical debt] The function of this addProductsToMenu method should be split into two: creating a MenuItem into a separate method and adding a product to a MenuItem into a separate method. Note: SPR design pattern is broken

  private createEntity(dto: CreateMenuDto) {
    return new MenuEntity(dto);
  }
}
