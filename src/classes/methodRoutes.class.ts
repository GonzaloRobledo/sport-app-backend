import { Router } from 'express'

export class MethodsRoutes {
  protected rt = Router()
  private startRoute: string = ''

  protected constructor (startRoute: string = '') {
    this.startRoute = startRoute
  }

  protected GET ({
    startWith = '/',
    func,
    middlewares = []
  }: {
    startWith: string
    func: any
    middlewares?: any[]
  }) {
    return this.rt.get(`${this.startRoute}${startWith}`, ...middlewares, func)
  }
  protected POST ({
    startWith = '/',
    func,
    middlewares = []
  }: {
    startWith: string
    func: any
    middlewares?: any[]
  }) {
    return this.rt.post(`${this.startRoute}${startWith}`, ...middlewares, func)
  }

  protected PUT ({
    startWith = '/',
    func,
    middlewares = []
  }: {
    startWith: string
    func: any
    middlewares?: any[]
  }) {
    return this.rt.put(`${this.startRoute}${startWith}`, ...middlewares, func)
  }
  protected DELETE ({
    startWith = '/',
    func,
    middlewares = []
  }: {
    startWith: string
    func: any
    middlewares?: any[]
  }) {
    return this.rt.delete(
      `${this.startRoute}${startWith}`,
      ...middlewares,
      func
    )
  }
}
