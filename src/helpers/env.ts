import { iEnv } from '../interfaces'

export class ENV {
  static initialize(): iEnv {
    const envFile = require('../../env.json')

    return {
      SERVER_PORT: envFile.SERVER_PORT || 3000,
      DATABASE_CONNECTION_STRING: envFile.DATABASE_CONNECTION_STRING || 'sqlite::memory:',
    }
  }
}
