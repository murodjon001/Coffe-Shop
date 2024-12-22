import * as bcrypt from 'bcryptjs';

export class PasswordVo {
  private readonly hash: string;

  private constructor(hash: string) {
    this.hash = hash;
  }

  static async create(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return new PasswordVo(hash);
  }

  static fromHash(hash: string) {
    return new PasswordVo(hash);
  }

  async compare(plainTextPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, this.hash);
  }

  get getHash(): string {
    return this.hash;
  }
}
