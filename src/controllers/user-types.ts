import { Request, Response } from 'express'
import { CRUD } from '../crud'
import { iUserTypeGetOneParams, iUserTypeListQuery } from '../interfaces'
import { Database } from '../database'

export class UserTypesController {
  /**
   * Endpoint to get an User Type by id
   */
  async get(req: Request<iUserTypeGetOneParams>, res: Response): Promise<void> {
    res.json(
      await Database.tables.UserTypes.findOne({
        where: {
          id: req.params.id,
        },
      })
    )
  }

  /**
   * Endpoint to list User Types with pagination
   */
  async list(
    req: Request<null, null, null, iUserTypeListQuery>,
    res: Response
  ): Promise<void> {
    const userTypes = new CRUD('UserTypes')

    res.json(
      await userTypes.listWithPagination(req.query.page ? req.query.page : 1)
    )
  }
}
