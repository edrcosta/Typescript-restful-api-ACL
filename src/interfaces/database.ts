import { iUserSchema, iUserTypeSchema } from '../models'
import { ModelCtor } from 'sequelize'

export interface iTableMap {
  [key: string]: ModelCtor<iUserTypeSchema | iUserSchema>
}
