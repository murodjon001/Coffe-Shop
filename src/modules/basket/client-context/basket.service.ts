import { Injectable } from '@nestjs/common';
import { Repository } from './repository/repository';
import { AddBasketDto } from './dtos/add-basket.dto';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { SystemError } from 'src/shared/system-error.enum';

@Injectable()
export class BasketService {
  constructor(private readonly repository: Repository) {}

  async getBasket(clientId: string) {
    const basket = await this.repository.getBasket(clientId);

    if (!basket) {
      throw new CustomHttpException(
        'Basket not found',
        SystemError.NOT_FOUND,
        404,
      );
    }

    return basket;
  }

  async setProductInBasket(basketId: string, dto: AddBasketDto) {
    return await this.repository.setProductInBasketItem(basketId, dto);
  }

  async deleteBasketItem(basketId: string, productId: string) {
    await this.repository.deleteBasketItem(basketId, productId);
  }
}
