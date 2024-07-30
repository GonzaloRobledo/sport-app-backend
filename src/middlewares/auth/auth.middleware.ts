import { NextFunction, Request, Response } from 'express'
import { AuthValidator } from '../../validators/auth.validator'
import { Token } from '../../classes/token.class'

export class AuthMiddleware {
  public static loginValidate (req: Request, res: Response, next: NextFunction) {
    const { body } = req

    try {
      const validateData = AuthValidator.login(body)

      if (!validateData.success) {
        throw validateData.error.issues?.map(el => el.message)
      }

      const data = validateData.data

      req.body = data

      next()
    } catch (e) {
      console.log('Error', e)
      res.status(500).send({ ok: false, error: e || 'Server error' })
    }
  }

  public static registerValidate (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { body } = req

    try {
      const validateData = AuthValidator.register(body)

      if (!validateData.success) {
        throw validateData.error.issues?.map(el => el.message)
      }

      const data = validateData.data

      req.body = data

      next()
    } catch (e) {
      console.log('Error', e)
      res.status(500).send({ ok: false, error: e || 'Server error' })
    }
  }

  public static verifySession (req: Request, res: Response, next: NextFunction) {
    try {
      const cookies = req.cookies

      const validateToken = Token.verify(cookies.token)

      if (!validateToken) throw 'Invalid token!'

      const { email }: any = validateToken

      req.body = { ...req.body, user_email: email }

      next()
    } catch (e) {
      console.log('Error in verifySession middleware! ', e)
      res.send({ ok: false, error: e || 'Invalid token!' })
    }
  }

  public static verifyRoleAdmin (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const cookies = req.cookies

      const validateToken = Token.verify(cookies.token)

      if (!validateToken) throw 'Invalid token!'

      const { email, role }: any = validateToken

      if (role !== 'admin') throw 'You need admin permissions to do this action'

      req.body = { ...req.body, user_email: email }

      next()
    } catch (e) {
      console.log('Error in verifyRoleAdmin middleware: ', e)
      res.send({ ok: false, error: e || 'Invalid token!' })
    }
  }
}
