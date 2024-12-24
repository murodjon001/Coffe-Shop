import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { ClientEntity } from '../entities/client.entity';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { SystemError } from 'src/shared/system-error.enum';
import { generateOtp } from 'src/shared/utils/create-otp';
import { PasswordVo } from 'src/shared/value-objects/password';

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

      const { password, ...other } = updatedClient;

      return new ClientEntity({ ...other });
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

  async updateEmail(email: string) {
    try {
      const otp = generateOtp();

      await this.prisma.client.update({
        where: {
          email,
        },
        data: {
          otp,
          otpExpired: new Date(), // + 1 minute
          email,
          isConfirmed: false,
        },
      });

      return otp;
    } catch (err) {
      throw new CustomHttpException(
        `Error while updateEmail: ${err}`,
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

      const { password, ...other } = client;

      const pass = PasswordVo.fromHash(password);

      return new ClientEntity({ ...other, password: pass });
    } catch (err) {
      throw new CustomHttpException(
        `Error while findByEmail: ${err}`,
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

      const { password, ...other } = updatedClient;

      return new ClientEntity({ ...other });
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

      const { password, ...other } = client;

      return new ClientEntity({ ...other });
    } catch (err) {
      throw new CustomHttpException(
        `Error while findByEmail: ${err}`,
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async isAlreadyExistEmail(email: string, id: string) {
    try {
      const isExistEmail = await this.prisma.client.findFirst({
        where: {
          email,
          id: { not: id },
        },
      });

      if (isExistEmail) {
        return true;
      }

      return false;
    } catch (err) {
      throw new CustomHttpException(
        `Error while findByEmail: ${err}`,
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }
}
