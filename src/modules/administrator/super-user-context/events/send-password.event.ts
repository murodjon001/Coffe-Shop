export class SendPasswordEvent {
  constructor(
    public readonly password: string,
    public readonly email: string,
  ) {}
}
