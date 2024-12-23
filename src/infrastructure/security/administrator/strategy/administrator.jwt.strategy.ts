import { HttpStatus, Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { AdministratorSecurityRepository } from '../repository/administrator-repository';
import { ADMINISTRATOR_CONSTANTS } from '../../jwt-constants';
import { SystemError } from 'src/shared/system-error.enum';

@Injectable()
export class AdministratorJwtStrategy extends PassportStrategy(
  Strategy,
  'administrator-jwt-guard',
) {
  constructor(private readonly repository: AdministratorSecurityRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ADMINISTRATOR_CONSTANTS.secret,
    });
  }

  async validate(payload) {
    const user = this.getAndCheckAdministratorIsValid(payload.sub);

    return user;
  }

  private async getAndCheckAdministratorIsValid(id: string) {
    const user = await this.repository.getAdministratorById(id);

    if (user) return user;

    throw new CustomHttpException(
      'Administrator not found',
      SystemError.INVALID_CREDENTIALS,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
