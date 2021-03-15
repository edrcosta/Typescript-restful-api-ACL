import * as jwt from 'jsonwebtoken'
import { Response, NextFunction, Request } from 'express'
import { Database } from './database'
import { CryptoHelper } from '../helpers'

import {
  iAuthResponse,
  iEnv,
  iAccessTokenDecoded,
  iAuthRequest,
} from '../interfaces'
import { ENV } from '../helpers/env'

export class Authentication {
  env: iEnv
  authenticationError = {
    error: 'Unauthorized client',
    statusCode: 401,
  }

  userTypesEnum = {
    geral: 'geral',
  }

  static loggedData: iAccessTokenDecoded

  constructor() {
    this.env = ENV.initialize()
  }

  /**
   * Generate an Json web token with user data case found a valid user
   */
  async generateToken(email: string, password: string): Promise<iAuthResponse> {
    const user = await Database.tables.Users.findOne({
      where: {
        ...Database.softDelete,
        email: email,
        status: 'ATIVO',
      },
      include: [Database.tables.UserTypes],
    })

    const authFail = {
      statusCode: 401,
      accessToken: '',
    }

    if (!user || !user.UserType || !user.passwordSalt) return authFail

    if (user.password !== CryptoHelper.encipher(password + user.passwordSalt))
      return authFail

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
      // but i still typing the return value from this method so this "any" exists only in this method scope
      const decoded: any = jwt.verify(
        token.replace('Bearer ', ''),
        this.env.JWT_SECRET
      )

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
  middleware = (
    req: Request<iAuthRequest>,
    res: Response,
    next: NextFunction
  ): void => {
    if (req.path === '/login') {
      next()
    } else {
      const auth = new Authentication()

      if (req.headers?.authorization) {
        const validDecodedToken = auth.validateAccess(req.headers.authorization)

        if (validDecodedToken) {
          Authentication.loggedData = validDecodedToken
          req.headers.authorization = validDecodedToken.userType
          next()
        } else {
          res.status(401)
          res.json(this.authenticationError)
        }
      } else {
        res.status(401)
        res.json(this.authenticationError)
      }
    }
  }

  async getUserType(userType: string): Promise<boolean> {
    const typeDb = await Database.tables.UserTypes.findOne({
      where: {
        ...Database.softDelete,
        name: userType,
      },
    })

    return typeDb?.id ? true : false
  }

  userHasPermission(
    userType: string | undefined,
    requiredType: Array<string>
  ): boolean {
    if (!userType || requiredType.indexOf(userType) === -1) return false

    if (!this.getUserType(userType)) return false

    if (!this.getUserType(requiredType[requiredType.indexOf(userType)])) {
      throw new Error('you are tryng to check an user type that dont exists')
    }

    return userType === requiredType[requiredType.indexOf(userType)]
  }
}
