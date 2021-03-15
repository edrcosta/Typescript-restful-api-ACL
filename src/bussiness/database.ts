import { Sequelize } from 'sequelize'
import { UserModel, UserTypesModel } from '../models'
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

  static softDelete = {
    deleted: null,
  }

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
        UserModel.schema
      ),
      UserTypes: sequelize.define<iUserTypeSchema, iUserTypeAddSchema>(
        'UserTypes',
        UserTypesModel.schema
      ),
    }

    //Define Relationships
    Database.tables.Users.hasOne(Database.tables.UserTypes, {
      foreignKey: 'id',
      sourceKey: 'typeId',
    })
  }
}
