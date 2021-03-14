import { iUserSchema, iUserTypeSchema } from '../interfaces'
import { ModelCtor } from 'sequelize'

export interface iTableMap {
  Users: ModelCtor<iUserSchema>
  UserTypes: ModelCtor<iUserTypeSchema>
  [key: string]: ModelCtor<iUserSchema | iUserTypeSchema>
}
