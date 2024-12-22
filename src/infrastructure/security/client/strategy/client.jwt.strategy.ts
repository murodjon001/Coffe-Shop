import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CLIENT_CONSTANTS } from '../../jwt-constants';
import { ClientRepository } from 'src/infrastructure/prisma/repositories/clients/client-repository';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { SystemError } from 'src/shared/system-error.enum';

@Injectable()
export class ClientJwtStrategy extends PassportStrategy(
  Strategy,
  'client-jwt',
) {
  constructor(private readonly repository: ClientRepository) {
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
        'Unauthorized',
        SystemError.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return client;
  }
}
