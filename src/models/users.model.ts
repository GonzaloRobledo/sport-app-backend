import { UsersAdapter } from '../adapters/users.adapter'
import { Users } from '../schemas/mongo'
import { UserType } from '../types/users.types'

export class UsersModel {
  public static async getAll () {
    try {
      const users = await Users.find({})

      return { ok: true, data: UsersAdapter.array(users) }
    } catch (e) {
      return { ok: false, error: e }
    }
  }

  public static async getOneByEmail (email: string) {
    try {
      const user = await Users.findOne({ email })

      if (!user) throw "User don't exists"

      return { ok: true, data: UsersAdapter.single(user) }
    } catch (e) {
      return { ok: false, error: e }
    }
  }

  public static async createOne (user: UserType) {
    try {
      const createUser = await Users.create(user)

      if (!createUser) throw "User don't exists"

      return { ok: true, data: UsersAdapter.single(createUser) }
    } catch (e) {
      return { ok: false, error: e }
    }
  }
}
