import { Sequelize } from 'sequelize'
import { UserModelSchema, UserTypeModelSchema } from '../models'
import {
  iEnvDatabase,
  iTableMap,
  iUserTypeSchema,
  iUserTypeAddSchema,
  iUserSchema,
  iUserAddSchema,
} from '../interfaces'

export class Database {
  static connection: Sequelize
  static tables: iTableMap

  static initialize(envDb: iEnvDatabase): void {
    const sequelize = new Sequelize(envDb.SCHEMA, envDb.USER, envDb.PASSWORD, {
      host: envDb.HOST,
      dialect: envDb.DIALECT,
      logging: false,
    })

    // Define tables
    Database.tables = {
      Users: sequelize.define<iUserSchema, iUserAddSchema>(
        'Users',
        UserModelSchema
      ),
      UserTypes: sequelize.define<iUserTypeSchema, iUserTypeAddSchema>(
        'UserTypes',
        UserTypeModelSchema
      ),
    }

    //Define Relationships
    Database.tables.Users.hasOne(Database.tables.UserTypes, {
      foreignKey: 'id',
      sourceKey: 'typeId',
    })
  }
}
