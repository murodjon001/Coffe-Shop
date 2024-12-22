import { HttpStatus, Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { DIRECTOR_CONSTANTS } from '../../jwt-constants';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { SystemError } from 'src/shared/enums/system-error.enum';
import { DirectorRepository } from 'src/infrastructure/prisma/repositories/director/director.repository';

@Injectable()
export class DirectorJwtStrategy extends PassportStrategy(
  Strategy,
  'director-jwt-guard',
) {
  constructor(private readonly directorRepository: DirectorRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: DIRECTOR_CONSTANTS.secret,
    });
  }

  async validate(payload) {
    const user = this.getAndCheckDirectorIsValid(payload.sub);

    return user;
  }

  private async getAndCheckDirectorIsValid(id: string) {
    const user = await this.directorRepository.findById(id);

    if (user) return user;

    throw new CustomHttpException(
      'Director not found',
      SystemError.INVALID_CREDENTIALS,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
