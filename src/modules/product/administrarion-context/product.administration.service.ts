import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductEntity } from '../shared/entities/product.entity';

@Injectable()
export class ProductAdministrationService {
  constructor(private readonly repository: ProductRepository) {}

  async createProduct(dto: CreateProductDto) {
    const product = this.createEntity(dto);

    //TODO: [Technical debt] implement method checkTitleIsExist

    return await this.repository.save(product);
  }

  //TODO: [Business debt] implement method updateProduct

  async getProductById(id: string) {
    //TODO: [Technical debt] implement if check product is found

    return this.repository.findById(id);
  }

  async getProductByShopId(shopId: string, skip: number, take: number) {
    return this.repository.findByShopId(shopId, skip, take);
  }

  async deleteProduct(id: string) {
    //TODO: [Technical debt] implement if check product is found

    await this.repository.delete(id);
  }

  private createEntity(dto: CreateProductDto) {
    return new ProductEntity(dto);
  }
}
