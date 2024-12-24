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

      return new ClientEntity({ ...client });
    } catch (err) {
      throw new CustomHttpException(
        `Error while findByEmail: ${err}`,
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }
}
