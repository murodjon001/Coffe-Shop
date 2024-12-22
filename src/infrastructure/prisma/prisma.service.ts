import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  logger = new Logger(PrismaService.name);

  // this method using for automatic connect in db when start project
  async onModuleInit() {
    await this.$connect();
  }

  // this method for migration
  runMigrations(): void {
    this.logger.log('Starting migrations...');
    execSync('npx prisma migrate deploy');
    this.logger.log('Migrations completed');
  }
}
