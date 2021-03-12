import { iEndpoint } from './interfaces/'
import {
  UsersController,
  UserTypesController,
  AuthenticationController,
} from './controllers'

const users = new UsersController()
const userTypes = new UserTypesController()
const authentication = new AuthenticationController()

export const Endpoints: Array<iEndpoint> = [
  { url: '/users', handdler: users.create, method: 'POST' },
  { url: '/users', handdler: users.list, method: 'GET' },
  { url: '/users/:id', handdler: users.get, method: 'GET' },
  { url: '/users/:id', handdler: users.update, method: 'PUT' },
  { url: '/users/:id', handdler: users.delete, method: 'DELETE' },
  { url: '/types', handdler: userTypes.create, method: 'POST' },
  { url: '/types', handdler: userTypes.list, method: 'GET' },
  { url: '/types/:id', handdler: userTypes.get, method: 'GET' },
  { url: '/types/:id', handdler: userTypes.update, method: 'PUT' },
  { url: '/types/:id', handdler: userTypes.delete, method: 'DELETE' },
  {
    url: '/authentication',
    handdler: authentication.generateToken,
    method: 'POST',
  },
]
