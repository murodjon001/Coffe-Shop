import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { SystemError } from 'src/shared/system-error.enum';
import { ClientSecurityRepository } from '../repository/client-repository';
import { Request } from 'express';

@Injectable()
export class ClientLocalStrategy extends PassportStrategy(
  Strategy,
  'client-local',
) {
  constructor(private readonly repository: ClientSecurityRepository) {
    super({ usernameField: 'email', passReqToCallback: true });
  }

  async validate(req: Request, email: string, password: string) {
    const shopId = req.params.shopId;

    if (!shopId) {
      throw Error('shopId is required');
    }

    const user = await this.repository.getClientByEmail(email, shopId);

    if (!user) {
      throw new CustomHttpException(
        'Client not found',
        SystemError.INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isValidPassword = await user.password.compare(password);

    if (!isValidPassword) {
      throw new CustomHttpException(
        'Client password invalid',
        SystemError.INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }
}
