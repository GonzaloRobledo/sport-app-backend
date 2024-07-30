import { AuthController } from '../controllers/auth.ctrl'
import { AuthMiddleware } from '../middlewares/auth/auth.middleware'

import { Router } from 'express'
import { AUTH_ENDPOINTS } from './constants'

export class AuthRoute {
  public router = Router()

  public constructor () {
    this.manageRoutes()
  }

  manageRoutes () {
    this.router.post(
      AUTH_ENDPOINTS.LOGIN,
      AuthMiddleware.loginValidate,
      AuthController.login
    )
    this.router.post(
      AUTH_ENDPOINTS.REGISTER,
      AuthMiddleware.registerValidate,
      AuthController.register
    )
    this.router.get(
      AUTH_ENDPOINTS.VERIFY_SESSION,
      AuthMiddleware.verifySession,
      AuthController.verifySession
    )
  }
}
