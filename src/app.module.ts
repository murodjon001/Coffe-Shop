import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerModule } from '@nestjs/throttler';
import { SecurityModule } from './infrastructure/security/security.module';
import { AdministratorModel } from './modules/administrator/administrator.module';
import { ClientModel } from './modules/client/client.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // this module for get variables in .env files
    EventEmitterModule.forRoot(), // this module for event emitter
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]), // this module use race limiter(Limits requests to the API)
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD_EMAIL,
        },
      },
    }), // this module for send sms to gmail
    PrismaModule,
    SecurityModule,
    AdministratorModel,
    ClientModel,
  ],
})
export class AppModule {}
