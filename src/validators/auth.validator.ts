import { z } from 'zod'
import { LoginType, RegisterType } from '../types/auth.types'

export class AuthValidator {
  public static login (data: LoginType) {
    const schema = z.object({
      email: z.string({ required_error: 'Email is required!' }).email(),
      password: z
        .string({
          required_error: 'Password is required!'
        })
        .min(5)
    })

    return schema.safeParse(data)
  }

  public static register (data: RegisterType) {
    const schema = z.object({
      email: z
        .string({
          required_error: 'Email is required!'
        })
        .email(),
      password: z
        .string({
          required_error: 'Password is required!'
        })
        .min(5),
      name: z.string({
        required_error: 'Name is required!'
      }),
      lastName: z.string({
        required_error: 'Last name is required!'
      }),
      phone: z.optional(
        z.number({
          required_error: 'Phone is required!'
        })
      )
    })

    return schema.safeParse(data)
  }
}
