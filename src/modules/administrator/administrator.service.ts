import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import {
  ADMINISTRATOR_CONSTANTS,
  IRefreshToken,
  IToken,
  ITokenPayload,
} from 'src/infrastructure/security/jwt-constants';
import { AdministratorTokenEntity } from 'src/shared/entities/administrator-token.entity';
import { SystemError } from 'src/shared/system-error.enum';

@Injectable()
export class AdministratorService {
  constructor(private readonly jwtService: JwtService) {}

  async login(entity: AdministratorTokenEntity): Promise<IToken> {
    const payload: ITokenPayload = this.getPayload(entity.id);

    const accessToken = this.getAccessToken(payload);

    const refreshToken = this.getRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
      expiresIn: new Date().getTime() + 86400000,
    };
  }

  async refreshTokenAdministrator(refreshToken: string): Promise<IRefreshToken> {
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
        `Error while refreshTokenAdministrator: ${err}`,
        SystemError.INVALID_CREDENTIALS,
        401,
      );
    }
  }

  private getVerifiedToken(refreshToken: string) {
    return this.jwtService.verify(refreshToken, {
      secret: ADMINISTRATOR_CONSTANTS.refreshSecret,
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
      secret: ADMINISTRATOR_CONSTANTS.secret,
      expiresIn: ADMINISTRATOR_CONSTANTS.expiresIn,
    });
  }

  private getRefreshToken(payload: ITokenPayload) {
    return this.jwtService.sign(payload, {
      secret: ADMINISTRATOR_CONSTANTS.refreshSecret,
      expiresIn: ADMINISTRATOR_CONSTANTS.refreshExpiresIn,
    });
  }
}
