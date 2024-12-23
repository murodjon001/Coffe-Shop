import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ADMINISTRATOR_CONSTANTS } from 'src/infrastructure/security/jwt-constants';
import { AdministratorController } from './administrator.controller';
import { AdministratorService } from './administrator.service';
import { AdministratorLocalStrategy } from 'src/infrastructure/security/administrator/strategy/administrator.local.strategy';
import { AdministratorJwtStrategy } from 'src/infrastructure/security/administrator/strategy/administrator.jwt.strategy';
import { AdministratorSecurityRepository } from 'src/infrastructure/security/administrator/repository/administrator-repository';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: ADMINISTRATOR_CONSTANTS.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AdministratorController],
  providers: [
    AdministratorService,
    AdministratorLocalStrategy,
    AdministratorJwtStrategy,
    AdministratorSecurityRepository,
  ],
})
export class AdministratorModel {}
