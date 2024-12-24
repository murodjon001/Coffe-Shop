import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import {
  CLIENT_CONSTANTS,
  IRefreshToken,
  IToken,
  ITokenPayload,
} from 'src/infrastructure/security/jwt-constants';
import { ClientTokenEntity } from 'src/shared/entities/client-token.entity';
import { SystemError } from 'src/shared/system-error.enum';
import { ClientRepository } from './repository/client.repository';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ClientService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly repository: ClientRepository,
    private readonly mailerService: MailerService,
  ) {}

  async login(entity: ClientTokenEntity): Promise<IToken> {
    const payload: ITokenPayload = this.getPayload(entity.id);

    const accessToken = this.getAccessToken(payload);

    const refreshToken = this.getRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
      expiresIn: new Date().getTime() + 86400000,
    };
  }

  async refreshTokenClient(refreshToken: string): Promise<IRefreshToken> {
    try {
      const verifiedToken = this.getVerifiedToken(refreshToken);

      const payload = this.getPayload(verifiedToken.sub);

      const accessToken = this.getAccessToken(payload);

      return {
        accessToken,
        expiresIn: new Date().getTime() + 86400000,
      };
    } catch (err) {
      throw new CustomHttpException(
        `Error while refreshTokenClient: ${err}`,
        SystemError.INVALID_CREDENTIALS,
        401,
      );
    }
  }

  private getVerifiedToken(refreshToken: string) {
    return this.jwtService.verify(refreshToken, {
      secret: CLIENT_CONSTANTS.refreshSecret,
    });
  }

  private getPayload(id: string) {
    return {
      sub: id,
      iat: Date.now(),
      expiresIn: Date.now() + 86400000,
    }; // 24h
  }

  private getAccessToken(payload: ITokenPayload) {
    return this.jwtService.sign(payload, {
      secret: CLIENT_CONSTANTS.secret,
      expiresIn: CLIENT_CONSTANTS.expiresIn,
    });
  }

  private getRefreshToken(payload: ITokenPayload) {
    return this.jwtService.sign(payload, {
      secret: CLIENT_CONSTANTS.refreshSecret,
      expiresIn: CLIENT_CONSTANTS.refreshExpiresIn,
    });
  }
}
