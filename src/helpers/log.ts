import { ErrorRequestHandler } from 'express'

export class LOG {
  static error(error: Error | ErrorRequestHandler): void {
    throw error
  }
}
