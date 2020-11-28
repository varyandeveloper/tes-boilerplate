import bcrypt from 'bcrypt';

export default class HashService {
  public static async make(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public static async verify(
    password: string,
    hashed: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashed);
  }
}
