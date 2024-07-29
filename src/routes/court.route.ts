import { MethodsRoutes } from '../classes/methodRoutes.class'
import { Multer } from '../classes/multer.class'
import { CourtController } from '../controllers/court.ctrl'
import { CourtsMiddleware } from '../middlewares/courts/courts.middleware'

const multer = new Multer()

export class CourtRoute extends MethodsRoutes {
  public router = this.rt

  public constructor (startRoute: string = '') {
    super(startRoute)
    this.manageRoutes()
  }

  manageRoutes () {
    this.GET({
      startWith: '/getAll',
      func: CourtController.getAll
    })
    this.POST({
      startWith: `/create`,
      func: CourtController.createOne,
      middlewares: [
        multer.getUpload().single('image'),
        CourtsMiddleware.createValidate
      ]
    })
    this.DELETE({
      startWith: '/delete',
      func: CourtController.deleteOneById
    })
    this.PUT({
      startWith: '/addImage',
      func: CourtController.addImage,
      middlewares: [multer.getUpload().single('image')]
    })
    this.PUT({
      startWith: '/updateOne',
      func: CourtController.updateOne,
      middlewares: [CourtsMiddleware.updateOneValidate]
    })
    this.DELETE({
      startWith: '/deleteImage',
      func: CourtController.deleteImage
    })
  }
}
