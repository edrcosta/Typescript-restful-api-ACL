import { DataTypes } from 'sequelize'
import { Database } from '../bussiness'
import { iUserTypeSchema } from '../interfaces'

export class UserTypesModel {
  static schema = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.STRING,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.STRING,
    },
    deleted: DataTypes.BOOLEAN,
  }

  static async exists(userType: string): Promise<boolean> {
    const typeDb = await Database.tables.UserTypes.findOne({
      where: {
        ...Database.softDelete,
        name: userType,
      },
    })

    return typeDb?.id ? true : false
  }

  static listWithPagination(page: number): Promise<iUserTypeSchema[]> {
    const perPage = 10
    return Database.tables.UserTypes.findAll({
      where: {
        ...Database.softDelete,
      },
      limit: perPage,
      attributes: {
        exclude: ['deleted'],
      },
      include: [Database.tables.UserTypes],
      offset: (page + 1) * perPage - perPage,
    })
  }
}
