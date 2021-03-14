import { Express } from 'express'
import { UsersController, UserTypesController } from './controllers'

const users = new UsersController()
const userTypes = new UserTypesController()

export const LoadEndpoints = (application: Express): void => {
  application.get('/users', users.list)
  application.get('/users/:id', users.get)
  application.put('/users/:id', users.update)
  application.post('/users', users.create)
  application.delete('/users', users.delete)

  application.get('/types', userTypes.list)
  application.get('/types/:id', userTypes.get)
  // application.put('/types/:id', userTypes.update)
  // application.post('/types', userTypes.create)
  // application.delete('/types', userTypes.delete)
}
