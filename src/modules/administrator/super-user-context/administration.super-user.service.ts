import { Injectable } from '@nestjs/common';
import { AdministrationSuperUserRepository } from './repository/administration.super-user.repository';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { SystemError } from 'src/shared/system-error.enum';
import { RegistrationAdminDto } from './dtos/create-administrator.dto';
import { AdministratorEntity } from '../shared/entities/administrator.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventName } from 'src/shared/enum/event-names';
import { SendPasswordEvent } from './events/send-password.event';
import { UpdatePersonalDataAdministratorDto } from './dtos/update-administrator.dto';

@Injectable()
export class AdministrationSuperUserService {
  constructor(
    private readonly repository: AdministrationSuperUserRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createAdministrator(dto: RegistrationAdminDto) {
    await this.checkEmail(dto.email, dto.coffeeShopId);

    const admin = await this.createEntity(dto);

    const createdAdmin = await this.repository.save(admin);

    this.eventEmitter.emit(
      EventName.SEND_PASSWORD,
      new SendPasswordEvent(dto.password, dto.email),
    );

    return createdAdmin;
  }

  async updateAdministrator(
    dto: UpdatePersonalDataAdministratorDto,
    id: string,
  ) {
    const administrator = await this.getAdministratorById(id);

    administrator.update(dto);

    const updatedAdmin = await this.repository.save(administrator);

    return updatedAdmin;
  }

  async getAdministrator(id: string) {
    return this.getAdministratorById(id);
  }

  async getAdministratorsByShopId(shopId: string) {
    const admins = await this.repository.findByShopId(shopId);

    return admins;
  }

  async getAllAdministrators(skip: number, take: number) {
    const admins = await this.repository.findAll(skip, take);

    return admins;
  }

  private async getAdministratorById(id: string) {
    const admin = await this.repository.findById(id);

    if (!admin) {
      throw new CustomHttpException(
        'Administration not found',
        SystemError.NOT_FOUND,
        404,
      );
    }

    return admin;
  }

  private async createEntity(dto: RegistrationAdminDto) {
    return await new AdministratorEntity({ ...dto }).withPassword(dto.password);
  }

  private async checkEmail(email: string, shopId: string, id?: string) {
    const isExistEmail = await this.repository.isExistEmail(email, shopId, id);

    if (isExistEmail) {
      throw new CustomHttpException(
        'This email already exist other administrator',
        SystemError.CONFLICT,
        409,
      );
    }
  }
}
