import jwt from 'jsonwebtoken'

const { PRIVATE_KEY_JWT } = process.env

export class Token {
  public static sign ({
    data,
    duration = ''
  }: {
    data: any
    duration?: string | number
  }) {
    if (!PRIVATE_KEY_JWT) {
      console.log('KEY JWT IS REQUIRED!')
      return null
    }
    return jwt.sign(data, PRIVATE_KEY_JWT, { expiresIn: duration })
  }

  public static verify (token: string) {
    if (!PRIVATE_KEY_JWT) {
      console.log('KEY JWT IS REQUIRED!')
      return null
    }

    return jwt.verify(token, PRIVATE_KEY_JWT)
  }
}
