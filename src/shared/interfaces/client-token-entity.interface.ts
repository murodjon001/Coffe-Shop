import { PasswordVo } from '../value-objects/password';
import { IClientBaseEntity } from './client-base-entity.interface';

export interface IClientTokenEntity extends IClientBaseEntity {
  password: PasswordVo;
  otp: number;
  otpExpired: Date;
  timesUsage: number;
}
