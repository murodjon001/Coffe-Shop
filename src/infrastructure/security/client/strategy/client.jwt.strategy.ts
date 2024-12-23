import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { SystemError } from 'src/shared/system-error.enum';
import { ClientSecurityRepository } from '../repository/client-repository';
import { CLIENT_CONSTANTS } from '../../jwt-constants';

@Injectable()
export class ClientJwtStrategy extends PassportStrategy(
  Strategy,
  'client-jwt',
) {
  constructor(private readonly repository: ClientSecurityRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: CLIENT_CONSTANTS.secret,
    });
  }

  async validate(payload) {
    const client = await this.repository.getClientById(payload.sub);

    if (!client) {
      throw new CustomHttpException(
        'Client not found',
        SystemError.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return client;
  }
}
