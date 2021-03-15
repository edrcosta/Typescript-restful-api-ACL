import { ErrorRequestHandler, Request, Response, NextFunction } from 'express'
import { LOG } from './'

export class HttpError {
  static handdler(err: ErrorRequestHandler, _req: Request, res: Response, next: NextFunction): void {
    LOG.error(err)
    if (err.name === 'UnauthorizedError') {
      res.status(401).send(err)
    } else {
      next(err)
    }
  }
}
