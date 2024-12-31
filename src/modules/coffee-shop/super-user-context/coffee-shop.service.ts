import { Injectable } from '@nestjs/common';
import { CoffeeShopRepository } from '../repository/coffee-shop.repository';
import { CreateCoffeeShopDto } from './dtos/create-coffee-shop.dto';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { SystemError } from 'src/shared/system-error.enum';
import { CoffeeShopEntity } from './entities/coffee-shop.entity';
import { UpdateCoffeeShopDto } from './dtos/update-coffee-shop.dto';

@Injectable()
export class CoffeeShopService {
  constructor(private readonly repository: CoffeeShopRepository) {}

  async createCoffeeShop(dto: CreateCoffeeShopDto) {
    await this.checkNameAndPhone(dto.shopName, dto.phone);

    const coffeeShop = this.createEntity(dto);

    const createdCoffeeShop = await this.repository.save(coffeeShop);

    return createdCoffeeShop;
  }

  async updateCoffeeShop(id: string, dto: UpdateCoffeeShopDto) {
    const coffeeShop = await this.getCoffeeShopById(id);

    coffeeShop.update(dto);

    await this.checkNameAndPhone(dto.shopName, dto.phone, id);

    const updateCoffeeShop = await this.repository.save(coffeeShop);

    return updateCoffeeShop;
  }

  async getCoffeeShop(id: string) {
    return await this.getCoffeeShopById(id);
  }

  private async getCoffeeShopById(id: string) {
    const coffeeShop = await this.repository.findById(id);

    if (!coffeeShop) {
      throw new CustomHttpException(
        'Coffee shop not found',
        SystemError.NOT_FOUND,
        404,
      );
    }
    return coffeeShop;
  }

  private createEntity(dto: CreateCoffeeShopDto) {
    return new CoffeeShopEntity({
      ...dto,
    });
  }

  private async checkNameAndPhone(
    shopName: string,
    phone: string,
    id?: string,
  ) {
    const isHasNameAndPhone = await this.repository.isExistNameOrPhone(
      shopName,
      phone,
      id,
    );

    if (isHasNameAndPhone) {
      throw new CustomHttpException(
        'This name or phone already exist other coffee shop',
        SystemError.CONFLICT,
        409,
      );
    }
  }
}
