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
  /**
   * Endpoint to get an user by id
   */
  async get(req: Request<iUserGetOneParams>, res: Response): Promise<void> {
    res.json(
      await Database.tables.Users.findOne({
        where: {
          deleted: null,
          id: req.params.id,
        },
      })
    )
  }

  /**
   * Endpoint to List Users with pagination
   */
  async list(
    req: Request<null, null, null, iUserListQuery>,
    res: Response
  ): Promise<void> {
    const users = new CRUD('Users')

    res.json(
      await users.listWithPagination(req.query.page ? req.query.page : 1)
    )
  }

  /**
   * Endpoint to Create new User
   */
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

  /**
   * Endpoint to update an user by id
   */
  async update(
    req: Request<iUserUpdateParams, null, iUserUpdateBodySchema>,
    res: Response
  ): Promise<void> {
    const users = new CRUD('Users')

    const errors = await users.validate<iUserUpdateBodySchema>(req.body, true)

    if (errors) {
      res.json(errors)
    } else {
      const updated = await Database.tables.Users.update(req.body, {
        where: {
          deleted: null,
          id: req.params.id,
        },
      })

      res.json({
        updated: updated[0] === 1,
        data: req.body,
      })
    }
  }

  /**
   * Endpoint to Soft delete a user
   */
  async delete(req: Request<iUserDeleteParams>, res: Response): Promise<void> {
    const softDelete = {
      deleted: true,
    }

    const updated = await Database.tables.Users.update(softDelete, {
      where: {
        deleted: null,
        id: req.params.id,
      },
    })

    res.json({ deleted: updated[0] === 1 })
  }
}
