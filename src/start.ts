import * as Express from 'express'
import { urlencoded, json } from 'body-parser'

import { ENV } from './helpers'
import { LoadEndpoints } from './endpoints'
import { Database } from './bussiness/database'
import { HttpError } from './helpers/'
import { Authentication } from './bussiness'
;(() => {
  const env = ENV.initialize()

  Database.initialize(env.DATABASE)

  const auth = new Authentication()
  const application = Express()

  application.use(auth.middleware)
  application.use(urlencoded({ extended: false }))
  application.use(json())
  application.use(HttpError.handdler)

  LoadEndpoints(application)

  application.listen(env.SERVER_PORT)

  console.log(`Server running on port ${env.SERVER_PORT}`)
})()
