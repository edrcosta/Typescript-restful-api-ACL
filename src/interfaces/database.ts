import { iUserSchema, iUserTypeSchema } from '../interfaces'
import { ModelCtor } from 'sequelize'

export interface iTableMap {
  [key: string]: ModelCtor<iUserTypeSchema | iUserSchema>
}
