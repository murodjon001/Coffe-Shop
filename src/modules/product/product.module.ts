import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { ProductAdministrationController } from './administrarion-context/product.administration.contorller';
import { ProductAdministrationService } from './administrarion-context/product.administration.service';
import { ProductRepository } from './repository/product.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ProductAdministrationController],
  providers: [ProductAdministrationService, ProductRepository],
})
export class ProductModule {}
