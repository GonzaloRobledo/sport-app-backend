import { UserType, UserTypeDB } from '../types/users.types'

export class UsersAdapter {
  public static array (data: UserTypeDB[]): UserType[] {
    return data.map(el => ({
      id: el._id,
      createdAt: el.createdAt,
      updatedAt: el.updatedAt,
      email: el.email,
      name: el.name,
      lastName: el.lastName,
      phone: el.phone,
      password: el.password,
      role: el.role
    }))
  }

  public static single (data: UserTypeDB): UserType {
    return {
      id: data._id,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      email: data.email,
      name: data.name,
      lastName: data.lastName,
      phone: data.phone,
      password: data.password,
      role: data.role
    }
  }
}
