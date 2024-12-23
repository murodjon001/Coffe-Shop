import { IClientTokenEntity } from '../interfaces/client-token-entity.interface';
import { PasswordVo } from '../value-objects/password';
import { ClientBaseEntity } from './client-base.entity';

export class ClientTokenEntity extends ClientBaseEntity {
  password: PasswordVo;
  otp: number;
  otpExpired: Date;
  timesUsage: number;

  constructor(params: IClientTokenEntity) {
    super(params);

    this.password = PasswordVo.fromHash(params.password);
    this.otp = params.otp;
    this.otpExpired = params.otpExpired;
    this.timesUsage = params.timesUsage;
  }
}
