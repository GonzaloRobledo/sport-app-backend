import { z } from 'zod'
import { CourtType } from '../types/courts.types'

export class CourtValidator {
  public static create (data: Partial<CourtType>) {
    const schema = z.object({
      name: z
        .string({
          required_error: 'Name is required'
        })
        .min(3),
      description: z.optional(z.string())
    })

    return schema.safeParse(data)
  }

  public static updateOne (data: Partial<CourtType>) {
    const schema = z.object({
      id: z.string({
        required_error: 'Id is required'
      }),
      name: z
        .string({
          required_error: 'Name is required'
        })
        .min(3),
      description: z.optional(z.string())
    })

    return schema.safeParse(data)
  }
}
