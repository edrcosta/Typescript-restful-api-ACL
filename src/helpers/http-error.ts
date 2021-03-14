import { ErrorRequestHandler, Request, Response, NextFunction } from 'express'

export class HttpError {
  static handdler(
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send(err)
    } else {
      next(err)
    }
  }
}
