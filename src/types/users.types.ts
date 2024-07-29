import { Types } from 'mongoose'

export type MongooseIdType = Types.ObjectId | string

export type UserTypeDB = {
  _id: MongooseIdType
  createdAt: any
  updatedAt: any
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
