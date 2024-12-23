import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { AdministratorSecurityRepository } from '../repository/administrator-repository';
import { normalizePhone } from 'src/shared/utils/normalize-phone';
import { SystemError } from 'src/shared/system-error.enum';
import { AdministratorTokenEntity } from 'src/shared/entities/administrator-token.entity';

@Injectable()
export class AdministratorLocalStrategy extends PassportStrategy(
  Strategy,
  'administrator-local-guard',
) {
  constructor(private readonly repository: AdministratorSecurityRepository) {
    super({ usernameField: 'phone' });
  }

  async validate(phone: string, password: string): Promise<any> {
    const user = await this.getAndCheckAdministratorIsValid(phone);

    return await this.compareAdministrator(user, password);
  }

  private async getAndCheckAdministratorIsValid(phone: string) {
    const user = await this.repository.getAdministratorByPhone(
      normalizePhone(phone),
    );

    if (user) return user;

    throw new CustomHttpException(
      'Administrator not found',
      SystemError.INVALID_CREDENTIALS,
      HttpStatus.UNAUTHORIZED,
    );
  }

  private async compareAdministrator(
    administrator: AdministratorTokenEntity,
    password: string,
  ) {
    const passwordIsValid = await administrator.password.compare(password);

    if (passwordIsValid) return administrator;

    throw new CustomHttpException(
      'administrator password is wrong',
      SystemError.INVALID_CREDENTIALS,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
