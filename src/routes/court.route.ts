import { MethodsRoutes } from '../classes/methodRoutes.class'
import { Multer } from '../classes/multer.class'
import { CourtController } from '../controllers/court.ctrl'
import { COURTS_ENDPOINTS } from '../globals/endpointsRoutes'
import { AuthMiddleware } from '../middlewares/auth/auth.middleware'
import { CourtsMiddleware } from '../middlewares/courts/courts.middleware'
import { Router } from 'express'

const multer = new Multer()

export class CourtRoute {
  public router = Router()

  public constructor () {
    this.manageRoutes()
  }

  private manageRoutes () {
    this.router.delete(
      COURTS_ENDPOINTS.DELETE_IMAGE,
      AuthMiddleware.verifyRoleAdmin,
      CourtController.deleteImage
    )
    this.router.put(
      COURTS_ENDPOINTS.ADD_IMAGE,
      multer.getUpload().single('image'),
      AuthMiddleware.verifyRoleAdmin,
      CourtController.addImage
    )

    this.router.get(COURTS_ENDPOINTS.GET_ALL, CourtController.getAll)

    this.router.post(
      COURTS_ENDPOINTS.CREATE,
      multer.getUpload().single('image'),
      AuthMiddleware.verifyRoleAdmin,
      CourtsMiddleware.createValidate,
      CourtController.createOne
    )
    this.router.delete(
      COURTS_ENDPOINTS.DELETE,
      AuthMiddleware.verifyRoleAdmin,
      CourtController.deleteOneById
    )

    this.router.put(
      COURTS_ENDPOINTS.UPDATE,
      AuthMiddleware.verifyRoleAdmin,
      CourtsMiddleware.updateOneValidate,
      CourtController.updateOne
    )
  }
}
