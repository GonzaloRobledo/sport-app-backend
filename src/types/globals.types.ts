import { Types } from 'mongoose'

export type MongooseIdType = Types.ObjectId | string

export type GlobalMongoDBType = {
  _id: MongooseIdType
  createdAt: any
  updatedAt: any
}
