import { Sequelize } from 'sequelize'
import { 
  iUserSchema, 
  iUserAddSchema, 
  UserModelSchema,
  iUserTypeSchema,
  iUserTypeAddSchema,
  UserTypeModelSchema
} from './models'

import { iEnvDatabase, iTableMap } from './interfaces'

export class Database {
  static connection: Sequelize
  static tables: iTableMap

  static initialize(envDb: iEnvDatabase) {
    const sequelize = new Sequelize(envDb.SCHEMA, envDb.USER, envDb.PASSWORD, {
      host: envDb.HOST,
      dialect: envDb.DIALECT,
      logging: false
    })

    Database.tables = {
      users: sequelize.define<iUserSchema, iUserAddSchema>(
        'Users',
        UserModelSchema
      ),
      userTypes: sequelize.define<iUserTypeSchema, iUserTypeAddSchema>(
        'UserTypes',
        UserTypeModelSchema
      ),
    }
  }
}
