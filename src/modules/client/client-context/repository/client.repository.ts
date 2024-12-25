import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { SystemError } from 'src/shared/system-error.enum';
import { generateOtp } from 'src/shared/utils/create-otp';
import { PasswordVo } from 'src/shared/value-objects/password';
import { ClientEntity } from '../../shared/entities/client.entity';

@Injectable()
export class ClientRepository {
  private logger = new Logger(ClientRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async createClient(entity: ClientEntity) {
    try {
      const otp = generateOtp();
      const otpExpired = this.getOtpExpired();

      await this.prisma.client.create({
        data: {
          name: entity.name,
          surname: entity.surname,
          avatar: entity.avatar,
          email: entity.email,
          phone: entity.phone,
          password: entity.password.getHash,
          otpExpired,
          otp,
          isConfirmed: false,
          basket: {
            create: {},
          },
        },
      });

      return otp;
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        `Error while createClient`,
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async updatePersonalDataClient(entity: ClientEntity) {
    try {
      const updatedClient = await this.prisma.client.update({
        where: { id: entity.id },
        data: {
          name: entity.name,
          surname: entity.surname,
          avatar: entity.avatar,
          phone: entity.phone,
        },
      });

      return new ClientEntity({ ...updatedClient });
    } catch (err) {
      throw new CustomHttpException(
        `Error while updatePersonalDataClient: ${err}`,
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async resetOtp(email: string) {
    try {
      const otp = generateOtp();
      const otpExpired = this.getOtpExpired();

      await this.prisma.client.update({
        where: {
          email,
        },
        data: {
          otp,
          otpExpired,
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

  async confirmClient(email: string) {
    try {
      await this.prisma.client.update({
        where: { email },
        data: {
          isConfirmed: true,
          otp: null,
          otpExpired: null,
        },
      });
    } catch (err) {
      throw new CustomHttpException(
        `Error while confirmClient: ${err}`,
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async findById(id: string) {
    try {
      const client = await this.prisma.client.findUnique({
        where: {
          id,
        },
      });

      if (!client) {
        return null;
      }

      const { password, ...other } = client;

      const pass = PasswordVo.fromHash(password);

      return new ClientEntity({ ...other }).withPassword(pass);
    } catch (err) {
      throw new CustomHttpException(
        `Error while findById: ${err}`,
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async findByOtp(otp: number, email: string) {
    try {
      const client = await this.prisma.client.findUnique({
        where: {
          email,
          otp,
          otpExpired: {
            gte: new Date(),
          },
        },
      });

      if (!client) {
        return null;
      }

      return new ClientEntity({ ...client });
    } catch (err) {
      throw new CustomHttpException(
        `Error while findByOtp: ${err}`,
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async updatePassword(entity: ClientEntity) {
    try {
      const updatedClient = await this.prisma.client.update({
        where: { id: entity.id },
        data: {
          password: entity.password.getHash,
        },
      });

      return new ClientEntity({ ...updatedClient });
    } catch (err) {
      throw new CustomHttpException(
        `Error while updatePassword: ${err}`,
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async findByEmail(email: string) {
    try {
      const client = await this.prisma.client.findUnique({
        where: {
          email,
        },
      });

      if (!client) {
        return null;
      }

      return new ClientEntity({ ...client });
    } catch (err) {
      throw new CustomHttpException(
        `Error while findByEmail: ${err}`,
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  private getOtpExpired() {
    const today = new Date();

    today.setMinutes(today.getMinutes() + 1);

    return today;
  }
}
