import { Request, Response } from 'express'
import { iUserTypeGetOneParams, iUserTypeListQuery, iUserTypeSchema } from '../interfaces'
import { Database } from '../bussiness/database'
import { UserTypesModel } from '../models'
import { Authentication } from '../bussiness'

export class UserTypesController {
  /**
   * Endpoint to get an User Type by id
   */
  async get(req: Request<iUserTypeGetOneParams>, res: Response): Promise<Response<null | iUserTypeSchema>> {
    const auth = new Authentication()

    if (!auth.userHasPermission(req.headers.authorization, ['admin', 'root'])) {
      return res.json(auth.authenticationError)
    }

    return res.json(
      await Database.tables.UserTypes.findOne({
        where: { id: req.params.id },
        attributes: { exclude: ['deleted'] },
      })
    )
  }

  /**
   * Endpoint to list User Types with pagination
   */
  async list(req: Request<null, null, null, iUserTypeListQuery>, res: Response): Promise<Response<iUserTypeSchema[]>> {
    const auth = new Authentication()

    if (!auth.userHasPermission(req.headers.authorization, ['admin', 'root'])) {
      return res.json(auth.authenticationError)
    }

    return res.json(await UserTypesModel.listWithPagination(req.query.page ? req.query.page : 0))
  }
}
