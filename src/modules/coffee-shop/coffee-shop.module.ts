import { Module } from '@nestjs/common';
import { CoffeeShopController } from './super-user-context/coffee-shop.controller';
import { CoffeeShopService } from './super-user-context/coffee-shop.service';
import { CoffeeShopRepository } from './repository/coffee-shop.repository';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { CoffeeShopPublicController } from './public-context/coffee-shop.public.contorller';
import { CoffeeShopPublicService } from './public-context/coffee-shop.public.service';

@Module({
  imports: [PrismaModule],
  controllers: [CoffeeShopController, CoffeeShopPublicController],
  providers: [CoffeeShopService, CoffeeShopRepository, CoffeeShopPublicService],
})
export class CoffeeShopModule {}
