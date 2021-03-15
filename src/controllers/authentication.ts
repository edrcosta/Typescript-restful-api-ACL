import { Response } from 'express'
import { IAuthRequest } from '../interfaces'
import { Authentication } from '../bussiness'

export class AuthenticationController {
  public async login(req: IAuthRequest, res: Response): Promise<void> {
    const auth = new Authentication()

    const result = await auth.generateToken(req.body.username, req.body.password)

    res.status(result.statusCode)
    res.json(result.statusCode === 401 ? auth.authenticationError : { token: result.accessToken })
  }
}
