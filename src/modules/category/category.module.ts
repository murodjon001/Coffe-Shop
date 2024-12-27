import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { CategoryAdministrationController } from './administration-context/category.administration.controller';
import { CategoryAdministrationService } from './administration-context/category.administration.service';
import { CategoryRepository } from './administration-context/repository/category.repository';

@Module({
  imports: [PrismaModule],
  controllers: [CategoryAdministrationController],
  providers: [CategoryAdministrationService, CategoryRepository],
})
export class CategoryModule {}
