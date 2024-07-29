import { CourtsAdapter } from '../adapters/courts.adapter'
import { Cloudinary } from '../classes/cloudinary.class'
import { Courts } from '../schemas/mongo'
import { CourtType } from '../types/courts.types'
import { MongooseIdType } from '../types/globals.types'

export class CourtsModel {
  public static async getAll () {
    try {
      const courts = await Courts.find({})

      return { ok: true, data: CourtsAdapter.array(courts) }
    } catch (e) {
      return { ok: false, error: e }
    }
  }

  public static async getOneById (id: MongooseIdType | string) {
    try {
      const court = await Courts.findOne({ _id: id })

      if (!court) throw "Court don't exists: " + id

      return { ok: true, data: CourtsAdapter.single(court) }
    } catch (e) {
      return { ok: false, error: e }
    }
  }

  public static async createOne (court: CourtType) {
    try {
      const createCourt = await Courts.create(court)

      if (!createCourt) throw "Court don't exists"

      return { ok: true, data: CourtsAdapter.single(createCourt) }
    } catch (e) {
      return { ok: false, error: e }
    }
  }

  public static async deleteOneById (id: MongooseIdType | string) {
    try {
      const courtDelete = await Courts.findOneAndDelete({ _id: id })

      if (!courtDelete) throw 'An error ocurred trying delete court: ' + id

      console.log(courtDelete)

      return { ok: true, message: 'Delete successful!' }
    } catch (e) {
      return { ok: false, error: e }
    }
  }

  public static async addImage ({
    id,
    image
  }: {
    id: MongooseIdType | string
    image: { id: string; url: string }
  }) {
    try {
      const update = await Courts.findOneAndUpdate(
        { _id: id },
        { $push: { images: image } },
        { new: true }
      )

      if (!update) throw 'An error ocurred trying update images court'

      return { ok: true, data: CourtsAdapter.single(update) }
    } catch (e) {
      return { ok: false, error: e }
    }
  }

  public static async deleteImageById ({
    id,
    imageId
  }: {
    id: MongooseIdType | string
    imageId: string
  }) {
    try {
      const update = await Courts.findOneAndUpdate(
        { _id: id },
        { $pull: { images: { id: imageId } } },
        { new: true }
      )

      if (!update) throw 'An error ocurred trying update deleteImageById court'

      return { ok: true, data: CourtsAdapter.single(update) }
    } catch (e) {
      return { ok: false, error: e }
    }
  }

  public static async updateOne ({
    id,
    data
  }: {
    id: MongooseIdType | string
    data: Omit<CourtType, 'images'>
  }) {
    try {
      const update = await Courts.findOneAndUpdate({ _id: id }, data, {
        new: true
      })

      if (!update) throw 'An error ocurred trying update fields court'

      return { ok: true, data: CourtsAdapter.single(update) }
    } catch (e) {
      return { ok: false, error: e }
    }
  }
}
