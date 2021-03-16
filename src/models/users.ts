import { DataTypes } from 'sequelize'
import { Database } from '../bussiness'
import { CryptoHelper, LOG } from '../helpers'
import { iUserAddSchema, iUserSchema } from '../interfaces'

export class UserModel {
  static schema = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    typeId: {
      field: 'type_id',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    status: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordSalt: {
      field: 'password_salt',
      type: DataTypes.STRING,
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
    },
    deleted: DataTypes.BOOLEAN,
  }

  static async create(user: iUserAddSchema): Promise<boolean | number> {
    try {
      const pass = CryptoHelper.getPasswordHash(user.password)

      user.password = pass.hash
      user.passwordSalt = pass.salt

      const result = await Database.tables.Users.create(user)

      if (result.id) return result.id
    } catch (error) {
      LOG.error(error)
      return false
    }
    return false
  }

  static async checkExist(email: string): Promise<iUserSchema | null> {
    return Database.tables.Users.findOne({
      where: {
        ...Database.softDelete,
        email: email,
        status: 'ATIVO',
      },
      include: [Database.tables.UserTypes],
    })
  }

  static listWithPagination(page: number): Promise<iUserSchema[]> {
    const perPage = 10
    return Database.tables.Users.findAll({
      where: {
        deleted: null,
        status: 'ATIVO',
      },
      limit: perPage,
      attributes: {
        exclude: ['passwordSalt', 'password', 'deleted'],
      },
      include: [Database.tables.UserTypes],
      offset: (page + 1) * perPage - perPage,
    })
  }

  static async getByEmail(email: string): Promise<iUserSchema | null> {
    return Database.tables.Users.findOne({
      where: {
        ...Database.softDelete,
        email: email,
        status: 'ATIVO',
      },
      include: [Database.tables.UserTypes],
    })
  }
}
