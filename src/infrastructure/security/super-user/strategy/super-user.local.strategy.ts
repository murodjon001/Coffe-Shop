import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { normalizePhone } from 'src/shared/utils/normalize-phone';
import { SystemError } from 'src/shared/system-error.enum';
import { SuperUserSecurityRepository } from '../repository/super-user.repository';
import { SuperUserTokenEntity } from 'src/shared/entities/super-user-token.entity';

@Injectable()
export class superUserLocalStrategy extends PassportStrategy(
  Strategy,
  'super-user-local-guard',
) {
  constructor(private readonly repository: SuperUserSecurityRepository) {
    super({ usernameField: 'phone' });
  }

  async validate(phone: string, password: string): Promise<any> {
    const user = await this.getAndCheckSuperUserIsValid(phone);

    return await this.compareSuperUser(user, password);
  }

  private async getAndCheckSuperUserIsValid(phone: string) {
    const user = await this.repository.getSuperUserByPhone(
      normalizePhone(phone),
    );

    if (user) return user;

    throw new CustomHttpException(
      'Super user not found',
      SystemError.INVALID_CREDENTIALS,
      HttpStatus.UNAUTHORIZED,
    );
  }

  private async compareSuperUser(
    superUser: SuperUserTokenEntity,
    password: string,
  ) {
    const passwordIsValid = await superUser.password.compare(password);

    if (passwordIsValid) return superUser;

    throw new CustomHttpException(
      'superUser password is wrong',
      SystemError.INVALID_CREDENTIALS,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
