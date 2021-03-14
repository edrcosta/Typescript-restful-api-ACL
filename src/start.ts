import * as Express from 'express'
import { urlencoded, json } from 'body-parser'

import { ENV } from './helpers'
import { LoadEndpoints } from './endpoints'
import { Database } from './database'
;(() => {
  const env = ENV.initialize()

  Database.initialize(env.DATABASE)

  const application = Express()

  application.use(urlencoded({ extended: false }))
  application.use(json())

  LoadEndpoints(application)

  application.listen(env.SERVER_PORT)

  console.log(`Server running on port ${env.SERVER_PORT}`)
})()
