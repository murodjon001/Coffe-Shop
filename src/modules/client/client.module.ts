import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CLIENT_CONSTANTS } from 'src/infrastructure/security/jwt-constants';
import { ClientController } from './client-context/client.controller';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { ClientService } from './client-context/client.service';
import { ClientLocalStrategy } from 'src/infrastructure/security/client/strategy/client.local.strategy';
import { ClientJwtStrategy } from 'src/infrastructure/security/client/strategy/client.jwt.strategy';
import { ClientSecurityRepository } from 'src/infrastructure/security/client/repository/client-repository';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: CLIENT_CONSTANTS.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [ClientController],
  providers: [
    ClientService,
    ClientLocalStrategy,
    ClientJwtStrategy,
    ClientSecurityRepository,
  ],
})
export class ClientModel {}
