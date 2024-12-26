import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ADMINISTRATOR_CONSTANTS } from 'src/infrastructure/security/jwt-constants';
import { AdministratorController } from './administration-context/administrator.controller';
import { AdministratorService } from './administration-context/administrator.service';
import { AdministratorLocalStrategy } from 'src/infrastructure/security/administrator/strategy/administrator.local.strategy';
import { AdministratorJwtStrategy } from 'src/infrastructure/security/administrator/strategy/administrator.jwt.strategy';
import { AdministratorSecurityRepository } from 'src/infrastructure/security/administrator/repository/administrator-repository';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { AdministratorSuperUserController } from './super-user-context/administration.super-user.controller';
import { AdministrationSuperUserService } from './super-user-context/administration.super-user.service';
import { AdministrationSuperUserRepository } from './super-user-context/repository/administration.super-user.repository';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: ADMINISTRATOR_CONSTANTS.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],

  controllers: [AdministratorController, AdministratorSuperUserController],
  providers: [
    AdministratorService,
    AdministratorLocalStrategy,
    AdministratorJwtStrategy,
    AdministratorSecurityRepository,
    AdministrationSuperUserService,
    AdministrationSuperUserRepository,
  ],
})
export class AdministratorModel {}
