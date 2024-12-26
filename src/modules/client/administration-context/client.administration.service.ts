import { Injectable } from '@nestjs/common';
import { ClientAdministrationRepository } from './repository/client.administration.repository';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { SystemError } from 'src/shared/system-error.enum';

@Injectable()
export class ClientAdministrationService {
  constructor(private readonly repository: ClientAdministrationRepository) {}

  async getAllClients(skip: number, take: number, shopId: string) {
    const clients = await this.repository.getAllClients(shopId, skip, take);

    return clients;
  }

  async deleteClient(id: string) {
    await this.repository.deleteClient(id);
  }

  async getClientById(id: string) {
    const client = await this.repository.getClientById(id);

    if (!client) {
      throw new CustomHttpException(
        'Client not found',
        SystemError.NOT_FOUND,
        404,
      );
    }

    return client;
  }
}
