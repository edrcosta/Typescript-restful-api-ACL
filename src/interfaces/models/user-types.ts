import { Model } from 'sequelize'

export interface iUserTypeAddSchema {
  name: string
  description: string
}

export interface iUserTypeSchema
  extends Model<iUserTypeSchema, iUserTypeAddSchema> {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
  deleted: boolean
}

export interface iUserTypeViewSchema {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
}
