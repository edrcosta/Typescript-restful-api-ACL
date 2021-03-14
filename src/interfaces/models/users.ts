import { Model } from 'sequelize'

export interface iUserAddSchema {
  name: string
  typeId: string
  email: string
  status: number
  password: string
  passwordSalt?: string
  [key: string]: string | number | boolean | undefined
}

export interface iUserUpdateBodySchema {
  name?: string
  typeId?: string
  email?: string
  status?: number
  password?: string
  passwordSalt?: string
  deleted?: boolean
  [key: string]: string | number | boolean | undefined
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
