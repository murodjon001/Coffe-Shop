import { IClientBaseEntity } from './client-base-entity.interface';

export interface IClientTokenEntity extends IClientBaseEntity {
  password: string;
  otp: number;
  otpExpired: Date;
  timesUsage: number;
}
