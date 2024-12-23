import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { ClientEntity } from '../entities/client.entity';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { SystemError } from 'src/shared/system-error.enum';
import { generateOtp } from 'src/shared/utils/create-otp';

@Injectable()
export class ClientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createClient(entity: ClientEntity) {
    try {
      const otp = generateOtp();

      await this.prisma.client.create({
        data: {
          ...entity,
          password: entity.password.getHash,
          otpExpired: new Date(), // balki bunga 1 daqiqa qo'shiladi
          otp,
          isConfirmed: false,
        },
      });

      return otp;
    } catch (err) {
      throw new CustomHttpException(
        `Error while createClient: ${err}`,
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async resetOtp(email: string) {
    try {
      const otp = generateOtp();

      await this.prisma.client.update({
        where: {
          email,
        },
        data: {
          otp,
          otpExpired: new Date(), // + 1 minute
        },
      });

      return otp;
    } catch (err) {
      throw new CustomHttpException(
        `Error while resetOtp: ${err}`,
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }
}
