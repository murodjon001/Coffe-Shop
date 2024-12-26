import { Injectable, Logger } from '@nestjs/common';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { ClientTokenEntity } from 'src/shared/entities/client-token.entity';
import { SystemError } from 'src/shared/system-error.enum';

@Injectable()
export class ClientSecurityRepository {
  private readonly logger = new Logger(ClientSecurityRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async getClientByEmail(email: string, shopId: string) {
    try {
      const client = await this.prisma.client.findUnique({
        where: {
          coffeeShopId_email: {
            email,
            coffeeShopId: shopId,
          },
          isConfirmed: true,
        },
      });

      if (!client) {
        return null;
      }

      return new ClientTokenEntity({ ...client });
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while getClientByEmail',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async getClientById(id: string) {
    try {
      const client = await this.prisma.client.findUnique({
        where: {
          id: id,
          isConfirmed: true,
        },
      });

      if (!client) {
        return null;
      }

      const { password, ...other } = client;

      return new ClientTokenEntity({ ...other });
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while getClientById',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }
}
