import { Request, response, Response } from 'express'
import { CourtsModel } from '../models/courts.model'
import { Cloudinary } from '../classes/cloudinary.class'

export class CourtController {
  public static async getAll (req: Request, res: Response) {
    const response = await CourtsModel.getAll()
    res.send(response)
  }

  public static async createOne (req: Request, res: Response) {
    try {
      const cloudinary = Cloudinary.createInstance()

      const images = []

      if (req.file) {
        if (cloudinary) {
          const response = await cloudinary.upload(req.file.path)

          if (response.ok) {
            images.push({
              id: response.data.public_id,
              url: response.data.secure_url
            })
          }
        } else {
          console.log("Don't exists instance cloudinary!")
        }
      } else {
        console.log("Don't exists file!")
      }

      const responsePost = await CourtsModel.createOne({ ...req.body, images })

      res.send(responsePost)
    } catch (e) {
      console.log('Error in createOne court: ', e)
      res.send({ ok: false, error: e })
    }
  }

  public static async deleteOneById (req: Request, res: Response) {
    const id: any = req.query.id

    if (!id) return res.send({ ok: false, error: 'Id is required' })

    const responseGetOne = await CourtsModel.getOneById(id)

    if (!responseGetOne.ok) return res.send(responseGetOne)

    const court = responseGetOne.data!

    const publics_ids = court.images.map(el => el.id)

    const cloudinary = Cloudinary.createInstance()

    if (cloudinary) {
      console.log('Deleting images of cloudinary...')
      await Promise.all(publics_ids.map(el => cloudinary.delete(el)))
    }

    const response = await CourtsModel.deleteOneById(id)

    res.send(response)
  }

  public static async addImage (req: Request, res: Response) {
    try {
      const { file } = req
      const { id } = req.body

      if (!id) return res.send({ ok: false, error: 'Id is required' })

      if (!file) return res.send({ ok: false, error: 'File is required' })

      const cloudinary = Cloudinary.createInstance()

      if (!cloudinary)
        return res.send({
          ok: false,
          error: "Cloudinary instance doesn't exist"
        })

      const saveImage = await cloudinary.upload(file.path)

      if (!saveImage.ok) return res.send(saveImage)

      const { public_id, secure_url } = saveImage.data
      const responseAddImage = await CourtsModel.addImage({
        id,
        image: {
          id: public_id,
          url: secure_url
        }
      })

      res.send(responseAddImage)
    } catch (e) {
      console.log('Error in addImage court: ', e)
      res.send({ ok: false, error: e })
    }
  }

  public static async deleteImage (req: Request, res: Response) {
    try {
      const { imageId, id }: any = req.query

      if (!id) return res.send({ ok: false, error: 'Court ID is required' })

      if (!imageId)
        return res.send({ ok: false, error: 'Image ID is required' })

      const cloudinary = Cloudinary.createInstance()

      if (!cloudinary)
        return res.send({
          ok: false,
          error: "Cloudinary instance doesn't exist"
        })

      const deleteImage = await cloudinary.delete(id)

      if (!deleteImage.ok) return res.send(deleteImage)

      const responseRemove = await CourtsModel.deleteImageById({ id, imageId })

      res.send(responseRemove)
    } catch (e) {
      console.log('Error in addImage court: ', e)
      res.send({ ok: false, error: e })
    }
  }

  public static async updateOne (req: Request, res: Response) {
    try {
      console.log(req.body)

      const { id, ...data } = req.body

      const response = await CourtsModel.updateOne({ id, data })

      res.send(response)
    } catch (e) {
      console.log('Error in addImage court: ', e)
      res.send({ ok: false, error: e })
    }
  }
}
