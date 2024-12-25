export class SendOtpEvent {
  constructor(
    public readonly otp: number,
    public readonly email: string,
  ) {}
}
