import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { DirectorRepository } from 'src/infrastructure/prisma/repositories/director/director.repository';
import { DirectorEntity } from 'src/shared/entities/director.entity';
import { SystemError } from 'src/shared/enums/system-error.enum';
import { normalizePhone } from 'src/shared/utils/normalize-phone';

@Injectable()
export class DirectorLocalStrategy extends PassportStrategy(
  Strategy,
  'director-local-guard',
) {
  constructor(private readonly directorRepository: DirectorRepository) {
    super({ usernameField: 'phone' });
  }

  async validate(phone: string, password: string): Promise<any> {
    const user = await this.getAndCheckDirectorIsValid(phone);

    return await this.compareDirector(user, password);
  }

  private async getAndCheckDirectorIsValid(phone: string) {
    const user = await this.directorRepository.findByPhone(
      normalizePhone(phone),
    );

    if (user) return user;

    throw new CustomHttpException(
      'Director not found',
      SystemError.INVALID_CREDENTIALS,
      HttpStatus.UNAUTHORIZED,
    );
  }

  private async compareDirector(director: DirectorEntity, password: string) {
    const passwordIsValid = await director.password.compare(password);

    if (passwordIsValid) return director;

    throw new CustomHttpException(
      'Director password is wrong',
      SystemError.INVALID_CREDENTIALS,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
