import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { OrderClientController } from './client-context/order-client.controller';
import { OrderAdministrationController } from './administration-context/order.administration.controller';
import { OrderClientRepository } from './client-context/repository/order-client.repository';
import { OrderAdministrationService } from './administration-context/order.administration.service';
import { OrderAdministrationRepository } from './administration-context/repository/administration-repository';
import { OrderClientService } from './client-context/order-client.service';

@Module({
  imports: [PrismaModule],
  controllers: [OrderClientController, OrderAdministrationController],
  providers: [
    OrderClientRepository,
    OrderAdministrationService,
    OrderClientService,
    OrderAdministrationRepository,
  ],
})
export class OrderManagementModule {}
