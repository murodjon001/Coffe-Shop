import { Injectable, Logger } from '@nestjs/common';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { AdministratorTokenEntity } from 'src/shared/entities/administrator-token.entity';
import { SystemError } from 'src/shared/system-error.enum';

@Injectable()
export class AdministratorSecurityRepository {
  private readonly logger = new Logger(AdministratorSecurityRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async getAdministratorByPhone(phone: string) {
    try {
      const administrator = await this.prisma.administrator.findUnique({
        where: {
          phone: phone,
        },
      });

      if (!administrator) {
        return null;
      }

      return new AdministratorTokenEntity({ ...administrator });
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while getAdministratorByPhone',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async getAdministratorById(id: string) {
    try {
      const administrator = await this.prisma.administrator.findUnique({
        where: {
          id: id,
        },
      });

      if (!administrator) {
        return null;
      }

      const { password, ...other } = administrator;

      return new AdministratorTokenEntity({ ...other });
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
