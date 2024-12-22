import { Injectable, Logger } from '@nestjs/common';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { ClientTokenEntity } from 'src/shared/entities/client-token.entity';
import { SystemError } from 'src/shared/system-error.enum';
import { PasswordVo } from 'src/shared/value-objects/password';

@Injectable()
export class ClientSecurityRepository {
  private readonly logger = new Logger(ClientSecurityRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async getClientByEmail(email: string) {
    try {
      const fiveMinutesAgo = new Date();
      fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);

      const client = await this.prisma.client.findUnique({
        where: {
          email: email,
          isConfirmed: true,
        },
      });

      if (!client) {
        return null;
      }

      const password = PasswordVo.fromHash(client.password);

      return new ClientTokenEntity({ ...client, password });
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
