import { Model } from 'sequelize'
import { iUserTypeSchema } from './user-types'

export interface iUserAddSchema {
  name: string
  typeId: number
  email: string
  status: string
  password: string
  passwordSalt?: string
  [key: string]: string | number | boolean | undefined
}

export interface iUserUpdateBodySchema {
  id?: number
  name?: string
  typeId?: number
  email?: string
  status?: string
  password?: string
  passwordSalt?: string
  deleted?: boolean
  [key: string]: string | number | boolean | undefined
}

export interface iUserSchema extends Model<iUserSchema, iUserAddSchema> {
  UserType?: iUserTypeSchema
  id: number
  name: string
  typeId: number
  email: string
  status: string
  password: string
  passwordSalt: string
  createdAt: string
  updatedAt: string
  deleted: boolean
}

export interface iUserViewSchema {
  id: number
  name: string
  typeId: number
  email: string
  status: string
  createdAt: string
  updatedAt: string
}
