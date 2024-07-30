import { MethodsRoutes } from '../classes/methodRoutes.class'
import { Multer } from '../classes/multer.class'
import { CourtController } from '../controllers/court.ctrl'
import { CourtsMiddleware } from '../middlewares/courts/courts.middleware'
import { Router } from 'express'
import { COURTS_ENDPOINTS } from './constants'

const multer = new Multer()

export class CourtRoute {
  public router = Router()

  public constructor () {
    this.manageRoutes()
  }

  private manageRoutes () {
    this.router.get(COURTS_ENDPOINTS.GET_ALL, CourtController.getAll)

    this.router.post(
      COURTS_ENDPOINTS.CREATE,
      multer.getUpload().single('image'),
      CourtsMiddleware.createValidate,
      CourtController.createOne
    )
    this.router.delete(COURTS_ENDPOINTS.DELETE, CourtController.deleteOneById)

    this.router.delete(
      COURTS_ENDPOINTS.ADD_IMAGE,
      multer.getUpload().single('image'),
      CourtController.addImage
    )
    this.router.put(
      COURTS_ENDPOINTS.UPDATE,
      CourtsMiddleware.updateOneValidate,
      CourtController.updateOne
    )
    this.router.delete(
      COURTS_ENDPOINTS.DELETE_IMAGE,
      CourtController.deleteImage
    )
  }
}
