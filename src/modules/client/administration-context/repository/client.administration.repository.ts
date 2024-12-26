import { Injectable, Logger } from '@nestjs/common';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { SystemError } from 'src/shared/system-error.enum';
import { ClientEntity } from '../../shared/entities/client.entity';

@Injectable()
export class ClientAdministrationRepository {
  private logger = new Logger(ClientAdministrationRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async getAllClients(shopId: string, skip: number, take: number) {
    try {
      const clients = await this.prisma.client.findMany({
        where: { coffeeShopId: shopId },
        skip,
        take,
      });

      const count = await this.prisma.client.count();

      return { data: clients.map((el) => new ClientEntity(el)), count };
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while getAllClients',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async getClientById(id: string) {
    try {
      const client = await this.prisma.client.findUnique({
        where: {
          id,
        },
      });

      if (!client) {
        return null;
      }

      return new ClientEntity(client);
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'Error while getClientById',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  async deleteClient(id: string) {
    try {
      await this.prisma.client.delete({
        where: {
          id,
        },
      });
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
