import { DataTypes, Model } from 'sequelize'

export interface iUserAddSchema {
  name: string
  type: string
  email: string
  status: number
  password: string
  password_salt: string
}

export interface iUserSchema extends Model<iUserSchema, iUserAddSchema> {
  id: number
  name: string
  type: string
  email: string
  status: number
  password: string
  password_salt: string
  created_at: string
  updated_at: string
  deleted: boolean
}

export interface iUserViewSchema {
  id: number
  name: string
  type: string
  email: string
  status: number
  created_at: string
  updated_at: string
  deleted: boolean
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
  type_id: {
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
  password_salt: {
    type: DataTypes.STRING,
  },
  created_at: {
    type: DataTypes.DATE,
  },
  updated_at: {
    type: DataTypes.DATE,
  },
  deleted: DataTypes.BOOLEAN
}
