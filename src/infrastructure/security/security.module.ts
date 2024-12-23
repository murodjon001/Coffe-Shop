import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ClientSecurityRepository } from './client/repository/client-repository';
import { AdministratorSecurityRepository } from './administrator/repository/administrator-repository';

@Module({
  imports: [PrismaModule],
  providers: [ClientSecurityRepository, AdministratorSecurityRepository],
})
export class SecurityModule {}
