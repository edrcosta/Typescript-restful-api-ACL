import { DataTypes, Model, Sequelize } from 'sequelize'

export interface iUserTypeAddSchema {
  name: string
  description: string
}

export interface iUserTypeSchema extends Model<iUserTypeSchema, iUserTypeAddSchema> {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
  deleted: boolean
}

export interface iUserTypeViewSchema {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
  deleted: boolean
}

export const UserTypeModelSchema = {
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
  created_at: {
    type: DataTypes.STRING,
  },
  updated_at: {
    type: DataTypes.STRING,
  },
  deleted: DataTypes.BOOLEAN
}
