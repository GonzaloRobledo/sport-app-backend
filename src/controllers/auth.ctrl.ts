import { Request, Response } from 'express'
import { Token } from '../classes/token.class'
import { UsersModel } from '../models/users.model'
import { Bcrypt } from '../classes/bcrypt.class'
import { UserType } from '../types/users.types'

export class AuthController {
  public static async login (req: Request, res: Response) {
    try {
      //estos datos estan validados a partir de un middleware asique ya son utilizables, sin ese middleware usar directamente el body seria mala practica.
      const { body } = req

      const responseGetUser = await UsersModel.getOneByEmail(body.email)

      if (!responseGetUser.ok) {
        return res.send(responseGetUser)
      }

      const user: UserType | undefined = responseGetUser.data

      if (!user) {
        return res.send({ ok: false, error: "Data user don't exists" })
      }

      const verifyPassword = await Bcrypt.compare(body.password, user.password)

      if (!verifyPassword) {
        return res.send({ ok: false, error: 'Invalid password!' })
      }

      const dataToken = {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role
      }

      const token = Token.sign({
        data: dataToken,
        duration: '1h'
      })

      console.log({ token })

      res.cookie('token', token, {
        httpOnly: true, // La cookie solo está disponible en HTTP(S), no en JavaScript
        secure: process.env.NODE_ENV === 'production', // Solo usa cookies seguras en producción
        maxAge: 24 * 60 * 60 * 1000 // La cookie expira en 24 horas
      })

      res.send({ ok: true, data: dataToken })
    } catch (e) {
      console.log('Error', e)
      res.status(500).send({ ok: false, error: e || 'Server error' })
    }
  }

  public static async register (req: Request, res: Response) {
    try {
      //   console.log(req.url)
      const { body } = req

      const responseGetUser = await UsersModel.getOneByEmail(body.email)

      if (responseGetUser.ok) {
        return res.send({ ok: false, error: 'User already exists!' })
      }

      const hashPassword = await Bcrypt.hash(body.password)

      const responseCreateUser = await UsersModel.createOne({
        ...body,
        password: hashPassword
      })

      if (!responseCreateUser.ok) return responseCreateUser.error

      const token = Token.sign({
        data: {
          name: body.name,
          lastName: body.lastName,
          email: body.email,
          phone: body.phone
        },
        duration: '1h'
      })

      res.cookie('token', token, {
        httpOnly: true, // La cookie solo está disponible en HTTP(S), no en JavaScript
        secure: process.env.NODE_ENV === 'production', // Solo usa cookies seguras en producción
        maxAge: 24 * 60 * 60 * 1000 // La cookie expira en 24 horas
      })

      res.send({ ok: true, message: 'Register ok!' })
    } catch (e) {
      console.log('Error', e)
      res.status(500).send({ ok: false, error: e || 'Server error' })
    }
  }

  public static async verifySession (req: Request, res: Response) {
    try {
      const response = await UsersModel.getOneByEmail(req.body.user_email)

      if (!response.ok) return res.send(response)

      const { email, name, lastName, role } = response.data!

      res.send({ ok: true, data: { email, name, lastName, role } })
    } catch (e) {
      console.log('Error', e)
      res.status(500).send({ ok: false, error: e || 'Server error' })
    }
  }
}
