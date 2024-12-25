import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import {
  IRefreshToken,
  IToken,
  ITokenPayload,
  SUPER_USER_CONSTANTS,
} from 'src/infrastructure/security/jwt-constants';
import { SuperUserTokenEntity } from 'src/shared/entities/super-user-token.entity';
import { SystemError } from 'src/shared/system-error.enum';

@Injectable()
export class SuperUserService {
  constructor(private readonly jwtService: JwtService) {}

  async login(entity: SuperUserTokenEntity): Promise<IToken> {
    const payload: ITokenPayload = this.getPayload(entity.id);

    const accessToken = this.getAccessToken(payload);

    const refreshToken = this.getRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
      expiresIn: new Date().getTime() + 86400000,
    };
  }

  async refreshTokenSuperUser(refreshToken: string): Promise<IRefreshToken> {
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
        `Error while refreshTokenSuperUser: ${err}`,
        SystemError.INVALID_CREDENTIALS,
        401,
      );
    }
  }

  private getVerifiedToken(refreshToken: string) {
    return this.jwtService.verify(refreshToken, {
      secret: SUPER_USER_CONSTANTS.refreshSecret,
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
      secret: SUPER_USER_CONSTANTS.secret,
      expiresIn: SUPER_USER_CONSTANTS.expiresIn,
    });
  }

  private getRefreshToken(payload: ITokenPayload) {
    return this.jwtService.sign(payload, {
      secret: SUPER_USER_CONSTANTS.refreshSecret,
      expiresIn: SUPER_USER_CONSTANTS.refreshExpiresIn,
    });
  }
}
