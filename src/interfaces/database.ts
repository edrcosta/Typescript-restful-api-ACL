import { iUserSchema, iUserTypeSchema } from '../models'
import { Model, ModelCtor } from 'sequelize'

export interface iTableMap{
  [key: string]: ModelCtor<iUserTypeSchema | iUserSchema>
}