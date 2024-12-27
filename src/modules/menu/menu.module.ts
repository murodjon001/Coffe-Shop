import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { MenuAdministrationController } from './administration-context/menu.administration.controller';
import { MenuAdministrationService } from './administration-context/menu.administration.service';
import { MenuRepository } from './repository/menu.repository';
import { MenuPublicController } from './client-context/menu.public.controller';
import { MenuPublicService } from './client-context/menu.public.service';

@Module({
  imports: [PrismaModule],
  controllers: [MenuAdministrationController, MenuPublicController],
  providers: [MenuAdministrationService, MenuRepository, MenuPublicService],
})
export class MenuModule {}
