import { Sequelize } from 'sequelize'
import { iUserSchema, iUserAddSchema, UserModelSchema } from './models'
import { iUserTypeSchema, iUserTypeAddSchema, UserTypeModelSchema } from './models'
import { iTableMap } from './interfaces'

export class Database {
  static connection: Sequelize
  static tables: iTableMap
  
  static initialize(connectionString: string) {
    const sequelize = new Sequelize(connectionString)

    Database.tables = {
      users: sequelize.define<iUserSchema, iUserAddSchema>('Users', UserModelSchema),
      userTypes: sequelize.define<iUserTypeSchema, iUserTypeAddSchema>('UserTypes', UserTypeModelSchema)
    }
  }
}
