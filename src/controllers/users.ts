import { Request, Response } from 'express'

export class UsersController {
  get(req: Request, res: Response) {
    res.json({
      status: 'success',
      method: 'get',
    })
  }

  list(req: Request, res: Response) {
    res.json({
      status: 'success',
      method: 'list',
    })
  }

  update(req: Request, res: Response) {
    res.json({
      status: 'success',
      method: 'update',
    })
  }

  delete(req: Request, res: Response) {
    res.json({
      status: 'success',
      method: 'delete',
    })
  }

  create(req: Request, res: Response) {
    res.json({
      status: 'success',
      method: 'create',
    })
  }
}
