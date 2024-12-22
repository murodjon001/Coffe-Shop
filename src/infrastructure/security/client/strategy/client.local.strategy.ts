import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { SystemError } from 'src/shared/system-error.enum';
import { ClientSecurityRepository } from '../repository/client-repository';

@Injectable()
export class ClientLocalStrategy extends PassportStrategy(
  Strategy,
  'client-local',
) {
  constructor(private readonly repository: ClientSecurityRepository) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.repository.getClientByEmail(email);

    if (!user) {
      throw new CustomHttpException(
        'Client not found',
        SystemError.INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isValidPassword = user.password.compare(password);

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
