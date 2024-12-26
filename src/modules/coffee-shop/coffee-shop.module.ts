import { Module } from '@nestjs/common';
import { CoffeeShopController } from './super-user-context/coffee-shop.controller';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { CoffeeShopService } from './super-user-context/coffee-shop.service';
import { CoffeeShopRepository } from './repository/coffee-shop.repository';

@Module({
  imports: [PrismaService],
  controllers: [CoffeeShopController],
  providers: [CoffeeShopService, CoffeeShopRepository],
})
export class CoffeeShopModule {}
