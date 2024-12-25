import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { AdministratorSecurityRepository } from '../repository/administrator-repository';
import { SystemError } from 'src/shared/system-error.enum';
import { AdministratorTokenEntity } from 'src/shared/entities/administrator-token.entity';
import { Request } from 'express';

@Injectable()
export class AdministratorLocalStrategy extends PassportStrategy(
  Strategy,
  'administrator-local-guard',
) {
  constructor(private readonly repository: AdministratorSecurityRepository) {
    super({ usernameField: 'email', passReqToCallback: true });
  }

  async validate(req: Request, email: string, password: string): Promise<any> {
    const shopId = req.params.shopId;

    const user = await this.getAndCheckAdministratorIsValid(email, shopId);

    return await this.compareAdministrator(user, password);
  }

  private async getAndCheckAdministratorIsValid(email: string, shopId) {
    const user = await this.repository.getAdministratorByEmail(email, shopId);

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
