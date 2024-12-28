import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { BasketController } from './client-context/basket.controller';
import { BasketService } from './client-context/basket.service';
import { Repository } from './client-context/repository/repository';

@Module({
  imports: [PrismaModule],
  controllers: [BasketController],
  providers: [BasketService, Repository],
})
export class BasketModule {}
