import { NextFunction, Request, Response } from 'express'
import { CourtValidator } from '../../validators/court.validator'

export class CourtsMiddleware {
  public static createValidate (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const validateData = CourtValidator.create(req.body)

      if (!validateData.success) {
        throw validateData.error.issues?.map(el => el.message)
      }

      req.body = { ...validateData.data }

      next()
    } catch (e) {
      console.log('Error in createValidate court: ', e)
      res.send({ ok: false, error: e })
    }
  }

  public static updateOneValidate (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const validateData = CourtValidator.updateOne(req.body)

      if (!validateData.success) {
        throw validateData.error.issues?.map(el => el.message)
      }

      req.body = { ...validateData.data }

      next()
    } catch (e) {
      console.log('Error in createValidate court: ', e)
      res.send({ ok: false, error: e })
    }
  }
}
