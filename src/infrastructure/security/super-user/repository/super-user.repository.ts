import { Injectable, Logger } from '@nestjs/common';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { SuperUserTokenEntity } from 'src/shared/entities/super-user-token.entity';
import { SystemError } from 'src/shared/system-error.enum';

@Injectable()
export class SuperUserSecurityRepository {
  private readonly logger = new Logger(SuperUserSecurityRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async getSuperUserByPhone(phone: string) {
    try {
      const superUser = await this.prisma.superuser.findUnique({
        where: {
          phone: phone,
        },
      });

      if (!superUser) {
        return null;
      }

      return new SuperUserTokenEntity({ ...superUser });
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while getSuperUserByPhone',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async getSuperUserById(id: string) {
    try {
      const superUser = await this.prisma.superuser.findUnique({
        where: {
          id: id,
        },
      });

      if (!superUser) {
        return null;
      }

      const { password, ...other } = superUser;

      return new SuperUserTokenEntity({ ...other });
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while getSuperUserById',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }
}
