import { Request, Response } from 'express'
import { CRUD } from '../bussiness/crud'
import { iUserTypeGetOneParams, iUserTypeListQuery, iUserTypeSchema } from '../interfaces'
import { Database } from '../bussiness/database'

export class UserTypesController {
  /**
   * Endpoint to get an User Type by id
   */
  async get(req: Request<iUserTypeGetOneParams>, res: Response): Promise<Response<null | iUserTypeSchema>> {
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
    const userTypes = new CRUD('UserTypes')

    return res.json(await userTypes.listWithPagination(req.query.page ? req.query.page : 0, ['deleted']))
  }
}
