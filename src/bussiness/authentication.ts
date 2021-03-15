import * as jwt from 'jsonwebtoken'
import { Response, NextFunction, Request } from 'express'
import { CryptoHelper } from '../helpers'

import { iAuthResponse, iEnv, iAccessTokenDecoded, iAuthRequest } from '../interfaces'
import { ENV } from '../helpers/env'
import { UserModel, UserTypesModel } from '../models'

export class Authentication {
  env: iEnv
  authenticationError: iAuthResponse = {
    error: 'Unauthorized client',
    statusCode: 401,
    accessToken: '',
  }

  userTypesEnum = { geral: 'geral' }

  static loggedData: iAccessTokenDecoded

  constructor() {
    this.env = ENV.initialize()
  }

  /**
   * Generate an Json web token with user data case found a valid user
   */
  async generateToken(email: string, password: string): Promise<iAuthResponse> {
    const user = await UserModel.getByEmail(email)

    if (!user || !user.UserType || !user.passwordSalt) {
      return this.authenticationError
    }

    if (user.password !== CryptoHelper.encipher(password + user.passwordSalt)) {
      return this.authenticationError
    }

    const tokenData: iAccessTokenDecoded = {
      id: user.id,
      userTypeId: user.UserType.id,
      user: user.name,
      userType: user.UserType.name,
    }

    return {
      statusCode: 200,
      accessToken: jwt.sign(tokenData, this.env.JWT_SECRET, {
        expiresIn: 129600,
      }),
    }
  }

  /**
   * validate a given json web token
   */
  validateAccess(token: string): iAccessTokenDecoded | false {
    try {
      // i use any here because there is an issue with jwt.verify return type https://github.com/auth0/node-jsonwebtoken/issues/483
      const decoded: any = jwt.verify(token.replace('Bearer ', ''), this.env.JWT_SECRET)

      return {
        id: decoded.id,
        user: decoded.user,
        userType: decoded.userType,
        userTypeId: decoded.userType.id,
        iat: decoded.iat,
        exp: decoded.exp,
      }
    } catch (error) {
      return false
    }
  }

  /**
   * Validate the access of an user
   */
  middleware = (req: Request<iAuthRequest>, res: Response, next: NextFunction): void | Response<iAuthResponse> => {
    if (req.path === '/login') return next()

    const auth = new Authentication()

    if (req.headers?.authorization) {
      const validDecodedToken = auth.validateAccess(req.headers.authorization)

      if (validDecodedToken) {
        Authentication.loggedData = validDecodedToken
        req.headers.authorization = validDecodedToken.userType
        return next()
      }
    }

    res.status(401)
    return res.json(this.authenticationError)
  }

  /**
   * Check if permission exists and if match an array of permissions
   */
  userHasPermission(userType: string | undefined, requiredType: Array<string>): boolean {
    if (!userType || requiredType.indexOf(userType) === -1) return false

    if (!UserTypesModel.exists(userType)) return false

    if (!UserTypesModel.exists(requiredType[requiredType.indexOf(userType)])) {
      throw new Error('you are tryng to check an user type that dont exists')
    }

    return userType === requiredType[requiredType.indexOf(userType)]
  }
}
