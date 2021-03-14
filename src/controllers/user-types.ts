import { Request, Response } from 'express'
import { CRUD } from '../crud'
import { iUserTypeGetOneParams, iUserTypeListQuery } from '../interfaces'

export class UserTypesController {
  async get(req: Request<iUserTypeGetOneParams>, res: Response): Promise<void> {
    const users = new CRUD('UserTypes')

    res.json(await users.getById(req.params.id))
  }

  async list(
    req: Request<null, null, null, iUserTypeListQuery>,
    res: Response
  ): Promise<void> {
    const users = new CRUD('UserTypes')

    res.json(
      await users.listWithPagination(req.query.page ? req.query.page : 1)
    )
  }
}
