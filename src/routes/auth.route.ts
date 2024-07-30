import { AuthController } from '../controllers/auth.ctrl'
import { AUTH_ENDPOINTS } from '../globals/endpointsRoutes'
import { AuthMiddleware } from '../middlewares/auth/auth.middleware'

import { Router } from 'express'

export class AuthRoute {
  public router = Router()

  public constructor () {
    this.manageRoutes()
  }

  private manageRoutes () {
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
