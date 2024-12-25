import { HttpStatus, Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { SUPER_USER_CONSTANTS } from '../../jwt-constants';
import { SystemError } from 'src/shared/system-error.enum';
import { SuperUserSecurityRepository } from '../repository/super-user.repository';

@Injectable()
export class SuperUserJwtStrategy extends PassportStrategy(
  Strategy,
  'super-user-jwt-guard',
) {
  constructor(private readonly repository: SuperUserSecurityRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: SUPER_USER_CONSTANTS.secret,
    });
  }

  async validate(payload) {
    const user = this.getAndCheckSuperUserIsValid(payload.sub);

    return user;
  }

  private async getAndCheckSuperUserIsValid(id: string) {
    const user = await this.repository.getSuperUserById(id);

    if (user) return user;

    throw new CustomHttpException(
      'Super user is not found',
      SystemError.INVALID_CREDENTIALS,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
