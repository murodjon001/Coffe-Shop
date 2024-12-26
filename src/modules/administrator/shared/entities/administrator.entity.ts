import { AdministratorBaseEntity } from 'src/shared/entities/administrator-base.entity';
import { IAdministratorBaseEntity } from 'src/shared/interfaces/administrator-base-entity.interface';
import { PasswordVo } from 'src/shared/value-objects/password';
import { UpdatePersonalDataAdministratorDto } from '../../super-user-context/dtos/update-administrator.dto';

export class AdministratorEntity extends AdministratorBaseEntity {
  password: PasswordVo;

  constructor(params: IAdministratorBaseEntity) {
    super(params);
  }

  async withPassword(password: string) {
    this.password = await PasswordVo.create(password);

    return this;
  }

  update(dto: UpdatePersonalDataAdministratorDto) {
    this.name = dto.name || this.name;
    this.surname = dto.surname || this.surname;
    this.phone = dto.phone || this.phone;
  }
}
