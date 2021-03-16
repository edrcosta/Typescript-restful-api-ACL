import { Request, Response } from 'express'
import { CRUD, Authentication } from '../bussiness'
import { Database } from '../bussiness/database'
import { UserModel } from '../models'
import {
  iUserListQuery,
  iUserGetOneParams,
  iUserAddSchema,
  iUserDeleteParams,
  iUserUpdateBodySchema,
  iUserUpdateParams,
  iUserSchema,
  iAuthResponse,
  iValidateErrors,
  iUserUpdateResponse,
  iUserDeletedResponse,
} from '../interfaces'

export class UsersController {
  /**
   * Endpoint to get an user by id
   */
  async get(req: Request<iUserGetOneParams>, res: Response): Promise<Response<iUserSchema>> {
    const auth = new Authentication()

    let findId = req.params.id
    if (Authentication.loggedData.userType === auth.userTypesEnum.geral) {
      findId = Authentication.loggedData.id
    }

    return res.json(
      await Database.tables.Users.findOne({
        where: {
          ...Database.softDelete,
          id: findId,
        },
        include: [Database.tables.UserTypes],
      })
    )
  }

  /**
   * Endpoint to List Users with pagination
   */
  async list(req: Request<null, null, null, iUserListQuery>, res: Response): Promise<Response<iUserSchema[]>> {
    const auth = new Authentication()

    if (!auth.userHasPermission(req.headers.authorization, ['admin', 'root'])) {
      return res.json(auth.authenticationError)
    }
    return res.json(await UserModel.listWithPagination(req.query.page ? req.query.page : 0))
  }

  /**
   * Endpoint to Create new User
   */
  async create(req: Request<null, null, iUserAddSchema>, res: Response): Promise<Response<iUserSchema | iValidateErrors | iAuthResponse>> {
    const auth = new Authentication()

    if (!auth.userHasPermission(req.headers.authorization, ['admin', 'root'])) {
      return res.json(auth.authenticationError)
    }

    const errors = await CRUD.validate<iUserUpdateBodySchema>(Database.tables.Users, req.body)

    if (errors) return res.json({ errors: errors })

    const exists = await UserModel.checkExist(req.body.email)

    if (exists === null) return res.json(await UserModel.create(req.body))

    return res.json({
      errors: ['this user aready exists'],
    })
  }

  /**
   * Endpoint to update an user by id
   */
  async update(req: Request<iUserUpdateParams, null, iUserUpdateBodySchema>, res: Response): Promise<Response<iUserUpdateResponse | iAuthResponse | iValidateErrors>> {
    const auth = new Authentication()

    if (!auth.userHasPermission(req.headers.authorization, ['admin', 'root'])) {
      return res.json(auth.authenticationError)
    }

    const errors = await CRUD.validate<iUserUpdateBodySchema>(Database.tables.Users, req.body, true)

    if (errors) return res.json(errors)

    const updated = await Database.tables.Users.update(req.body, {
      where: { id: req.params.id },
    })

    return res.json({
      updated: updated[0] === 1,
      data: req.body,
    })
  }

  /**
   * Endpoint to Soft delete a user
   */
  async delete(req: Request<iUserDeleteParams>, res: Response): Promise<Response<iValidateErrors | iUserDeletedResponse>> {
    const auth = new Authentication()

    if (!auth.userHasPermission(req.headers.authorization, ['root'])) {
      return res.json(auth.authenticationError)
    }

    const updated = await Database.tables.Users.update(
      { deleted: true },
      {
        where: {
          ...Database.softDelete,
          id: req.params.id,
        },
      }
    )

    return res.json({ deleted: updated[0] === 1 })
  }
}
