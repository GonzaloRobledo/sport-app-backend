import { GlobalMongoDBType, MongooseIdType } from './globals.types'

export type UserTypeDB = GlobalMongoDBType & {
  name: string
  lastName: string
  password: string
  email: string
  phone?: number | null
  role: string
}

export type UserType = {
  id: MongooseIdType
  createdAt?: string
  updatedAt?: string
  name: string
  lastName: string
  password: string
  email: string
  phone?: number | null
  role: string
}
