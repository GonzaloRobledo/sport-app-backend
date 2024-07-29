import bcrypt from 'bcrypt'

export class Bcrypt {
  public static async hash (password: string) {
    const hash = await bcrypt.hash(password, 10)
    return hash
  }

  public static async compare (password: string, hashPassword: string) {
    const compare = await bcrypt.compare(password, hashPassword)
    return compare
  }
}
