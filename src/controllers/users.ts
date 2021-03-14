import { Request, Response } from 'express'
import { CRUD } from '../crud'
import { Database } from '../database'
import {
  iUserListQuery,
  iUserGetOneParams,
  iUserAddSchema,
  iUserDeleteParams,
  iUserUpdateBodySchema,
  iUserUpdateParams,
} from '../interfaces'

export class UsersController {
  async get(req: Request<iUserGetOneParams>, res: Response): Promise<void> {
    const users = new CRUD('Users')

    res.json(await users.getById(req.params.id))
  }

  async list(
    req: Request<null, null, null, iUserListQuery>,
    res: Response
  ): Promise<void> {
    const users = new CRUD('Users')

    res.json(
      await users.listWithPagination(req.query.page ? req.query.page : 1)
    )
  }

  async create(
    req: Request<null, null, iUserAddSchema>,
    res: Response
  ): Promise<void> {
    const users = new CRUD('Users')

    const errors = await users.validate<iUserAddSchema>(req.body)

    if (errors) {
      res.json()
    } else {
      res.json(await Database.tables.Users.create(req.body))
    }
  }

  async update(
    req: Request<iUserUpdateParams, null, iUserUpdateBodySchema>,
    res: Response
  ): Promise<void> {
    const users = new CRUD('Users')

    const errors = await users.validate<iUserUpdateBodySchema>(req.body, true)

    if (errors) {
      res.json(errors)
    } else {
      const updated = await users.udpateById<iUserUpdateBodySchema>(
        req.params.id,
        req.body
      )

      res.json({
        updated: updated[0] === 1,
        data: req.body,
      })
    }
  }

  async delete(req: Request<iUserDeleteParams>, res: Response): Promise<void> {
    const users = new CRUD('Users')

    const updated = await users.udpateById<iUserUpdateBodySchema>(
      req.params.id,
      {
        deleted: true,
      }
    )

    res.json({ deleted: updated[0] === 1 })
  }
}
