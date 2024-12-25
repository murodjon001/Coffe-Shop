import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SUPER_USER_CONSTANTS } from 'src/infrastructure/security/jwt-constants';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { SuperUserController } from './super-user.controller';
import { SuperUserService } from './super-user.service';
import { superUserLocalStrategy } from 'src/infrastructure/security/super-user/strategy/super-user.local.strategy';
import { SuperUserJwtStrategy } from 'src/infrastructure/security/super-user/strategy/super-user.jwt.strategy';
import { SuperUserSecurityRepository } from 'src/infrastructure/security/super-user/repository/super-user.repository';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: SUPER_USER_CONSTANTS.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [SuperUserController],
  providers: [
    SuperUserService,
    superUserLocalStrategy,
    SuperUserJwtStrategy,
    SuperUserSecurityRepository,
  ],
})
export class SuperUserModel {}
