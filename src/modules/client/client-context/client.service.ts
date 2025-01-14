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
import { RegistrationClientDto } from './dto/registration-client.dto';
import { PasswordVo } from 'src/shared/value-objects/password';
import { EmailDto } from './dto/email.dto';
import { OtpDto } from './dto/otp.dto';
import { UpdatePersonalDataDto } from './dto/update-personal-data.dto';
import { UpdatePasswordDto } from '../shared/dto/update-password.dto';
import { ClientEntity } from '../shared/entities/client.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventName } from 'src/shared/enum/event-names';
import { SendOtpEvent } from './events/send-otp.event';

@Injectable()
export class ClientService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly repository: ClientRepository,
    private readonly eventEmitter: EventEmitter2,
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

  async registrationClient(dto: RegistrationClientDto) {
    await this.validateEmail(dto.email, dto.coffeeShopId);

    const client = await this.createClientEntity(dto);

    const otp = await this.repository.createClient(client);

    this.eventEmitter.emit(
      EventName.SEND_OTP,
      new SendOtpEvent(otp, dto.email),
    );
  }

  async resendOtp(dto: EmailDto, shopId: string) {
    await this.checkClientIsConfirmed(dto.email, shopId);

    const otp = await this.repository.resetOtp(dto.email, shopId);

    this.eventEmitter.emit(
      EventName.SEND_OTP,
      new SendOtpEvent(otp, dto.email),
    );
  }

  async confirmClient(dto: OtpDto, shopId: string) {
    await this.validateConfirmedClient(dto, shopId);

    await this.repository.confirmClient(dto.email, shopId);
  }

  async updatePersonalDataClient(id: string, dto: UpdatePersonalDataDto) {
    const client = await this.getClientById(id);

    client.update(dto);

    const updatedClient =
      await this.repository.updatePersonalDataClient(client);

    return updatedClient;
  }

  async updatePassword(id: string, dto: UpdatePasswordDto) {
    const client = await this.getClientById(id);

    const isValidPassword = await client.password.compare(dto.oldPassword);

    if (!isValidPassword) {
      throw new CustomHttpException(
        'Old Password is wrong',
        SystemError.BAD_REQUEST,
        400,
      );
    }

    await client.updatePassword(dto.newPassword);

    await this.repository.updatePassword(client);
  }

  private async getClientById(id: string) {
    const client = await this.repository.findById(id);

    if (!client) {
      throw new CustomHttpException(
        'Client not found',
        SystemError.NOT_FOUND,
        404,
      );
    }

    return client;
  }

  private async validateConfirmedClient(dto: OtpDto, shopId: string) {
    const client = await this.repository.findByOtp(dto.otp, dto.email, shopId);

    if (!client) {
      throw new CustomHttpException(
        'Otp is invalid or otp is expired',
        SystemError.BAD_REQUEST,
        400,
      );
    }
  }

  private async createClientEntity(dto: RegistrationClientDto) {
    const password = await PasswordVo.create(dto.password);

    return new ClientEntity({
      ...dto,
      isConfirmed: false,
    }).withPassword(password);
  }

  private async checkClientIsConfirmed(email: string, shopId: string) {
    const client = await this.repository.findByEmail(email, shopId);

    if (!client) {
      throw new CustomHttpException(
        'This client not found',
        SystemError.NOT_FOUND,
        404,
      );
    }

    if (client.isConfirmed) {
      throw new CustomHttpException(
        'This email is already confirmed',
        SystemError.BAD_REQUEST,
        400,
      );
    }
  }

  private async validateEmail(email: string, shopId: string) {
    const isExist = await this.repository.findByEmail(email, shopId);

    if (isExist) {
      throw new CustomHttpException(
        'This email already exist',
        SystemError.CONFLICT,
        409,
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
