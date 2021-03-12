import * as Express from 'express'

import { ENV } from './helpers'
import { LoadEndpoints } from './endpoints'
import { Database } from './database'

(() => {
  const env = ENV.initialize()
  
  Database.initialize(env.DATABASE_CONNECTION_STRING)

  const application = Express()
  
  LoadEndpoints(application)

  application.listen(env.SERVER_PORT)
})()
