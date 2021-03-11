import { UsersController } from './controllers'
import { iEndpoint } from './interfaces/'

const users = new UsersController()

export const Endpoints : Array<iEndpoint> = [
    { url: '/users', handdler: users.create, method: 'POST' },
    { url: '/users', handdler: users.create, method: 'GET' },
    { url: '/users/:id', handdler: users.create, method: 'GET' },
    { url: '/users/:id', handdler: users.create, method: 'PUT' },
    { url: '/users/:id', handdler: users.create, method: 'DELETE' },
]
