import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './repository/category.repository';
import { SaveCategoryDto } from './dtos/save.category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryAdministrationService {
  constructor(private readonly repository: CategoryRepository) {}

  async create(dto: SaveCategoryDto) {
    //TODO: [Technical debt] check category unique keys
    const category = this.createEntity(dto);

    return await this.repository.save(category);
  }

  //TODO:[Business debt] should implement updateCategory

  async getCategoryById(id: string) {
    //TODO: [Technical debt] if check is found

    return await this.repository.getCategoryById(id);
  }

  async getCategoryByShopId(shopId: string) {
    return await this.repository.getCategoryByShopId(shopId);
  }

  async deleteCategory(id: string) {
    //TODO: [Technical debt] if check is found

    return await this.repository.delete(id);
  }

  private createEntity(dto: SaveCategoryDto) {
    return new CategoryEntity({ ...dto });
  }
}
