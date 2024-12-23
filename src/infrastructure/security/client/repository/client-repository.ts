import { Injectable, Logger } from '@nestjs/common';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { ClientTokenEntity } from 'src/shared/entities/client-token.entity';
import { SystemError } from 'src/shared/system-error.enum';

@Injectable()
export class ClientSecurityRepository {
  private readonly logger = new Logger(ClientSecurityRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async getClientByEmail(email: string) {
    try {
      const client = await this.prisma.client.findUnique({
        where: {
          email: email,
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
        'Error while getClientByEmailAndOtp',
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

      return new ClientTokenEntity({ ...client });
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while getClientByEmailAndOtp',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }
}
