import * as jwt from 'jsonwebtoken'
import { Response, NextFunction, Request } from 'express'
import { Database } from './database'

import {
  iAuthResponse,
  iEnv,
  iAccessTokenDecoded,
  iAuthRequest,
  iUserSchema,
} from '../interfaces'
import { ENV } from '../helpers/env'

export class Authentication {
  env: iEnv
  authenticationError = {
    error: 'Unauthorized client',
    statusCode: 401,
  }

  constructor() {
    this.env = ENV.initialize()
  }

  /**
   * Check if an user exists in database
   */
  async checkUserExists(
    email: string,
    password: string
  ): Promise<iUserSchema | null> {
    return Database.tables.Users.findOne({
      where: {
        email: email,
        password: password,
        deleted: null,
        status: 'ATIVO',
      },
      include: [Database.tables.UserTypes],
    })
  }

  /**
   * Generate an Json web token with user data case found a valid user
   */
  async generateToken(email: string, password: string): Promise<iAuthResponse> {
    const user = await this.checkUserExists(email, password)
    if (!user || !user.UserType) {
      return {
        statusCode: 401,
        accessToken: '',
      }
    }

    const tokenData: iAccessTokenDecoded = {
      id: user.id,
      user: user.name,
      userType: user.UserType.name,
    }

    console.log(tokenData)

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
      res.status(401)
      next()
    } else {
      const auth = new Authentication()

      if (req.headers?.authorization) {
        const validDecodedToken = auth.validateAccess(req.headers.authorization)

        if (validDecodedToken) {
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

  async checkUserTypeExists(userType: string): Promise<boolean> {
    const typeDb = await Database.tables.UserTypes.findOne({
      where: {
        deleted: null,
        name: userType,
      },
    })

    return typeDb?.id ? true : false
  }

  userHasPermission(
    userType: string | undefined,
    requiredType: string
  ): boolean {
    if (!userType) return false

    if (!this.checkUserTypeExists(userType)) return false

    if (!this.checkUserTypeExists(requiredType)) {
      throw new Error('you are tryng to check an user type that dont exists')
    }

    return userType === requiredType
  }
}
