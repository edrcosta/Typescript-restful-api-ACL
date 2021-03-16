import { Application } from 'express'
import { UsersController, UserTypesController, AuthenticationController } from './controllers'

const users = new UsersController()
const userTypes = new UserTypesController()
const authentication = new AuthenticationController()

export const LoadEndpoints = (application: Application): void => {
  application.post('/login', authentication.login)
  application.post('/users', users.create)

  application.get('/users', users.list)
  application.get('/users/:id', users.get)
  application.get('/types', userTypes.list)
  application.get('/types/:id', userTypes.get)

  application.put('/users/:id', users.update)
  application.delete('/users/:id', users.delete)
}
