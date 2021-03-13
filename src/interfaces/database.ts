import { iUserSchema, iUserTypeSchema } from '../models'
import { ModelCtor } from 'sequelize'

export interface iTableMap {
  users: ModelCtor<iUserSchema>
  userTypes: ModelCtor<iUserTypeSchema>
}
