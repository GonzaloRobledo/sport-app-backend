import { GlobalMongoDBType, MongooseIdType } from './globals.types'

export type CourtTypeDB = GlobalMongoDBType & {
  name: string
  description: string
  images: {
    url: string
    id: string
  }[]
}

export type CourtType = {
  id: MongooseIdType | string
  createdAt?: string
  updatedAt?: string
  name: string
  description: string
  images: {
    url: string
    id: string
  }[]
}
