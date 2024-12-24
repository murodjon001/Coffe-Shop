import { ClientBaseEntity } from 'src/shared/entities/client-base.entity';
import { PasswordVo } from 'src/shared/value-objects/password';
import { IClientBaseEntity } from 'src/shared/interfaces/client-base-entity.interface';
import { UpdatePersonalDataDto } from '../dto/update-personal-data.dto';

export class ClientEntity extends ClientBaseEntity {
  password?: PasswordVo;

  constructor(params: IClientBaseEntity) {
    super(params);
  }

  withPassword(password: PasswordVo) {
    this.password = password;

    return this;
  }

  update(dto: UpdatePersonalDataDto) {
    this.name = dto.name || this.name;
    this.surname = dto.surname || this.surname;
    this.avatar = dto.avatar || this.avatar;
    this.phone = dto.phone || this.phone;
  }

  async updatePassword(newPassword: string) {
    this.password = await PasswordVo.create(newPassword);
  }
}
