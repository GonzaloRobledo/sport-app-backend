import { AuthController } from '../controllers/auth.ctrl'
import { MethodsRoutes } from '../classes/methodRoutes.class'
import { AuthMiddleware } from '../middlewares/auth/auth.middleware'

export class AuthRoute extends MethodsRoutes {
  public router = this.rt

  public constructor (startRoute: string = '') {
    super(startRoute)
    this.manageRoutes()
  }

  manageRoutes () {
    this.POST({
      startWith: `/login`,
      func: AuthController.login,
      middlewares: [AuthMiddleware.loginValidate]
    })

    this.POST({
      startWith: '/register',
      func: AuthController.register,
      middlewares: [AuthMiddleware.registerValidate]
    })

    this.GET({
      startWith: '/verifySession',
      func: AuthController.verifySession,
      middlewares: [AuthMiddleware.verifySession]
    })
  }
}
