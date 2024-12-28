import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { BasketEntity } from '../../shared/entities/basket.entity';
import { AddBasketDto } from '../dtos/add-basket.dto';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { SystemError } from 'src/shared/system-error.enum';

@Injectable()
export class Repository {
  private logger = new Logger(Repository.name);

  constructor(private readonly prisma: PrismaService) {}

  async getBasket(clientId: string) {
    try {
      const basket = await this.prisma.basket.findUnique({
        where: {
          clientId,
        },
        include: {
          basketItems: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!basket) return null;

      return new BasketEntity(basket).withBasketItems(basket.basketItems);
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while getBasket',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async setProductInBasketItem(basketId: string, dto: AddBasketDto) {
    try {
      await this.prisma.basketItem.upsert({
        where: {
          uniqueBasketItem: {
            basketId,
            productId: dto.productId,
          },
        },
        create: {
          quantity: dto.quantity,
          productId: dto.productId,
          basketId,
        },
        update: {
          quantity: dto.quantity,
        },
      });

      const basket = await this.prisma.basket.findUnique({
        where: {
          id: basketId,
        },
        include: {
          basketItems: {
            include: {
              product: true,
            },
          },
        },
      });

      return new BasketEntity(basket).withBasketItems(basket.basketItems);
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while setProductInBasketItem',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async deleteBasketItem(basketId: string, productId: string) {
    try {
      await this.prisma.basketItem.delete({
        where: {
          uniqueBasketItem: {
            productId,
            basketId,
          },
        },
      });
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while deleteBasketItem',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }
}
