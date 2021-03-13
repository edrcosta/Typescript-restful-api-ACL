import { DataTypes, Model } from 'sequelize'

export interface iUserAddSchema {
  name: string
  typeId: string
  email: string
  status: number
  password: string
  passwordSalt: string
}

export interface iUserSchema extends Model<iUserSchema, iUserAddSchema> {
  id: number
  name: string
  typeId: string
  email: string
  status: number
  password: string
  passwordSalt: string
  createdAt: string
  updatedAt: string
  deleted: boolean
}

export interface iUserViewSchema {
  id: number
  name: string
  typeId: string
  email: string
  status: number
  createdAt: string
  updatedAt: string
}

export const UserModelSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  typeId: {
    field: 'type_id',
    type: DataTypes.INTEGER,
  },
  email: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
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
  deleted: DataTypes.BOOLEAN
}
