import { Express } from 'express'

import {
  UsersController,
  UserTypesController,
  AuthenticationController,
} from './controllers'

const users = new UsersController()
const userTypes = new UserTypesController()
const authentication = new AuthenticationController()

export const LoadEndpoints = (application: Express): void => {
  application.post('/login', authentication.login)
  application.get('/users', users.list)
  application.get('/users/:id', users.get)
  application.put('/users/:id', users.update)
  application.post('/users', users.create)
  application.delete('/users/:id', users.delete)
  application.get('/types', userTypes.list)
  application.get('/types/:id', userTypes.get)
}
